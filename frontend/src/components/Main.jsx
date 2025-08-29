import React from 'react';
import Button from './UI/Button';

const heroStyles = {
  wrapper: {
    backgroundColor: '#F3F4F6'
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '30px'
  },
  title: {
    color: '#1F2937',
    fontSize: '36px',
    fontWeight: 800,
    marginBottom: '12px'
  },
  subtitle: {
    color: '#4B5563',
    lineHeight: 1.7,
    marginBottom: '20px'
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px'
  },
  cardTitle: {
    fontWeight: 700,
    marginBottom: '8px',
    color: '#1F2937'
  },
  badge: {
    backgroundColor: '#F59E0B',
    color: '#111827',
    padding: '4px 8px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 700,
    display: 'inline-block',
    marginBottom: '10px'
  }
}

const Main = () => {
  return (
    <section style={heroStyles.wrapper}>
      <div style={heroStyles.container}>
        <div>
          <div style={heroStyles.badge}>Welcome</div>
          <h1 style={heroStyles.title}>Alumni Connect Portal</h1>
          <p style={heroStyles.subtitle}>
            Reconnect with peers, discover events, and showcase your achievements. Mentor students
            and explore career opportunities across the alumni network.
          </p>
          <Button text="Get Started" href="/register" />
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={heroStyles.card}>
            <div style={heroStyles.cardTitle}>Upcoming Event</div>
            <div style={{ color: '#4B5563' }}>Annual Alumni Meet - Dec 10</div>
          </div>
          <div style={heroStyles.card}>
            <div style={heroStyles.cardTitle}>Featured Alumni</div>
            <div style={{ color: '#4B5563' }}>Jane Doe — Senior Engineer at TechCorp</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
