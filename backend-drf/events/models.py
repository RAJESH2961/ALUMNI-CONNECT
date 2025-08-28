from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL

def event_media_upload_to(instance, filename):
    return f'event_media/{instance.creator.id}/{filename}'

class Event(models.Model):
    EVENT_TYPE_CHOICES = [
        ('seminar', 'Seminar'),
        ('webinar', 'Webinar'),
        ('reunion', 'Alumni Reunion'),
        ('networking', 'Networking Meetup'),
        ('workshop', 'Workshop'),
        ('career', 'Career Talk'),
        ('other', 'Other'),
    ]

    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_events')
    title = models.CharField(max_length=255)
    description = models.TextField()
    event_type = models.CharField(max_length=50, choices=EVENT_TYPE_CHOICES, default='other')
    date = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True, null=True)
    media = models.FileField(upload_to=event_media_upload_to, blank=True, null=True)
    max_seats = models.PositiveIntegerField(default=100)
    registered_users = models.ManyToManyField(User, related_name='joined_events', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_full(self):
        return self.registered_users.count() >= self.max_seats

    def is_past(self):
        return self.date < timezone.now()

    def remaining_seats(self):
        return max(self.max_seats - self.registered_users.count(), 0)

    def __str__(self):
        return f"{self.title} by {self.creator.username}"
