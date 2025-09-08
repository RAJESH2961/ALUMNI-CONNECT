import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMapMarkerAlt,
  faUsers,
  faClock,
  faTicketAlt,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState({});
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/events/");
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    if (!isLoggedIn) {
      alert("Please login to register for events");
      return;
    }
  
    try {
      setRegistering((prev) => ({ ...prev, [eventId]: true }));
  
      // 🔥 Correct endpoint
      await axiosInstance.post(`/api/events/${eventId}/register/`);
  
      // Update event state
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId
            ? {
                ...event,
                is_registered: true,
                current_participants: event.current_participants + 1,
              }
            : event
        )
      );
  
      alert("✅ Successfully registered! A confirmation email has been sent.");
    } catch (err) {
      console.error("Error registering for event:", err);
      alert(err.response?.data?.error || "❌ Failed to register for event");
    } finally {
      setRegistering((prev) => ({ ...prev, [eventId]: false }));
    }
  };
  

  if (loading) {
    return <div className="loading-text">Loading events...</div>;
  }

  return (
    <div className="events-wrapper">
      <div className="events-container">
        <h1 className="events-title">Upcoming Events</h1>

        <div className="events-grid">
          {events.map((event) => {
            const current = Number(event.registered_users_count) || 0;
            const max = Number(event.max_seats) || 0;
            const remaining = Number(event.remaining_seats) || 0;
            const progress = max > 0 ? (current / max) * 100 : 0;

            return (
              <div key={event.id} className="event-card">
                {event.media && (
                  <img
                    src={event.media}
                    alt={event.title}
                    className="event-image"
                  />
                )}

                <h2>{event.title}</h2>
                <p className="event-description">{event.description}</p>

                <div className="event-meta">
                  <div>
                    <FontAwesomeIcon icon={faCalendar} />{" "}
                    {new Date(event.date).toLocaleString()}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faUsers} /> {event.event_type}
                  </div>
                </div>

                <div className="participants-section">
                  <p className="participants-count">
                    <FontAwesomeIcon icon={faUsers} /> {current}/{max} seats
                  </p>

                  <p
                    className={`remaining-seats ${
                      remaining <= 5 ? "warning" : "ok"
                    }`}
                  >
                    <FontAwesomeIcon icon={faTicketAlt} /> {remaining} seats left
                    {remaining <= 5 && (
                      <span className="low-warning">
                        <FontAwesomeIcon icon={faExclamationTriangle} /> Hurry
                        up!
                      </span>
                    )}
                  </p>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {event.is_full ? (
                  <button className="btn-disabled" disabled>
                    Event Full
                  </button>
                ) : (
                  <button
                    className="btn-register"
                    onClick={() => handleRegister(event.id)}
                    disabled={registering[event.id]}
                  >
                    {registering[event.id] ? "Registering..." : "Register Now"}
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
