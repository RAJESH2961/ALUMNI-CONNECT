from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "email", "username", "role", "school",
            "specialization", "batch_year", "bio",
            "profile_image", "linkedin_url", "github_url",
            "badges", "is_approved", "profile_completed", "date_joined"
        ]
