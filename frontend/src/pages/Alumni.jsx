import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faBriefcase, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const Alumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('');

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/profiles/');
      setAlumni(response.data);
    } catch (err) {
      console.error('Error fetching alumni:', err);
      setError('Failed to load alumni profiles');
      // Set dummy data for development
      setAlumni([
        {
          id: 1,
          username: 'John Doe',
          email: 'john.doe@example.com',
          role: 'Senior Software Engineer',
          company: 'TechCorp Inc.',
          batch_year: 2020,
          school: 'Computer Science',
          specialization: 'Software Engineering',
          bio: 'Passionate software engineer with 4+ years of experience in full-stack development.',
          linkedin_url: 'https://linkedin.com/in/johndoe',
          github_url: 'https://github.com/johndoe',
          portfolio_url: 'https://johndoe.dev',
          location: 'San Francisco, CA',
          is_approved: true
        },
        {
          id: 2,
          username: 'Jane Smith',
          email: 'jane.smith@example.com',
          role: 'Product Manager',
          company: 'InnovateTech',
          batch_year: 2019,
          school: 'Business Administration',
          specialization: 'Product Management',
          bio: 'Product manager with expertise in SaaS products and user experience design.',
          linkedin_url: 'https://linkedin.com/in/janesmith',
          github_url: 'https://github.com/janesmith',
          portfolio_url: 'https://janesmith.com',
          location: 'New York, NY',
          is_approved: true
        },
        {
          id: 3,
          username: 'Mike Johnson',
          email: 'mike.johnson@example.com',
          role: 'Data Scientist',
          company: 'DataFlow Analytics',
          batch_year: 2021,
          school: 'Mathematics',
          specialization: 'Data Science',
          bio: 'Data scientist specializing in machine learning and statistical analysis.',
          linkedin_url: 'https://linkedin.com/in/mikejohnson',
          github_url: 'https://github.com/mikejohnson',
          portfolio_url: 'https://mikejohnson.ai',
          location: 'Austin, TX',
          is_approved: true
        },
        {
          id: 4,
          username: 'Sarah Wilson',
          email: 'sarah.wilson@example.com',
          role: 'UX Designer',
          company: 'DesignStudio',
          batch_year: 2018,
          school: 'Design',
          specialization: 'User Experience',
          bio: 'Creative UX designer focused on creating intuitive and beautiful user interfaces.',
          linkedin_url: 'https://linkedin.com/in/sarahwilson',
          github_url: 'https://github.com/sarahwilson',
          portfolio_url: 'https://sarahwilson.design',
          location: 'Seattle, WA',
          is_approved: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = alum.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = !filterBatch || alum.batch_year.toString() === filterBatch;
    return matchesSearch && matchesBatch;
  });

  const uniqueBatchYears = [...new Set(alumni.map(alum => alum.batch_year))].sort((a, b) => b - a);

  const pageStyles = {
    wrapper: {
      backgroundColor: '#F3F4F6',
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
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
    filters: {
      display: 'flex',
      gap: '16px',
      marginBottom: '32px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    searchInput: {
      padding: '12px 16px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '16px',
      minWidth: '250px'
    },
    selectInput: {
      padding: '12px 16px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: '#ffffff'
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
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '16px'
    },
    avatar: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#1D4ED8',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 700
    },
    cardInfo: {
      flex: 1
    },
    cardName: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#1F2937',
      marginBottom: '4px'
    },
    cardRole: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#10B981',
      marginBottom: '4px'
    },
    cardCompany: {
      fontSize: '14px',
      color: '#6B7280',
      marginBottom: '8px'
    },
    cardMeta: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      marginBottom: '16px'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#6B7280',
      fontSize: '14px'
    },
    cardBio: {
      color: '#4B5563',
      marginBottom: '16px',
      lineHeight: 1.5,
      fontSize: '14px'
    },
    socialLinks: {
      display: 'flex',
      gap: '8px'
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
      transition: 'background-color 0.2s ease'
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
    },
    noResults: {
      textAlign: 'center',
      padding: '60px 0',
      fontSize: '18px',
      color: '#6B7280'
    }
  };

  if (loading) {
    return (
      <div style={pageStyles.wrapper}>
        <div style={pageStyles.container}>
          <div style={pageStyles.loadingText}>Loading alumni profiles...</div>
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
          <h1 style={pageStyles.title}>Alumni Network</h1>
          <p style={pageStyles.subtitle}>
            Connect with fellow alumni, explore career paths, and build professional relationships.
          </p>
        </div>

        <div style={pageStyles.filters}>
          <input
            type="text"
            placeholder="Search by name, role, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={pageStyles.searchInput}
          />
          <select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            style={pageStyles.selectInput}
          >
            <option value="">All Batch Years</option>
            {uniqueBatchYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {filteredAlumni.length === 0 ? (
          <div style={pageStyles.noResults}>
            No alumni found matching your search criteria.
          </div>
        ) : (
          <div style={pageStyles.grid}>
            {filteredAlumni.map((alum) => (
              <div key={alum.id} style={pageStyles.card}>
                <div style={pageStyles.cardHeader}>
                  <div style={pageStyles.avatar}>
                    {alum.username.charAt(0).toUpperCase()}
                  </div>
                  <div style={pageStyles.cardInfo}>
                    <h3 style={pageStyles.cardName}>{alum.username}</h3>
                    <div style={pageStyles.cardRole}>{alum.role}</div>
                    <div style={pageStyles.cardCompany}>{alum.company}</div>
                  </div>
                </div>

                <div style={pageStyles.cardMeta}>
                  <div style={pageStyles.metaItem}>
                    <FontAwesomeIcon icon={faGraduationCap} />
                    {alum.school} - {alum.specialization}
                  </div>
                  <div style={pageStyles.metaItem}>
                    <FontAwesomeIcon icon={faBriefcase} />
                    Batch of {alum.batch_year}
                  </div>
                  {alum.location && (
                    <div style={pageStyles.metaItem}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      {alum.location}
                    </div>
                  )}
                </div>

                {alum.bio && (
                  <p style={pageStyles.cardBio}>{alum.bio}</p>
                )}

                <div style={pageStyles.socialLinks}>
                  {alum.linkedin_url && (
                    <a 
                      href={alum.linkedin_url} 
                      style={pageStyles.socialLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="LinkedIn Profile"
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  )}
                  {alum.github_url && (
                    <a 
                      href={alum.github_url} 
                      style={pageStyles.socialLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="GitHub Profile"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  )}
                  {alum.portfolio_url && (
                    <a 
                      href={alum.portfolio_url} 
                      style={pageStyles.socialLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Portfolio"
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumni;
