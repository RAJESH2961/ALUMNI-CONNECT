import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Button from './UI/Button';
import axiosInstance from '../utils/axiosInstance';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get('/api/profiles/');
      setUserProfile(response.data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  const headerStyles = {
    header: {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      padding: '12px 0',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      borderBottom: '1px solid #E5E7EB',
      height: '64px',
      display: 'flex',
      alignItems: 'center'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    logo: {
      fontSize: '20px',
      fontWeight: 800,
      color: '#1D4ED8',
      textDecoration: 'none',
      flexShrink: 0
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    link: {
      color: '#6B7280',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'color 0.2s ease',
      fontSize: '15px',
      padding: '8px 12px',
      borderRadius: '6px',
      whiteSpace: 'nowrap'
    },
    linkHover: {
      color: '#1D4ED8',
      backgroundColor: '#F3F4F6'
    },
    profileButton: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: '#1D4ED8',
      color: '#ffffff',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      flexShrink: 0,
      overflow: 'hidden'
    },
    profileImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%'
    },
    logoutButton: {
      backgroundColor: '#DC2626',
      color: '#ffffff',
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap'
    },
    logoutButtonHover: {
      backgroundColor: '#B91C1C',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
    },
    authButtons: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    mobileMenu: {
      display: 'none'
    }
  };

  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.container}>
        <Link to="/" style={headerStyles.logo}>
          AlumniConnect
        </Link>
        
        <nav style={headerStyles.nav}>
          <Link to='/' style={headerStyles.link}>Home</Link>
          <Link to='/events' style={headerStyles.link}>Events</Link>
          <Link to='/alumni' style={headerStyles.link}>Alumni</Link>
          <Link to='/posts' style={headerStyles.link}>Posts</Link>
          {isLoggedIn ? (
            <div style={headerStyles.authButtons}>
              <Link to="/profile" style={headerStyles.profileButton}>
                {userProfile?.profile_image ? (
                  <img 
                  src={
                    userProfile.profile_image 
                      ? `${import.meta.env.VITE_BACKEND_URL}${userProfile.profile_image}`
                      : '/default-avatar.png' // optional fallback if no image
                  } 
                  alt={userProfile.username || 'Profile'}
                  style={headerStyles.profileImage}
                />
                
                ) : (
                  '👤'
                )}
              </Link>
              <button 
                style={headerStyles.logoutButton} 
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B91C1C';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#DC2626';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={headerStyles.authButtons}>
              <Button text="Login" href="/login" />
              <Button text="Register" href="/register" />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;