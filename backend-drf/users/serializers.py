from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

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
            "profile_image", "linkedin_url", "github_url",
            "badges", "is_approved", "profile_completed", "date_joined"
        ]
