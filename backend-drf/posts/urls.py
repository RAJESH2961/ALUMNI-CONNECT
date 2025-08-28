from django.urls import path
from .views import (
    PostCommentCreateView, PostCommentsListView, PostListCreateView, PostDetailView,
    CommentListCreateView, CommentDetailView,
    LikePostView,
)

urlpatterns = [
    # Post URLs
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:pk>/like/', LikePostView.as_view(), name='post-like'),

    # Comments for a specific post
    path('posts/<int:post_id>/comments/', PostCommentsListView.as_view(), name='post-comments'),  # 👈 NEW
    path('posts/<int:post_id>/comment/', PostCommentCreateView.as_view(), name='post-comment-create'),



    # Comment URLs
    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
]
