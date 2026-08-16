"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

// Rotating background — black couples, mixed moods (romantic, joyful, elegant)
const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1624228652376-d4faa602b278?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594425437587-e75c19ebf332?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1619472020200-e0d17642b00c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1644041852210-4873f99366be?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614804520306-ecbee1dfd39b?q=80&w=2070&auto=format&fit=crop",
];

const SLIDE_DURATION = 6000; // ms per background image

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Splits the headline into words for a staggered reveal
function AnimatedHeadline() {
  const line1 = ["Where", "Faith", "Leads"];
  const line2Pre = ["to"];
  const highlighted = "Meaningful Love";

  const wordVariant = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.h1
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      style={{
        fontFamily: "var(--font-canela), Georgia, serif",
        fontSize: "clamp(3rem, 8vw, 5.5rem)",
        lineHeight: 1.1,
        fontWeight: 400,
        margin: 0,
        letterSpacing: "-0.02em",
        textShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <span style={{ display: "block" }}>
        {line1.map((word, i) => (
          <motion.span
            key={word}
            variants={wordVariant}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span style={{ display: "block" }}>
        {line2Pre.map((word) => (
          <motion.span
            key={word}
            variants={wordVariant}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {word}
          </motion.span>
        ))}
        <motion.span
          variants={wordVariant}
          style={{
            display: "inline-block",
            position: "relative",
            color: "#c9484a",
            backgroundImage: "linear-gradient(90deg, #9a0002, #d34a4c, #9a0002)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1.4 }}
        >
          {highlighted}
        </motion.span>
      </span>
    </motion.h1>
  );
}

// Small floating "social proof" pill that drifts gently
function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.6, duration: 0.7, ease: "easeOut" }}
      style={{ display: "inline-flex" }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 18px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(10px)",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: "#FAF8F3",
        }}
      >
        <motion.span
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#4ade80",
            display: "inline-block",
          }}
        />
     ✨ Welcome to AfroFaithMatch
      </motion.div>
    </motion.div>
  );
}

// Magnetic button with hover shine sweep
function MagneticButton({ href, children, primary }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.5 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "relative",
        display: "inline-block",
        padding: "16px 36px",
        background: primary ? "#9a0002" : "#fff",
        color: primary ? "#fff" : "#000",
        fontSize: 16,
        fontWeight: 600,
        borderRadius: 30,
        textDecoration: "none",
        overflow: "hidden",
        boxShadow: primary
          ? "0 8px 24px rgba(154,0,2,0.4)"
          : "0 8px 24px rgba(0,0,0,0.2)",
        border: primary ? "none" : "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <motion.span
        aria-hidden
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "60%",
          height: "100%",
          background:
            "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)",
          transform: "skewX(-20deg)",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.a>
  );
}

// Bouncing scroll indicator
function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      style={{
        position: "absolute",
        bottom: 28,
        left: "50%",
        translateX: "-50%",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 26,
          height: 40,
          borderRadius: 14,
          border: "2px solid rgba(250,248,243,0.6)",
          display: "flex",
          justifyContent: "center",
          paddingTop: 6,
        }}
      >
        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 4,
            height: 8,
            borderRadius: 2,
            background: "#FAF8F3",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Background Image Carousel */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <motion.img
              src={BACKGROUND_IMAGES[current]}
              alt="Black Christian couple"
              initial={{ scale: 1 }}
              animate={{ scale: 1.15 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1.4, ease: "linear" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark Cherry Gradient + Vignette Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(154,0,2,0.25) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* Slide Indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 28,
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        {BACKGROUND_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Show background ${i + 1}`}
            style={{
              width: i === current ? 22 : 8,
              height: 8,
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              background:
                i === current ? "#FAF8F3" : "rgba(250,248,243,0.4)",
              transition: "width 0.4s ease, background 0.4s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Bubbling Particles */}
      <ParticleBackground />

      {/* Hero Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 900,
          margin: "0 auto",
          padding: "100px 20px",
          textAlign: "center",
          color: "#FAF8F3",
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <FloatingBadge />

          <AnimatedHeadline />

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
              fontWeight: 300,
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.5,
              opacity: 0.9,
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Join a trusted Afro Christian community for singles seeking
            Christ-centered relationships built on faith, purpose, and
            lifelong commitment.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
              marginTop: 32,
            }}
          >
            <MagneticButton href="/register" primary>
              Create Free Profile
            </MagneticButton>
            <MagneticButton href="/browse">
              Browse Christian Singles
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <ScrollCue />


    </section>
  );
}