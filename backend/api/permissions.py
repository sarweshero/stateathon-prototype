from rest_framework.permissions import BasePermission

class IsResearcherOrStaff(BasePermission):
    """Allows access only to users in 'researcher' group or if the user is staff."""
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if user.is_staff:
            return True
        return user.groups.filter(name="researcher").exists()
