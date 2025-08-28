from rest_framework import serializers
from .models import Post, Comment
from users.models import CustomUser

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'profile_image', 'role']

class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)  # ✅ Make this read-only

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at']
        read_only_fields = ['id', 'author', 'created_at', 'post']

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'content', 'author', 'post_type',
            'tags', 'media', 'application_deadline', 'location',
            'is_approved', 'is_pinned', 'created_at', 'likes_count', 'comments'
        ]
        read_only_fields = ['id', 'author', 'created_at', 'likes_count', 'comments']

    def get_likes_count(self, obj):
        return obj.likes.count()  # type: ignore[attr-defined]
