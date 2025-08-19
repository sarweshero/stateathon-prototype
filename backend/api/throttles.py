from rest_framework.throttling import UserRateThrottle

class RoleBasedRateThrottle(UserRateThrottle):
    """Rate limit: 60/min for normal users, 300/min for researcher/staff, 30/min for anonymous."""
    scope = "basic"

    def get_cache_key(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            # anonymous scope
            self.scope = "anon"
            ident = self.get_ident(request)
            return self.cache_format % {
                'scope': self.scope,
                'ident': ident
            }

        if user.is_staff or user.groups.filter(name="researcher").exists():
            self.scope = "researcher"
        else:
            self.scope = "basic"
        return super().get_cache_key(request, view)
