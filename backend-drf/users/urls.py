from django.urls import path
from .views import LoginView, ProfileView, RegisterView, ActivateAccountView, ResendActivationView, ActivationView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("login/", LoginView.as_view(), name="token_obtain_pair"),
    path("register/", RegisterView.as_view(), name="register"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profiles/", ProfileView.as_view(), name="user-profile"),
    # path("activate/<uidb64>/<token>/", ActivateAccountView.as_view(), name="activate-account"),
    path("resend-activation/", ResendActivationView.as_view(), name="resend-activation"),
    path("activate/", ActivationView.as_view(), name="token-activate"),
]
