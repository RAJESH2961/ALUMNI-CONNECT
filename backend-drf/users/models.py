from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Override email field to ensure it's unique
    email = models.EmailField(unique=True)

    # Set email as the primary login field
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # still required by Django admin

    # User roles
    ROLE_CHOICES = [
        ("student", "Student"),
        ("alumni", "Alumni"),
        ("faculty", "Faculty"),
        ("admin", "Admin"),
    ]

    # School choices
    SCHOOL_CHOICES = [
        ("SoT", "School of Technology"),
        ("SoM", "School of Management"),
        ("SoL", "School of Law"),
        ("SoD", "School of Design"),
        ("SoHS", "School of Health Sciences"),
        ("SoSS", "School of Social Sciences"),
    ]

    # Extra fields
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    school = models.CharField(max_length=50, choices=SCHOOL_CHOICES, null=True, blank=True)
    specialization = models.CharField(max_length=100, null=True, blank=True)
    batch_year = models.PositiveIntegerField(null=True, blank=True)

    # Profile info
    bio = models.TextField(blank=True, null=True)
    profile_image = models.ImageField(upload_to='avatars/', null=True, blank=True)
    linkedin_url = models.URLField(blank=True, null=True)
    portfolio_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)

    # Gamification
    badges = models.JSONField(default=list, blank=True)

    # Flags
    is_approved = models.BooleanField(default=False)  # type: ignore
    profile_completed = models.BooleanField(default=False)  # type: ignore
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} ({self.role})"