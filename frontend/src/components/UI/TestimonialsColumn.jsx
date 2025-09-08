import React from "react";
import { motion } from "framer-motion"; // motion/react works with framer-motion

export const TestimonialsColumn = ({ testimonials, duration = 15 }) => {
  // Duplicate testimonials to allow seamless scrolling
  const repeatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div style={{ flex: 1, overflow: "hidden" }}>
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {repeatedTestimonials.map((t, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ marginBottom: "12px" }}>{t.text}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={t.image}
                alt={t.name}
                style={{ width: 40, height: 40, borderRadius: "50%" }}
              />
              <div>
                <div style={{ fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: "14px", color: "#6b7280" }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
