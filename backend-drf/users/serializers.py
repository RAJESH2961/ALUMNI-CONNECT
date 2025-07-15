from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'email', 'username', 'role', 'school', 'specialization', 'batch_year',
            'bio', 'profile_image', 'linkedin_url', 'github_url', 'badges', 'profile_completed', 'date_joined'
        ]
        read_only_fields = ['id', 'email', 'username', 'badges', 'profile_completed', 'date_joined'] 