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
        subject = f"You're Registered for {event.title} at The Apollo University 🎓"

        message = (
            f"Dear {user.username},\n\n"
            f"🎉 Thank you for registering for the upcoming event at *The Apollo University*.\n\n"
            f"Here are your event details:\n\n"
            f"📌 **Event:** {event.title}\n"
            f"📅 **Date & Time:** {event.date.strftime('%A, %d %B %Y at %I:%M %p')}\n"
            f"📍 **Location:** {event.location or 'To Be Announced'}\n"
            f"📝 **About the Event:**\n{event.description}\n\n"
            f"We’re excited to welcome you to this special gathering of alumni, students, and professionals.\n"
            f"It’s a great opportunity to connect, collaborate, and celebrate the spirit of *The Apollo University* community.\n\n"
            f"If you have any questions, feel free to contact the event coordinator.\n\n"
            f"Warm regards,\n"
            f"The Apollo University Alumni Team\n"
            f"🌐 https://apollouniversity.edu.in/alumni/\n"
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
