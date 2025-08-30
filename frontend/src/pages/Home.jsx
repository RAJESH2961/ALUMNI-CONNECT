import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch events and alumni in parallel
      const [eventsResponse, alumniResponse] = await Promise.all([
        axiosInstance.get('/api/events/'),
        axiosInstance.get('/api/profiles/')
      ]);

      // Filter for approved alumni and limit to 6 for featured section
      const approvedAlumni = alumniResponse.data
        .filter(user => user.is_approved === true)
        .slice(0, 6);

      // Limit events to 3 for featured section
      const featuredEvents = eventsResponse.data.slice(0, 3);

      setEvents(featuredEvents);
      setAlumni(approvedAlumni);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load featured content');
      // Set dummy data for development
      setEvents([
        {
          id: 1,
          title: 'Alumni Networking Event 2024',
          date: '2024-03-15T18:00:00Z',
          location: 'San Francisco, CA',
          description: 'Join us for our annual alumni networking event. Connect with fellow graduates and explore career opportunities.',
          max_participants: 100,
          current_participants: 45
        },
        {
          id: 2,
          title: 'Tech Career Fair',
          date: '2024-04-20T10:00:00Z',
          location: 'New York, NY',
          description: 'Meet top tech companies and explore exciting career opportunities in the technology sector.',
          max_participants: 200,
          current_participants: 120
        },
        {
          id: 3,
          title: 'Mentorship Program Launch',
          date: '2024-05-10T14:00:00Z',
          location: 'Online',
          description: 'Launch of our new mentorship program connecting current students with successful alumni.',
          max_participants: 50,
          current_participants: 25
        }
      ]);
      setAlumni([
        {
          id: 1,
          username: 'John Doe',
          role: 'Senior Software Engineer',
          company: 'TechCorp Inc.',
          batch_year: 2020,
          school: 'Computer Science',
          specialization: 'Software Engineering',
          linkedin_url: 'https://linkedin.com/in/johndoe',
          github_url: 'https://github.com/johndoe',
          portfolio_url: 'https://johndoe.dev',
          location: 'San Francisco, CA',
          is_approved: true
        },
        {
          id: 2,
          username: 'Jane Smith',
          role: 'Product Manager',
          company: 'InnovateTech',
          batch_year: 2019,
          school: 'Business Administration',
          specialization: 'Product Management',
          linkedin_url: 'https://linkedin.com/in/janesmith',
          github_url: 'https://github.com/janesmith',
          portfolio_url: 'https://janesmith.com',
          location: 'New York, NY',
          is_approved: true
        },
        {
          id: 3,
          username: 'Mike Johnson',
          role: 'Data Scientist',
          company: 'DataFlow Analytics',
          batch_year: 2021,
          school: 'Mathematics',
          specialization: 'Data Science',
          linkedin_url: 'https://linkedin.com/in/mikejohnson',
          github_url: 'https://github.com/mikejohnson',
          portfolio_url: 'https://mikejohnson.ai',
          location: 'Austin, TX',
          is_approved: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const heroStyles = {
    wrapper: { 
      backgroundColor: '#F3F4F6', 
      width: '100%', 
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      paddingTop: '64px', // Match header height
      position: 'relative'
    },
    animatedBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      opacity: 0.05,
      zIndex: 0,
      pointerEvents: 'none'
    },
    container: { 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px', 
      width: '100%',
      position: 'relative',
      zIndex: 1,
      flex: 1
    },
    hero: { 
      textAlign: 'center', 
      marginBottom: '80px',
      padding: '60px 0'
    },
    title: { 
      fontSize: 'clamp(36px, 5vw, 56px)', 
      fontWeight: 900, 
      color: '#1D4ED8', 
      marginBottom: '24px',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
      lineHeight: 1.2
    },
    subtitle: { 
      fontSize: 'clamp(16px, 2.5vw, 22px)', 
      color: '#6B7280', 
      marginBottom: '40px', 
      maxWidth: '700px', 
      margin: '0 auto 40px',
      lineHeight: 1.6
    },
    ctaButton: { 
      backgroundColor: '#1D4ED8', 
      color: '#ffffff', 
      padding: '18px 36px', 
      borderRadius: '12px', 
      textDecoration: 'none', 
      fontWeight: 700, 
      display: 'inline-block', 
      transition: 'all 0.3s ease',
      fontSize: '18px',
      boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)'
    },
    section: { 
      marginBottom: '80px' 
    },
    sectionTitle: { 
      fontSize: 'clamp(28px, 4vw, 36px)', 
      fontWeight: 800, 
      color: '#1F2937', 
      marginBottom: '32px', 
      textAlign: 'center',
      position: 'relative'
    },
    sectionSubtitle: {
      fontSize: '18px',
      color: '#6B7280',
      textAlign: 'center',
      marginBottom: '48px',
      maxWidth: '600px',
      margin: '0 auto 48px'
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
      gap: '32px', 
      marginBottom: '40px' 
    },
    card: { 
      backgroundColor: '#ffffff', 
      borderRadius: '16px', 
      padding: '32px', 
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)', 
      border: '1px solid #E5E7EB', 
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      height: 'fit-content'
    },
    cardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 16px 48px rgba(0,0,0,0.12)'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '20px'
    },
    cardAvatar: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#1D4ED8',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 700,
      flexShrink: 0
    },
    cardTitle: { 
      fontSize: '22px', 
      fontWeight: 700, 
      color: '#1F2937', 
      marginBottom: '12px',
      lineHeight: 1.3
    },
    cardDate: { 
      color: '#6B7280', 
      fontSize: '14px', 
      marginBottom: '16px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      fontWeight: 500
    },
    cardLocation: {
      color: '#10B981',
      fontSize: '14px',
      fontWeight: 600,
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    cardDescription: { 
      color: '#4B5563', 
      marginBottom: '20px', 
      lineHeight: 1.6,
      fontSize: '15px'
    },
    cardRole: { 
      color: '#10B981', 
      fontWeight: 700, 
      marginBottom: '6px',
      fontSize: '16px'
    },
    cardCompany: {
      color: '#6B7280',
      fontSize: '14px',
      marginBottom: '12px',
      fontWeight: 500
    },
    cardBatch: { 
      color: '#6B7280', 
      fontSize: '14px', 
      marginBottom: '16px',
      fontWeight: 500
    },
    socialLinks: { 
      display: 'flex', 
      gap: '12px' 
    },
    socialLink: { 
      width: '36px', 
      height: '36px', 
      borderRadius: '50%', 
      backgroundColor: '#1D4ED8', 
      color: '#ffffff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textDecoration: 'none', 
      transition: 'all 0.2s ease',
      fontSize: '14px'
    },
    socialLinkHover: {
      backgroundColor: '#10B981',
      transform: 'scale(1.1)'
    },
    viewAllButton: { 
      backgroundColor: '#10B981', 
      color: '#ffffff', 
      padding: '14px 28px', 
      borderRadius: '10px', 
      textDecoration: 'none', 
      fontWeight: 700, 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '10px', 
      transition: 'all 0.3s ease',
      fontSize: '16px',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
    },
    viewAllButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
    },
    progressBar: {
      width: '100%',
      height: '6px',
      backgroundColor: '#E5E7EB',
      borderRadius: '3px',
      marginBottom: '8px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#10B981',
      borderRadius: '3px',
      transition: 'width 0.3s ease'
    },
    progressText: {
      fontSize: '12px',
      color: '#6B7280',
      fontWeight: 500
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      fontSize: '20px',
      color: '#6B7280'
    }
  };



  if (loading) {
    return (
      <div style={heroStyles.wrapper}>
        <div style={heroStyles.animatedBackground}></div>
        <div style={heroStyles.container}>
          <div style={heroStyles.loadingContainer}>
            Loading featured content...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={heroStyles.wrapper}>
      {/* Animated Background */}
      <div style={heroStyles.animatedBackground}></div>
      
      <div style={heroStyles.container}>
        {/* Hero Section */}
        <div style={heroStyles.hero}>
          <h1 style={heroStyles.title}>Welcome to AlumniConnect</h1>
          <p style={heroStyles.subtitle}>
            Connect with fellow alumni, discover career opportunities, and stay updated with the latest events and achievements from our community.
          </p>
          <Link to="/register" style={heroStyles.ctaButton}>Get Started</Link>
        </div>

        {/* Featured Events */}
        <div style={heroStyles.section}>
          <h2 style={heroStyles.sectionTitle}>Featured Events</h2>
          <p style={heroStyles.sectionSubtitle}>
            Join upcoming events and connect with the alumni community
          </p>
          <div style={heroStyles.grid}>
            {events.map((event) => (
              <div 
                key={event.id} 
                style={heroStyles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                }}
              >
                <h3 style={heroStyles.cardTitle}>{event.title}</h3>
                <div style={heroStyles.cardDate}>
                  <FontAwesomeIcon icon={faCalendar} />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div style={heroStyles.cardLocation}>
                  📍 {event.location}
                </div>
                <p style={heroStyles.cardDescription}>{event.description}</p>
                
                {/* Progress bar for event participation */}
                <div style={heroStyles.progressBar}>
                  <div 
                    style={{
                      ...heroStyles.progressFill,
                      width: `${(event.current_participants / event.max_participants) * 100}%`
                    }}
                  ></div>
                </div>
                <div style={heroStyles.progressText}>
                  {event.current_participants} of {event.max_participants} participants
                </div>
                
                <Link to={`/events`} style={heroStyles.viewAllButton}>
                  View Details <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/events" style={heroStyles.viewAllButton}>
              View All Events <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>

        {/* Featured Alumni */}
        <div style={heroStyles.section}>
          <h2 style={heroStyles.sectionTitle}>Featured Alumni</h2>
          <p style={heroStyles.sectionSubtitle}>
            Meet successful graduates from our community
          </p>
          <div style={heroStyles.grid}>
            {alumni.map((alum) => (
              <div 
                key={alum.id} 
                style={heroStyles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                }}
              >
                <div style={heroStyles.cardHeader}>
                  <div style={heroStyles.cardAvatar}>
                    {alum.profile_image ? (
                      <img 
                        src={alum.profile_image} 
                        alt={alum.username}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      alum.username.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={heroStyles.cardTitle}>{alum.username}</h3>
                    <div style={heroStyles.cardRole}>{alum.role}</div>
                    <div style={heroStyles.cardCompany}>{alum.company}</div>
                  </div>
                </div>
                
                <div style={heroStyles.cardBatch}>
                  Batch of {alum.batch_year} • {alum.school}
                </div>
                
                <div style={heroStyles.socialLinks}>
                  {alum.linkedin_url && (
                    <a 
                      href={alum.linkedin_url} 
                      style={heroStyles.socialLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#10B981';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#1D4ED8';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  )}
                  {alum.github_url && (
                    <a 
                      href={alum.github_url} 
                      style={heroStyles.socialLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#10B981';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#1D4ED8';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  )}
                </div>
                
                <Link to={`/alumni`} style={heroStyles.viewAllButton}>
                  View Profile <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/alumni" style={heroStyles.viewAllButton}>
              View All Alumni <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
