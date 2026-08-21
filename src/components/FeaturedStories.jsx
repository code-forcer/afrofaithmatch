"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaChurch, FaCheckCircle } from "react-icons/fa";

const profiles = [
  {
    id: 1,
    name: "Michael",
    age: 28,
    location: "Atlanta, GA",
    denomination: "Non-Denominational",
    image: "/images/features/f1.avif",
  },
  {
    id: 2,
    name: "Sarah",
    age: 26,
    location: "Dallas, TX",
    denomination: "Baptist",
    image: "/images/features/f2.avif",
  },
  {
    id: 3,
    name: "David",
    age: 30,
    location: "London, UK",
    denomination: "Pentecostal",
    image: "/images/features/f3.avif",
  },
  {
    id: 4,
    name: "Grace",
    age: 27,
    location: "Lagos, NG",
    denomination: "Anglican",
    image: "/images/features/f4.avif",
  },
  {
    id: 5,
    name: "James",
    age: 31,
    location: "Houston, TX",
    denomination: "Methodist",
    image: "/images/features/f5.avif",
  },
  {
    id: 6,
    name: "Faith",
    age: 25,
    location: "Nairobi, KE",
    denomination: "Non-Denominational",
    image: "/images/features/f6.avif",
  },
];

function ProfileCard({ profile }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      style={{
        width: 320,
        height: 480,
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        boxShadow: hovered
          ? "0 24px 48px rgba(154,0,2,0.22)"
          : "0 10px 30px rgba(0,0,0,0.1)",
        border: "1px solid rgba(154,0,2,0.05)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Profile Image with Ken Burns zoom on hover */}
      <motion.img
        src={profile.image}
        alt={profile.name}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Gradient Overlay for Text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
        }}
      />

      {/* Verified ribbon, top-left */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.25)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.03em",
          color: "#FAF8F3",
        }}
      >
        <FaCheckCircle color="#4ade80" size={12} />
        Bible Verified
      </motion.div>

      {/* Profile Info Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 24,
          color: "#FAF8F3",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-canela), Georgia, serif",
            fontSize: 28,
            margin: "0 0 8px 0",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {profile.name}, {profile.age}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 8,
              height: 8,
              background: "#22c55e",
              borderRadius: "50%",
              boxShadow: "0 0 8px rgba(34,197,94,0.6)",
            }}
          />
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 14,
            opacity: 0.9,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FaMapMarkerAlt color="#C6A85D" size={14} />
            <span>{profile.location}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FaChurch color="#C6A85D" size={14} />
            <span>{profile.denomination}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: 20,
            width: "100%",
            padding: "12px 0",
            background: hovered ? "#9a0002" : "rgba(255,255,255,0.1)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 999,
            color: "#fff",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            transition: "background 0.35s ease",
          }}
        >
          <motion.span
            animate={hovered ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, repeat: hovered ? Infinity : 0 }}
            style={{ display: "inline-flex" }}
          >
            <FaHeart color={hovered ? "#fff" : "#9a0002"} />
          </motion.span>
          Say Hello
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function FeaturedStories() {
  const marqueeItems = [...profiles, ...profiles, ...profiles];
  const controls = useAnimationControls();
  const [paused, setPaused] = useState(false);

  const startLoop = () => {
    controls.start({
      x: ["0%", "-33.333%"],
      transition: { ease: "linear", duration: 45, repeat: Infinity },
    });
  };

  return (
    <section
      style={{
        padding: "120px 0",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          textAlign: "center",
          marginBottom: 64,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#9a0002",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Faith First. Love Follows.
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-canela), Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#1a0000",
            margin: 0,
            lineHeight: 1.2,
            maxWidth: 800,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Meet Christian Singles Near You
        </motion.h2>
      </div>

      {/* Infinite Marquee Wrapper with edge fade mask */}
      <div
        style={{
          position: "relative",
          width: "100%",
          padding: "20px 0",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
        onMouseEnter={() => {
          setPaused(true);
          controls.stop();
        }}
        onMouseLeave={() => {
          setPaused(false);
          startLoop();
        }}
      >
        <motion.div
          animate={controls}
          onViewportEnter={startLoop}
          style={{
            display: "flex",
            gap: 24,
            width: "max-content",
            paddingLeft: 24,
          }}
        >
          {marqueeItems.map((profile, index) => (
            <ProfileCard key={`${profile.id}-${index}`} profile={profile} />
          ))}
        </motion.div>

        {/* Subtle "paused" hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: paused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            right: 20,
            fontSize: 12,
            color: "rgba(26,0,0,0.4)",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          Paused — hover a card to explore
        </motion.div>
      </div>
    </section>
  );
}