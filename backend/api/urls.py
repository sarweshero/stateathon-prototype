from django.urls import path
from .views import PLFSListView, PLFSSummaryView, MetadataVariablesView, AdminDumpView, login_view

urlpatterns = [
    path("auth/login/", login_view, name="login"),
    path("plfs", PLFSListView.as_view(), name="plfs-list"),
    path("plfs/summary", PLFSSummaryView.as_view(), name="plfs-summary"),
    path("metadata/variables/", MetadataVariablesView.as_view(), name="metadata-variables"),
    path("admin/dump/", AdminDumpView.as_view(), name="admin-dump"),
]
