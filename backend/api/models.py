from django.db import models

class PLFSRecord(models.Model):
    state = models.CharField(max_length=100)
    gender = models.CharField(max_length=20)
    year = models.IntegerField()
    employment_rate = models.FloatField()

    class Meta:
        indexes = [
            models.Index(fields=["state"]),
            models.Index(fields=["gender"]),
            models.Index(fields=["year"]),
        ]

    def __str__(self):
        return f"{self.state} | {self.gender} | {self.year}: {self.employment_rate}"
