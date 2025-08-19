from django.contrib import admin
from .models import PLFSRecord

@admin.register(PLFSRecord)
class PLFSRecordAdmin(admin.ModelAdmin):
    list_display = ("state","gender","year","employment_rate")
    list_filter = ("state","gender","year")
    search_fields = ("state",)
