// src/components/EventsComponent.jsx
import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMapMarkerAlt,
  faUsers,
  faTicketAlt,
  faExclamationTriangle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./Events.css"; // Assume we have some basic styles
const EventsComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState({});
  const [toast, setToast] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/events/");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      showToast("❌ Failed to load events", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    if (!isLoggedIn) {
      showToast("⚠️ Please login to register", "info");
      return;
    }

    try {
      setRegistering((prev) => ({ ...prev, [eventId]: true }));

      await axiosInstance.post(`/api/events/${eventId}/register/`);

      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId
            ? {
                ...event,
                is_registered: true,
                current_participants: event.current_participants + 1,
                remaining_seats: event.remaining_seats - 1,
              }
            : event
        )
      );

      showToast("✅ Successfully registered!", "success");
    } catch (err) {
      console.error("Error registering:", err);
      showToast(
        err.response?.data?.error || "❌ Failed to register",
        "error"
      );
    } finally {
      setRegistering((prev) => ({ ...prev, [eventId]: false }));
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="events-pro-wrapper">
      <h1 className="events-pro-title">Upcoming Events</h1>

      {/* TOAST */}
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}

      {/* LOADING SKELETON */}
      {loading ? (
        <div className="events-pro-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-img"></div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-btn"></div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="empty-msg">No upcoming events available.</p>
      ) : (
        <div className="events-pro-grid">
          {events.map((event) => {
            const current = Number(event.registered_users_count) || 0;
            const max = Number(event.max_seats) || 0;
            const remaining = Number(event.remaining_seats) || 0;
            const progress = max > 0 ? (current / max) * 100 : 0;

            return (
              <div key={event.id} className="event-pro-card">
                {/* IMAGE + OVERLAY */}
                <div className="event-pro-image-wrapper">
                  {event.media && (
                    <img
                      src={event.media}
                      alt={event.title}
                      className="event-pro-image"
                    />
                  )}
                  <div className="event-pro-overlay">
                    <button
                      className="btn-view"
                      onClick={() => setModalEvent(event)}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* TITLE + DESCRIPTION */}
                <h2 className="event-pro-title-small">{event.title}</h2>
                <p className="event-pro-desc">{event.description}</p>

                {/* META INFO */}
                <div className="event-pro-meta">
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

                {/* PARTICIPANTS + PROGRESS */}
                <div className="event-pro-progress">
                  <p className="participants-count">
                    <FontAwesomeIcon icon={faUsers} /> {current}/{max} seats
                  </p>
                  <p
                    className={`remaining ${
                      remaining <= 5 ? "low" : "ok"
                    }`}
                  >
                    <FontAwesomeIcon icon={faTicketAlt} /> {remaining} left
                    {remaining <= 5 && (
                      <span className="warn-icon">
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

                {/* REGISTER BUTTON */}
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
      )}

      {/* MODAL */}
      {modalEvent && (
        <div className="modal-overlay" onClick={() => setModalEvent(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setModalEvent(null)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {modalEvent.media && (
              <img
                src={modalEvent.media}
                alt={modalEvent.title}
                className="modal-img"
              />
            )}
            <h2>{modalEvent.title}</h2>
            <p>{modalEvent.description}</p>
            <div className="event-pro-meta">
              <div>
                <FontAwesomeIcon icon={faCalendar} />{" "}
                {new Date(modalEvent.date).toLocaleString()}
              </div>
              <div>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {modalEvent.location}
              </div>
              <div>
                <FontAwesomeIcon icon={faUsers} /> {modalEvent.event_type}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsComponent;
