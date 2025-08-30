import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarkerAlt, faUsers, faClock } from '@fortawesome/free-solid-svg-icons';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState({});
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/events/');
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
      // Set dummy data for development
      setEvents([
        {
          id: 1,
          title: 'Annual Alumni Meet 2024',
          description: 'Join us for the annual alumni gathering where we celebrate achievements and network with fellow alumni.',
          date: '2024-12-15',
          time: '18:00',
          location: 'Main Campus Auditorium',
          max_participants: 200,
          current_participants: 150,
          is_registered: false
        },
        {
          id: 2,
          title: 'Career Fair 2024',
          description: 'Connect with top companies and explore career opportunities. Perfect for recent graduates and experienced professionals.',
          date: '2024-11-20',
          time: '10:00',
          location: 'Business School Hall',
          max_participants: 300,
          current_participants: 250,
          is_registered: true
        },
        {
          id: 3,
          title: 'Tech Workshop: AI & Machine Learning',
          description: 'Learn the latest technologies in AI and Machine Learning from industry experts.',
          date: '2024-10-30',
          time: '14:00',
          location: 'Computer Science Lab',
          max_participants: 50,
          current_participants: 35,
          is_registered: false
        },
        {
          id: 4,
          title: 'Mentorship Program Launch',
          description: 'Launch of our new mentorship program connecting current students with successful alumni.',
          date: '2024-11-05',
          time: '16:00',
          location: 'Student Center',
          max_participants: 100,
          current_participants: 80,
          is_registered: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    if (!isLoggedIn) {
      alert('Please login to register for events');
      return;
    }

    try {
      setRegistering(prev => ({ ...prev, [eventId]: true }));
      await axiosInstance.post(`/api/events/${eventId}/register/`);
      
      // Update the event registration status
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, is_registered: true, current_participants: event.current_participants + 1 }
          : event
      ));
      
      alert('Successfully registered for the event!');
    } catch (err) {
      console.error('Error registering for event:', err);
      alert(err.response?.data?.detail || 'Failed to register for event');
    } finally {
      setRegistering(prev => ({ ...prev, [eventId]: false }));
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      setRegistering(prev => ({ ...prev, [eventId]: true }));
      // Note: You might need to implement an unregister endpoint
      // await axiosInstance.delete(`/api/events/${eventId}/register/`);
      
      // Update the event registration status
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, is_registered: false, current_participants: event.current_participants - 1 }
          : event
      ));
      
      alert('Successfully unregistered from the event');
    } catch (err) {
      console.error('Error unregistering from event:', err);
      alert('Failed to unregister from event');
    } finally {
      setRegistering(prev => ({ ...prev, [eventId]: false }));
    }
  };

  const pageStyles = {
    wrapper: {
      backgroundColor: '#F3F4F6',
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '64px', // Match header height
      minHeight: '100vh'
    },
    container: {
      maxWidth: '1200px',
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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '24px'
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E5E7EB',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#1F2937',
      marginBottom: '12px'
    },
    cardDescription: {
      color: '#4B5563',
      marginBottom: '20px',
      lineHeight: 1.6
    },
    cardMeta: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '20px'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#6B7280',
      fontSize: '14px'
    },
    participants: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '12px',
      backgroundColor: '#F9FAFB',
      borderRadius: '8px'
    },
    participantText: {
      color: '#374151',
      fontSize: '14px',
      fontWeight: 600
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#E5E7EB',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: '8px'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#10B981',
      transition: 'width 0.3s ease'
    },
    registerButton: {
      backgroundColor: '#1D4ED8',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.2s ease'
    },
    unregisterButton: {
      backgroundColor: '#EF4444',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.2s ease'
    },
    disabledButton: {
      backgroundColor: '#9CA3AF',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'not-allowed',
      width: '100%'
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
          <div style={pageStyles.loadingText}>Loading events...</div>
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
          <h1 style={pageStyles.title}>Upcoming Events</h1>
          <p style={pageStyles.subtitle}>
            Discover and register for exciting alumni events, workshops, and networking opportunities.
          </p>
        </div>

        <div style={pageStyles.grid}>
          {events.map((event) => {
            const isFull = event.current_participants >= event.max_participants;
            const progressPercentage = (event.current_participants / event.max_participants) * 100;

            return (
              <div key={event.id} style={pageStyles.card}>
                <h3 style={pageStyles.cardTitle}>{event.title}</h3>
                <p style={pageStyles.cardDescription}>{event.description}</p>
                
                <div style={pageStyles.cardMeta}>
                  <div style={pageStyles.metaItem}>
                    <FontAwesomeIcon icon={faCalendar} />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div style={pageStyles.metaItem}>
                    <FontAwesomeIcon icon={faClock} />
                    {event.time}
                  </div>
                  <div style={pageStyles.metaItem}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {event.location}
                  </div>
                </div>

                <div style={pageStyles.participants}>
                  <div>
                    <div style={pageStyles.participantText}>
                      <FontAwesomeIcon icon={faUsers} /> {event.current_participants}/{event.max_participants} participants
                    </div>
                    <div style={pageStyles.progressBar}>
                      <div 
                        style={{ 
                          ...pageStyles.progressFill, 
                          width: `${progressPercentage}%` 
                        }} 
                      />
                    </div>
                  </div>
                </div>

                {event.is_registered ? (
                  <button
                    style={pageStyles.unregisterButton}
                    onClick={() => handleUnregister(event.id)}
                    disabled={registering[event.id]}
                  >
                    {registering[event.id] ? 'Unregistering...' : 'Unregister'}
                  </button>
                ) : (
                  <button
                    style={isFull ? pageStyles.disabledButton : pageStyles.registerButton}
                    onClick={() => handleRegister(event.id)}
                    disabled={isFull || registering[event.id] || !isLoggedIn}
                  >
                    {registering[event.id] 
                      ? 'Registering...' 
                      : isFull 
                        ? 'Event Full' 
                        : !isLoggedIn 
                          ? 'Login to Register' 
                          : 'Register for Event'
                    }
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
