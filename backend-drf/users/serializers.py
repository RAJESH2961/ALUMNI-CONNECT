from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
from django.core import signing
from django.core.signing import BadSignature, SignatureExpired
from django.utils import timezone

User = get_user_model()

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD  # use email instead of username

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password'),
        }
        user = authenticate(**credentials)
        if not user:
            raise serializers.ValidationError('Invalid credentials.')
        if not user.is_active:
            raise serializers.ValidationError('User is inactive.')
        if not user.is_approved:
            raise serializers.ValidationError('User is not approved by admin.')
        data = super().validate(attrs)
        return data

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "email", "username", "role", "school",
            "specialization", "batch_year", "bio",
            "profile_image", "linkedin_url", "github_url", "portfolio_url",
            "badges", "is_approved", "profile_completed", "date_joined"
        ]


#Registration code 

from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)

    def create(self, validated_data):
        # Do not create user yet, just send activation email
        self.send_activation_email(validated_data)
        return validated_data

    def send_activation_email(self, data):
        signer = signing.TimestampSigner()
        token = signing.dumps(data, salt='user-activation')
        activation_link = f"{settings.FRONTEND_URL}/api/activate/{token}/"
        subject = "Welcome to Alumni Portal - Activate Your Account"
        username = data.get('username', 'User') if isinstance(data, dict) else 'User'
        email = data.get('email', '') if isinstance(data, dict) else ''
        message = (
            f"Dear {username},\n\n"
            f"Welcome to the Alumni Portal!\n\n"
            f"To complete your registration, please activate your account by clicking the link below:\n"
            f"{activation_link}\n\n"
            f"If you did not register for the Alumni Portal, please ignore this email.\n\n"
            f"Best regards,\nAlumni Portal Team"
        )
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )

class ActivationSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, attrs):
        token = attrs['token']
        try:
            data = signing.loads(token, salt='user-activation', max_age=60*60*24)  # 1 day expiry
        except SignatureExpired:
            raise serializers.ValidationError('Activation link expired.')
        except BadSignature:
            raise serializers.ValidationError('Invalid activation link.')
        attrs['data'] = data
        return attrs

    def save(self, **kwargs):
        data = self.validated_data['data'] if 'data' in self.validated_data else None
        if not isinstance(data, dict):
            raise serializers.ValidationError('Invalid activation data.')
        email = data['email'] if 'email' in data else None
        username = data['username'] if 'username' in data else None
        password = data['password'] if 'password' in data else None
        if not email or not username or not password:
            raise serializers.ValidationError('Invalid activation data.')
        User = get_user_model()
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError('User with this email already exists.')
        user = User.objects.create_user(
            email=email,
            username=username,
            password=password,
            is_active=True
        )
        return user
