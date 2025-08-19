from rest_framework import serializers
from .models import PLFSRecord

class PLFSRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = PLFSRecord
        fields = ["id", "state", "gender", "year", "employment_rate"]
