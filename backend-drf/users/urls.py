from django.urls import path
from .views import GoogleLogin, ProfileUpdateView

urlpatterns = [
    path('google/', GoogleLogin.as_view(), name='google_login'),
    path('profile/', ProfileUpdateView.as_view(), name='profile_update'),
]
