import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faThumbsUp, faUser, faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState({});
  const [liking, setLiking] = useState({});
  const [commenting, setCommenting] = useState({});
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/posts/posts/');
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
      // Set dummy data for development
      setPosts([
        {
          id: 1,
          title: 'Exciting Career Opportunity at TechCorp',
          content: 'Hey everyone! I wanted to share an exciting opportunity at my company. We\'re hiring for several positions and I\'d love to help fellow alumni get their foot in the door. The company culture is amazing and the work is challenging.',
          author: {
            username: 'John Doe',
            role: 'Senior Software Engineer'
          },
          created_at: '2024-01-15T10:30:00Z',
          likes_count: 12,
          comments_count: 5,
          is_liked: false,
          comments: [
            {
              id: 1,
              content: 'This sounds great! Can you share more details about the application process?',
              author: 'Jane Smith',
              created_at: '2024-01-15T11:00:00Z'
            },
            {
              id: 2,
              content: 'I\'m interested! What positions are available?',
              author: 'Mike Johnson',
              created_at: '2024-01-15T11:30:00Z'
            }
          ]
        },
        {
          id: 2,
          title: 'Alumni Meet Success Story',
          content: 'Just wanted to share how amazing our recent alumni meet was! We had over 50 alumni attend and the networking was incredible. Special thanks to everyone who organized and participated. Looking forward to the next one!',
          author: {
            username: 'Sarah Wilson',
            role: 'Event Organizer'
          },
          created_at: '2024-01-14T16:45:00Z',
          likes_count: 28,
          comments_count: 8,
          is_liked: true,
          comments: [
            {
              id: 3,
              content: 'It was fantastic! Great to reconnect with everyone.',
              author: 'Alex Brown',
              created_at: '2024-01-14T17:00:00Z'
            }
          ]
        },
        {
          id: 3,
          title: 'Mentorship Program Launch',
          content: 'We\'re launching a new mentorship program to connect current students with successful alumni. This is a great opportunity to give back and help the next generation. If you\'re interested in being a mentor, please reach out!',
          author: {
            username: 'David Chen',
            role: 'Program Coordinator'
          },
          created_at: '2024-01-13T09:15:00Z',
          likes_count: 15,
          comments_count: 3,
          is_liked: false,
          comments: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please login to create a post');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/posts/posts/', newPost);
      setPosts(prev => [response.data, ...prev]);
      setNewPost({ title: '', content: '' });
      alert('Post created successfully!');
    } catch (err) {
      console.error('Error creating post:', err);
      alert(err.response?.data?.detail || 'Failed to create post');
    }
  };

  const handleLike = async (postId) => {
    if (!isLoggedIn) {
      alert('Please login to like posts');
      return;
    }

    try {
      setLiking(prev => ({ ...prev, [postId]: true }));
      await axiosInstance.post(`/api/posts/posts/${postId}/like/`);
      
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              is_liked: !post.is_liked,
              likes_count: post.is_liked ? post.likes_count - 1 : post.likes_count + 1
            }
          : post
      ));
    } catch (err) {
      console.error('Error liking post:', err);
      alert('Failed to like post');
    } finally {
      setLiking(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleComment = async (postId) => {
    if (!isLoggedIn) {
      alert('Please login to comment');
      return;
    }

    const commentContent = newComment[postId];
    if (!commentContent?.trim()) return;

    try {
      setCommenting(prev => ({ ...prev, [postId]: true }));
      const response = await axiosInstance.post(`/api/posts/posts/${postId}/comment/`, {
        content: commentContent
      });
      
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...post.comments, response.data],
              comments_count: post.comments_count + 1
            }
          : post
      ));
      
      setNewComment(prev => ({ ...prev, [postId]: '' }));
    } catch (err) {
      console.error('Error commenting:', err);
      alert('Failed to add comment');
    } finally {
      setCommenting(prev => ({ ...prev, [postId]: false }));
    }
  };

  const pageStyles = {
    wrapper: {
      backgroundColor: '#F3F4F6',
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '80px' // Add padding to avoid navbar overlap
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      width: '100%'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '36px',
      fontWeight: 800,
      color: '#1D4ED8',
      marginBottom: '16px'
    },
    subtitle: {
      fontSize: '18px',
      color: '#6B7280',
      marginBottom: '32px'
    },
    createPostForm: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E5E7EB',
      marginBottom: '32px'
    },
    formTitle: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#1F2937',
      marginBottom: '16px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 600,
      color: '#374151',
      marginBottom: '6px'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.2s ease'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '16px',
      minHeight: '100px',
      resize: 'vertical',
      transition: 'border-color 0.2s ease'
    },
    submitButton: {
      backgroundColor: '#1D4ED8',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    postsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    postCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E5E7EB'
    },
    postHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px'
    },
    authorAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#1D4ED8',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: 700
    },
    authorInfo: {
      flex: 1
    },
    authorName: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#1F2937',
      marginBottom: '2px'
    },
    authorRole: {
      fontSize: '14px',
      color: '#6B7280'
    },
    postDate: {
      fontSize: '12px',
      color: '#9CA3AF',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    postTitle: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#1F2937',
      marginBottom: '12px'
    },
    postContent: {
      color: '#4B5563',
      lineHeight: 1.6,
      marginBottom: '20px'
    },
    postActions: {
      display: 'flex',
      gap: '16px',
      marginBottom: '20px'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 12px',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#6B7280',
      cursor: 'pointer',
      borderRadius: '6px',
      transition: 'all 0.2s ease'
    },
    likedButton: {
      color: '#EF4444'
    },
    commentSection: {
      borderTop: '1px solid #E5E7EB',
      paddingTop: '20px'
    },
    commentForm: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px'
    },
    commentInput: {
      flex: 1,
      padding: '8px 12px',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: '14px'
    },
    commentButton: {
      backgroundColor: '#10B981',
      color: '#ffffff',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    commentsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    comment: {
      backgroundColor: '#F9FAFB',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #E5E7EB'
    },
    commentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '6px'
    },
    commentAuthor: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#1F2937'
    },
    commentDate: {
      fontSize: '12px',
      color: '#9CA3AF'
    },
    commentContent: {
      fontSize: '14px',
      color: '#4B5563',
      lineHeight: 1.4
    },
    loadingText: {
      textAlign: 'center',
      padding: '60px 0',
      fontSize: '18px',
      color: '#6B7280'
    },
    errorText: {
      textAlign: 'center',
      padding: '60px 0',
      fontSize: '18px',
      color: '#EF4444'
    }
  };

  if (loading) {
    return (
      <div style={pageStyles.wrapper}>
        <div style={pageStyles.container}>
          <div style={pageStyles.loadingText}>Loading posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageStyles.wrapper}>
        <div style={pageStyles.container}>
          <div style={pageStyles.errorText}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyles.wrapper}>
      <div style={pageStyles.container}>
        <div style={pageStyles.header}>
          <h1 style={pageStyles.title}>Alumni Posts</h1>
          <p style={pageStyles.subtitle}>
            Share updates, opportunities, and connect with fellow alumni through posts and discussions.
          </p>
        </div>

        {/* Create Post Form */}
        {isLoggedIn && (
          <div style={pageStyles.createPostForm}>
            <h3 style={pageStyles.formTitle}>Create a New Post</h3>
            <form onSubmit={handleCreatePost}>
              <div style={pageStyles.formGroup}>
                <label style={pageStyles.label}>Title</label>
                <input
                  type="text"
                  style={pageStyles.input}
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter post title..."
                  required
                />
              </div>
              <div style={pageStyles.formGroup}>
                <label style={pageStyles.label}>Content</label>
                <textarea
                  style={pageStyles.textarea}
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts, opportunities, or updates..."
                  required
                />
              </div>
              <button type="submit" style={pageStyles.submitButton}>
                Create Post
              </button>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div style={pageStyles.postsList}>
          {posts.map((post) => (
            <div key={post.id} style={pageStyles.postCard}>
              <div style={pageStyles.postHeader}>
                <div style={pageStyles.authorAvatar}>
                  {post.author.username.charAt(0).toUpperCase()}
                </div>
                <div style={pageStyles.authorInfo}>
                  <div style={pageStyles.authorName}>{post.author.username}</div>
                  <div style={pageStyles.authorRole}>{post.author.role}</div>
                </div>
                <div style={pageStyles.postDate}>
                  <FontAwesomeIcon icon={faClock} />
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>

              <h3 style={pageStyles.postTitle}>{post.title}</h3>
              <p style={pageStyles.postContent}>{post.content}</p>

              <div style={pageStyles.postActions}>
                <button
                  style={{
                    ...pageStyles.actionButton,
                    ...(post.is_liked && pageStyles.likedButton)
                  }}
                  onClick={() => handleLike(post.id)}
                  disabled={liking[post.id]}
                >
                  <FontAwesomeIcon icon={post.is_liked ? faHeart : faThumbsUp} />
                  {post.likes_count} {post.is_liked ? 'Liked' : 'Like'}
                </button>
                <button style={pageStyles.actionButton}>
                  <FontAwesomeIcon icon={faComment} />
                  {post.comments_count} Comments
                </button>
              </div>

              {/* Comments Section */}
              <div style={pageStyles.commentSection}>
                {isLoggedIn && (
                  <div style={pageStyles.commentForm}>
                    <input
                      type="text"
                      style={pageStyles.commentInput}
                      value={newComment[post.id] || ''}
                      onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="Write a comment..."
                    />
                    <button
                      style={pageStyles.commentButton}
                      onClick={() => handleComment(post.id)}
                      disabled={commenting[post.id]}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                      {commenting[post.id] ? 'Posting...' : 'Post'}
                    </button>
                  </div>
                )}

                {post.comments && post.comments.length > 0 && (
                  <div style={pageStyles.commentsList}>
                    {post.comments.map((comment) => (
                      <div key={comment.id} style={pageStyles.comment}>
                        <div style={pageStyles.commentHeader}>
                          <span style={pageStyles.commentAuthor}>{comment.author}</span>
                          <span style={pageStyles.commentDate}>
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div style={pageStyles.commentContent}>{comment.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
