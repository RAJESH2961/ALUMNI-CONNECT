from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
from django.utils.encoding import force_str
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .serializers import UserProfileSerializer
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from .serializers import ActivationSerializer

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


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class ActivateAccountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'detail': 'Invalid activation link.'}, status=status.HTTP_400_BAD_REQUEST)

        token_generator = PasswordResetTokenGenerator()
        if token_generator.check_token(user, token):
            if not user.is_active:
                user.is_active = True
                user.save()
                return Response({'detail': 'Account activated successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Account already activated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid or expired activation link.'}, status=status.HTTP_400_BAD_REQUEST)


class ResendActivationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email)
            if user.is_active:
                return Response({'detail': 'Account already active.'}, status=status.HTTP_400_BAD_REQUEST)
            # Reuse the activation email logic from serializer
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            activation_link = f"{settings.FRONTEND_URL}/api/activate/{uid}/{token}/"
            subject = "Activate your account"
            message = f"Hi {user.username},\n\nPlease click the link below to activate your account:\n{activation_link}\n\nIf you did not register, please ignore this email."
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            return Response({'detail': 'Activation email resent.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'detail': 'No inactive user found with this email.'}, status=status.HTTP_400_BAD_REQUEST)


class ActivationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ActivationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': 'Account activated successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
