import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Home.module.css";
import { TestimonialsColumn } from "../components/UI/TestimonialsColumn";

const testimonials = [
  { text: "This ERP revolutionized our operations...", image: "https://randomuser.me/api/portraits/women/1.jpg", name: "Briana Patton", role: "Operations Manager" },
  { text: "Implementing this ERP was smooth and quick...", image: "https://randomuser.me/api/portraits/men/2.jpg", name: "Bilal Ahmed", role: "IT Manager" },
  { text: "The support team is exceptional...", image: "https://randomuser.me/api/portraits/women/3.jpg", name: "Saman Malik", role: "Customer Support Lead" },
  { text: "This ERP's seamless integration enhanced our business operations...", image: "https://randomuser.me/api/portraits/men/4.jpg", name: "Omar Raza", role: "CEO" },
  { text: "Its robust features and quick support have transformed our workflow...", image: "https://randomuser.me/api/portraits/women/5.jpg", name: "Zainab Hussain", role: "Project Manager" },
  { text: "The smooth implementation exceeded expectations...", image: "https://randomuser.me/api/portraits/women/6.jpg", name: "Aliza Khan", role: "Business Analyst" },
  { text: "Our business functions improved with a user-friendly design...", image: "https://randomuser.me/api/portraits/men/7.jpg", name: "Farhan Siddiqui", role: "Marketing Director" },
  { text: "They delivered a solution that exceeded expectations...", image: "https://randomuser.me/api/portraits/women/8.jpg", name: "Sana Sheikh", role: "Sales Manager" },
  { text: "Using this ERP, our online presence and conversions significantly improved...", image: "https://randomuser.me/api/portraits/men/9.jpg", name: "Hassan Ali", role: "E-commerce Manager" },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Home = () => {
  const [events, setEvents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [eventsResponse, alumniResponse] = await Promise.all([
          axiosInstance.get("/api/events/"),
          axiosInstance.get("/api/alumni/"),
        ]);
        setEvents(eventsResponse.data.slice(0, 3));
        setAlumni(alumniResponse.data.filter(user => user.is_approved).slice(0, 3));
      } catch (err) {
        console.error("Error fetching data:", err);
        setEvents([]);
        setAlumni([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.title}>Welcome to AlumniConnect 🎓</h1>
          <p className={styles.subtitle}>Stay Connected. Empower Your Legacy.</p>
          <p className={styles.subtitle}>
            Join a vibrant network of past students, celebrate achievements, and discover new opportunities.
          </p>
          <Link to="/register" className={styles.ctaButton}>
            Join the Community
          </Link>
        </div>

        {/* Events Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <p className={styles.sectionSubtitle}>
            Join upcoming events and connect with our alumni community
          </p>

          <div className={styles.grid}>
            {events.map(event => (
              <div key={event.id} className={styles.eventCard}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <div className={styles.eventDate}>
                  <FontAwesomeIcon icon={faCalendar} />{" "}
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className={styles.eventLocation}>📍 {event.location}</div>
                <p className={styles.eventDescription}>{event.description}</p>

                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${(event.current_participants / event.max_participants) * 100}%`,
                    }}
                  />
                </div>
                <div className={styles.progressText}>
                  {event.current_participants} of {event.max_participants} participants
                </div>

                <Link to={`/events/${event.id}`} className={styles.viewEventButton}>
                  View Details <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.centered}>
            <Link to="/events" className={styles.viewAllButton}>
              View All Events <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </section>

        {/* Alumni Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Notable Alumni</h2>
          <div className={styles.alumniGrid}>
            {alumni.map(alum => (
              <div key={alum.id} className={styles.alumniCard}>
                <img
                  src={alum.profile_image || "https://via.placeholder.com/120"}
                  alt={alum.username}
                  className={styles.alumniImage}
                />
                <h3 className={styles.alumniName}>{alum.username}</h3>
                <p className={styles.alumniRole}>{alum.role}</p>
                <p className={styles.alumniCompany}>{alum.company}</p>
                <div className={styles.alumniActions}>
                  {alum.linkedin_url && (
                    <a
                      href={alum.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.alumniButton}
                    >
                      LinkedIn
                    </a>
                  )}
                  {alum.email && (
                    <a href={`mailto:${alum.email}`} className={styles.alumniButton}>
                      Email
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.centered}>
            <Link to="/alumni" className={styles.viewAllButton}>
              View All Alumni <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </section>

        {/* Stats Section */}
<section className={styles.section}>
  <h2 className={styles.sectionTitle}>Our Growing Network</h2>
  <p className={styles.sectionSubtitle}>
    Celebrating the strength of our alumni community and partner companies
  </p>

  <div className={styles.statsGrid}>
    <div className={styles.statCard}>
      <h3 className={styles.statNumber}>{alumni.length}+</h3>
      <p className={styles.statLabel}>Registered Alumni</p>
    </div>

    <div className={styles.statCard}>
      <h3 className={styles.statNumber}>120+</h3>
      <p className={styles.statLabel}>Partner Companies</p>
    </div>

    <div className={styles.statCard}>
      <h3 className={styles.statNumber}>{events.length}</h3>
      <p className={styles.statLabel}>Upcoming Events</p>
    </div>

    <div className={styles.statCard}>
      <h3 className={styles.statNumber}>15+</h3>
      <p className={styles.statLabel}>Countries Represented</p>
    </div>
  </div>
</section>


        {/* Testimonials Section */}
<section className={styles.testimonialsSection}>
  <div className={styles.testimonialsContainer}>
    <h2 className={styles.testimonialsTitle}>See What Our Users Say</h2>
    <div className={styles.testimonialsColumnsWrapper}>
      {[firstColumn, secondColumn, thirdColumn].map((column, colIndex) => (
        <div key={colIndex} className={styles.testimonialsColumn}>
          <div className={styles.testimonialsTrack}>
            {[...column, ...column].map((t, index) => (
              <div key={index} className={styles.testimonialCard}>
                <img src={t.image} alt={t.name} className={styles.testimonialImage} />
                <p className={styles.testimonialText}>"{t.text}"</p>
                <h4 className={styles.testimonialName}>{t.name}</h4>
                <p className={styles.testimonialRole}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      </div>
    </div>
  );
};

export default Home;
