from django.core.management.base import BaseCommand, CommandError
from api.models import PLFSRecord
import csv

class Command(BaseCommand):
    help = "Load sample PLFS-like CSV into the database"

    def add_arguments(self, parser):
        parser.add_argument("--path", type=str, default="api/sample_plfs.csv")

    def handle(self, *args, **options):
        path = options["path"]
        created = 0
        try:
            with open(path, newline='', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    PLFSRecord.objects.create(
                        state=row["state"],
                        gender=row["gender"],
                        year=int(row["year"]),
                        employment_rate=float(row["employment_rate"]),
                    )
                    created += 1
        except FileNotFoundError:
            raise CommandError(f"File not found: {path}")
        self.stdout.write(self.style.SUCCESS(f"Loaded {created} records from {path}"))
