from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserProfileSerializer

User = get_user_model()

class LoginView(APIView):
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                raise User.DoesNotExist
        except User.DoesNotExist:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        print("LOGIN SUCCESSFUL", flush=True)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user.is_approved:
            return Response({"detail": "User not approved by admin."}, status=403)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)


from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer  # you will create this next
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
