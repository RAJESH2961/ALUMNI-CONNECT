from django.urls import path
from .views import (
    EventListCreateView,
    EventDetailView,
    EventRegisterView,
    UserRegisteredEventsView
)

urlpatterns = [
    # List all events or create a new one
    path('', EventListCreateView.as_view(), name='event-list-create'),

    # Retrieve, update, or delete a single event
    path('<int:pk>/', EventDetailView.as_view(), name='event-detail'),

    # Register the current user to an event
    path('<int:pk>/register/', EventRegisterView.as_view(), name='event-register'),

    # Get all events that the current user registered for
    path('my-registrations/', UserRegisteredEventsView.as_view(), name='my-registered-events'),
]
