from django.urls import path
from .views import LoginView, ProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("login/", LoginView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profiles/", ProfileView.as_view(), name="user-profile"),
]
