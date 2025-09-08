# ai/urls.py
from django.urls import path
from .views import generate_bio

urlpatterns = [
    path("generate-bio/", generate_bio, name="generate-bio"),
]
