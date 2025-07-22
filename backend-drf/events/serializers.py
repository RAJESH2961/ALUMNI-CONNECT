from rest_framework import serializers
from .models import Event
from django.utils import timezone

class EventSerializer(serializers.ModelSerializer):
    creator_username = serializers.CharField(source='creator.username', read_only=True)
    is_full = serializers.SerializerMethodField()
    is_past = serializers.SerializerMethodField()
    remaining_seats = serializers.SerializerMethodField()
    registered_users_count = serializers.IntegerField(source='registered_users.count', read_only=True)

    class Meta:
        model = Event
        fields = [
            'id',
            'creator',           # creator ID (write-only)
            'creator_username',  # creator name (read-only)
            'title',
            'description',
            'event_type',
            'date',
            'location',
            'media',
            'max_seats',
            'registered_users_count',
            'remaining_seats',
            'is_full',
            'is_past',
            'created_at',
        ]
        read_only_fields = ['creator', 'is_full', 'is_past', 'remaining_seats', 'created_at', 'registered_users_count']

    def get_is_full(self, obj):
        return obj.is_full()

    def get_is_past(self, obj):
        return obj.is_past()

    def get_remaining_seats(self, obj):
        return obj.max_seats - obj.registered_users.count()
