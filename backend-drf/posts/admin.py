from django.contrib import admin
from .models import Post, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'author',
        'post_type',
        'created_at',
        'is_pinned',
        'is_approved',
        'application_deadline',
    )
    list_filter = ('post_type', 'is_pinned', 'is_approved', 'created_at')
    search_fields = ('title', 'author__username', 'content', 'tags')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    # Optional: display media preview if it's an image
    def media_preview(self, obj):
        if obj.media and obj.media.name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            return f'<img src="{obj.media.url}" width="100" />'
        return 'No preview'

    media_preview.allow_tags = True
    media_preview.short_description = 'Media Preview'


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'content', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('post__title', 'author__username', 'content')
    readonly_fields = ('created_at',)
