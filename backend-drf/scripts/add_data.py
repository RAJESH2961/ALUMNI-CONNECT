import os
import django
import random
from faker import Faker  # pyright: ignore[reportMissingImports]
from django.utils import timezone

# Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend_drf.settings")
django.setup()

from users.models import CustomUser
from events.models import Event
from posts.models import Post, Comment

fake = Faker()

def create_users(n=10):
    users = []
    for _ in range(n):
        user = CustomUser.objects.create_user(
            email=fake.unique.email(),
            username=fake.user_name(),
            password="password123",
            role=random.choice([r[0] for r in CustomUser.ROLE_CHOICES]),
            school=random.choice([s[0] for s in CustomUser.SCHOOL_CHOICES]),
            specialization=fake.word(),
            batch_year=random.choice(range(2000, 2025)),
            bio=fake.sentence(),
            linkedin_url=fake.url(),
            github_url=fake.url(),
            portfolio_url=fake.url(),
            is_approved=True,
            profile_completed=True
        )
        users.append(user)
    return users

def create_events(users, n=10):
    events = []
    for _ in range(n):
        creator = random.choice(users)
        event = Event.objects.create(
            creator=creator,
            title=fake.catch_phrase(),
            description=fake.paragraph(),
            event_type=random.choice([e[0] for e in Event.EVENT_TYPE_CHOICES]),
            date=fake.future_datetime(end_date="+30d", tzinfo=timezone.utc),
            location=fake.city(),
            max_seats=random.randint(10, 200),
        )
        # Add random registered users
        event.registered_users.add(*random.sample(users, k=random.randint(0, len(users)//2)))
        events.append(event)
    return events

def create_posts(users, n=10):
    posts = []
    for _ in range(n):
        author = random.choice(users)
        post = Post.objects.create(
            author=author,
            title=fake.sentence(nb_words=6),
            content=fake.paragraph(nb_sentences=5),
            tags=",".join(fake.words(3)),
            post_type=random.choice([p[0] for p in Post.POST_TYPE_CHOICES]),
            application_deadline=fake.future_date(end_date="+60d"),
            location=fake.city(),
            external_link=fake.url(),
            is_pinned=random.choice([True, False]),
            is_approved=True
        )
        # Add likes
        post.likes.add(*random.sample(users, k=random.randint(0, len(users)//3)))
        posts.append(post)
    return posts

def create_comments(users, posts, n=10):
    for _ in range(n):
        post = random.choice(posts)
        author = random.choice(users)
        Comment.objects.create(
            post=post,
            author=author,
            content=fake.sentence(nb_words=12),
        )

def run():
    print("Seeding data...")
    users = create_users(10)
    events = create_events(users, 10)
    posts = create_posts(users, 10)
    create_comments(users, posts, 20)
    print("✅ Seeding complete! Added 30+ entries.")

if __name__ == "__main__":
    run()
