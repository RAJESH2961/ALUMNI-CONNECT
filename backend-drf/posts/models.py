from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL

def upload_to(instance, filename):
    return f'post_media/{instance.author.id}/{filename}'


class Post(models.Model):
    POST_TYPE_CHOICES = [
        ('internship', 'Internship Opportunity'),
        ('job', 'Job Opening'),
        ('event', 'Event'),
        ('seminar', 'Seminar / Webinar'),
        ('announcement', 'General Announcement'),
        ('achievement', 'Achievement'),
        ('discussion', 'Discussion'),
        ('resource', 'Resource Sharing'),
    ]

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255)
    content = models.TextField()
    media = models.FileField(upload_to=upload_to, null=True, blank=True)  # PDF, Image, etc.  # type: ignore[arg-type]
    tags = models.CharField(max_length=255, blank=True, help_text="Comma-separated tags for searchability")
    post_type = models.CharField(max_length=50, choices=POST_TYPE_CHOICES, default='announcement')
    application_deadline = models.DateField(null=True, blank=True, help_text="Optional: Deadline for jobs/internships")
    location = models.CharField(max_length=255, null=True, blank=True, help_text="Event/Job location if applicable")
    external_link = models.URLField(null=True, blank=True, help_text="Any relevant link (form, website, etc.)")
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    is_pinned = models.BooleanField(default=False, help_text="Admin feature to pin important posts")  # type: ignore[call-arg]
    is_approved = models.BooleanField(default=True, help_text="Moderation flag (optional)")  # type: ignore[call-arg]
    created_at = models.DateTimeField(auto_now_add=True)

    def total_likes(self):
        return self.likes.count()  # type: ignore[attr-defined]

    def is_expired(self):
        return self.application_deadline and self.application_deadline < timezone.now().date()  # type: ignore[attr-defined]

    def __str__(self):
        return f"{self.post_type.title()} by {self.author.username} - {self.title}"  # type: ignore[attr-defined]


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author.username} on Post {self.post.id}"  # type: ignore[attr-defined]
