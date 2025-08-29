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

from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.core import signing

from rest_framework import serializers
from django.core.mail import EmailMultiAlternatives
from django.core import signing
from django.conf import settings

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)

    def create(self, validated_data):
        # Send activation email (user not created yet)
        self.send_activation_email(validated_data)
        return validated_data

    def send_activation_email(self, data):
        # Create signed token
        token = signing.dumps(data, salt='user-activation')

        # Activation URL using frontend format
        activation_url = f"{settings.FRONTEND_URL}/activate/{token}/"

        # HTML email with clickable button
        html_content = f"""
        <html>
          <body>
            <p>Hi {data['username']},</p>
            <p>Welcome! Click the button below to activate your account:</p>
            <a href="{activation_url}" style="
                display:inline-block;
                padding:10px 20px;
                font-size:16px;
                color:white;
                background-color:#4CAF50;
                text-decoration:none;
                border-radius:5px;
            ">Activate Account</a>
            <p>If you did not register, ignore this email.</p>
          </body>
        </html>
        """

        subject = "Activate Your Account"
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = [data['email']]

        # Send HTML email with error handling
        try:
            msg = EmailMultiAlternatives(subject, "", from_email, to_email)
            msg.attach_alternative(html_content, "text/html")
            msg.send(fail_silently=False)
        except Exception as exc:
            # In development with console backend, this won't be hit. In production, log for debugging.
            print(f"[Activation Email Error] to={to_email} error={exc}", flush=True)
            raise serializers.ValidationError('Failed to send activation email. Please try again later.')

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
