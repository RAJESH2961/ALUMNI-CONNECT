from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-is_pinned', '-created_at')  # type: ignore[attr-defined]
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()  # type: ignore[attr-defined]
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

class LikePostView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)  # type: ignore[attr-defined]
            user = request.user
            if user in post.likes.all():
                post.likes.remove(user)
                return Response({'message': 'Unliked'}, status=status.HTTP_200_OK)
            post.likes.add(user)
            return Response({'message': 'Liked'}, status=status.HTTP_200_OK)
        except Post.DoesNotExist:  # type: ignore[attr-defined]
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all().order_by('-created_at')  # type: ignore[attr-defined]
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()  # type: ignore[attr-defined]
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

class PostCommentsListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        return Comment.objects.filter(post_id=post_id).order_by('-created_at')  # type: ignore[attr-defined]

class PostCommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, post_id, *args, **kwargs):
        try:
            post = Post.objects.get(id=post_id)  # type: ignore[attr-defined]
        except Post.DoesNotExist:  # type: ignore[attr-defined]
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user, post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
