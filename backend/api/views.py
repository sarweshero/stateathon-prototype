from django.db.models import Count, Avg
from django.http import StreamingHttpResponse
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from .models import PLFSRecord
from .serializers import PLFSRecordSerializer
from .permissions import IsResearcherOrStaff
import csv

class PLFSListView(ListAPIView):
    """/api/plfs?state=&gender=&year="""
    serializer_class = PLFSRecordSerializer

    def get_queryset(self):
        qs = PLFSRecord.objects.all().order_by("state", "gender", "year")
        state = self.request.query_params.get("state")
        gender = self.request.query_params.get("gender")
        year = self.request.query_params.get("year")
        if state:
            qs = qs.filter(state__iexact=state)
        if gender:
            qs = qs.filter(gender__iexact=gender)
        if year:
            try:
                qs = qs.filter(year=int(year))
            except ValueError:
                qs = qs.none()
        return qs

class PLFSSummaryView(APIView):
    """/api/plfs/summary?group_by=state,gender,year
Aggregated summary with cell suppression if count < 5"""
    def get(self, request):
        group_by = request.query_params.get("group_by", "")
        allowed = {"state", "gender", "year"}
        fields = [f.strip() for f in group_by.split(",") if f.strip() in allowed]
        if not fields:
            fields = ["state", "gender", "year"]

        qs = PLFSRecord.objects.values(*fields).annotate(
            count=Count("id"),
            avg_employment_rate=Avg("employment_rate"),
        ).order_by(*fields)

        results = []
        for row in qs:
            suppressed = row["count"] < 5
            results.append({
                **{k: row[k] for k in fields},
                "count": row["count"],
                "avg_employment_rate": None if suppressed else round((row["avg_employment_rate"] or 0.0), 2),
                "suppressed": suppressed,
            })
        return Response(results)

class MetadataVariablesView(APIView):
    """/api/metadata/variables/ — Provides basic variable metadata."""
    def get(self, request):
        states = list(PLFSRecord.objects.values_list("state", flat=True).distinct().order_by("state"))
        genders = list(PLFSRecord.objects.values_list("gender", flat=True).distinct().order_by("gender"))
        years = list(PLFSRecord.objects.values_list("year", flat=True).distinct().order_by("year"))
        min_year = years[0] if years else None
        max_year = years[-1] if years else None
        meta = [
            {"name": "state", "type": "string", "description": "Indian state/UT name", "allowed_values_example": states[:10]},
            {"name": "gender", "type": "string", "description": "Gender of respondent", "allowed_values": genders},
            {"name": "year", "type": "integer", "description": "Reference year", "min": min_year, "max": max_year},
            {"name": "employment_rate", "type": "float", "description": "Employment rate (%)"},
        ]
        return Response(meta)

class AdminDumpView(APIView):
    """/api/admin/dump/  (researcher-only) — Streams CSV of all records."""
    permission_classes = [IsResearcherOrStaff]

    def get(self, request):
        def row_iter():
            yield ["state", "gender", "year", "employment_rate"]
            for r in PLFSRecord.objects.all().order_by("state","gender","year"):
                yield [r.state, r.gender, r.year, r.employment_rate]

        class Echo:
            def write(self, value):
                return value

        writer = csv.writer(Echo())

        def generate():
            for row in row_iter():
                yield writer.writerow(row)

        response = StreamingHttpResponse(generate(), content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="plfs_dump.csv"'
        return response

@api_view(["POST"])    
@permission_classes([permissions.AllowAny])
def login_view(request):
    """POST: {username, password} -> {token}"""
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if not user:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key})
