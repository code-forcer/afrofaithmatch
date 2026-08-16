"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

// A component that generates bubbling particles floating up the screen
export default function ParticleBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate 15-20 particles with random positions and sizes
    const generateParticles = () => {
      return Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage
        size: Math.random() * 24 + 12, // 12px to 36px
        delay: Math.random() * 5, // 0s to 5s delay
        duration: Math.random() * 6 + 6, // 6s to 12s duration
        opacity: Math.random() * 0.15 + 0.05, // very faint
      }));
    };

    setParticles(generateParticles());
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none", // Prevent clicks on particles
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110vh", x: `${p.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: "-10vh", // Float up past the top
            x: `${p.x + (Math.random() * 10 - 5)}vw`, // Drift slightly left/right
            opacity: [0, p.opacity, p.opacity, 0], // Fade in and out
            rotate: 360,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            color: "#FAF8F3", // Cream color
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* We alternate between simple circles (bubbles) and hearts */}
          {p.id % 3 === 0 ? (
            <FaHeart size={p.size} />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(250,248,243,0.8) 0%, rgba(250,248,243,0.1) 100%)",
                boxShadow: "0 0 10px rgba(250,248,243,0.3)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
