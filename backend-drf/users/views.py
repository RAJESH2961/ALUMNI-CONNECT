from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import CustomUser
from .serializers import CustomUserSerializer

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

class ProfileUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        if not request.user.is_approved:
            return Response({'detail': 'Profile editing is not allowed until admin approval.'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)
