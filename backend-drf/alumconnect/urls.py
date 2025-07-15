from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # dj-rest-auth and registration
    path('api/v1/auth/', include('dj_rest_auth.urls')),
    path('api/v1/auth/registration/', include('dj_rest_auth.registration.urls')),

    # Social login (Google)
    path('api/v1/auth/social-login/', include('users.urls')),  # This will map to users/urls.py
    path('api/v1/', include('users.urls')),

]
