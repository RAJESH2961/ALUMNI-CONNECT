from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Event
from .serializers import EventSerializer
from django.utils import timezone
# For email sending
from django.core.mail import send_mail
from django.conf import settings


class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user = self.request.user
        if not user.is_authenticated or not user.is_approved:
            raise permissions.PermissionDenied("Only approved users can create events.")
        serializer.save(creator=user)


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        if self.request.user != self.get_object().creator:
            raise permissions.PermissionDenied("You can only update your own events.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.creator:
            raise permissions.PermissionDenied("You can only delete your own events.")
        instance.delete()

# send an email once user has registered
class EventRegisterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=404)

        user = request.user

        if event.is_past():
            return Response({"error": "Cannot register for past events."}, status=400)

        if event.is_full():
            return Response({"error": "This event is full."}, status=400)

        if user in event.registered_users.all():
            return Response({"message": "You are already registered for this event."})

        event.registered_users.add(user)

        # ✅ Send email confirmation
        subject = f"Registered for {event.title}"
        message = (
            f"Hi {user.username},\n\n"
            f"You have successfully registered for the event: {event.title}.\n\n"
            f"📅 Date: {event.date.strftime('%Y-%m-%d %H:%M')}\n"
            f"📍 Location: {event.location or 'TBA'}\n"
            f"📝 Description: {event.description}\n\n"
            f"Thank you for joining!\n"
            f"— Alumni Connect Team"
        )

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

        return Response({"message": "Successfully registered and email sent!"})

class UserRegisteredEventsView(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.joined_events.order_by('date')
