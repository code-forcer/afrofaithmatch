"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    quote:
      "I've tried countless dating apps, but none of them ever felt worth it or real. God definitely used this app to bless me in the best way ever, I recently matched with my future wife on Afro Faith Match! The process was super simple and was very straightforward.",
    name: "Marcus",
    image:
      "https://images.unsplash.com/photo-1611731283058-fc6b8773f7e3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "I met somebody - he's 26 hours away, but love doesn't measure. He's the best thing that has ever happened to me, and I can't wait until what God has for our life. Thank you Father God for this wonderful, amazing man that you brought into my life.",
    name: "Aisha",
    image:
      "https://images.unsplash.com/photo-1614174669570-037a92241af8?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "I met Naomi over the chat feature. I initially didn't hear back, but one day, I got bored and sent a GIF. She responded back, and we started talking, we hit it off! I love her very much, she means more to me than anything this world can give me.",
    name: "James & Naomi",
    image:
      "https://images.unsplash.com/photo-1624228652393-eab1721b1899?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 4,
    quote:
      "From all of the Christian dating apps out there, Afro Faith Match is my favorite so far. Even though I tend to go through very few profiles a day, the ones that I have read seem to be from people who are really intentional in meeting a like minded Christian.",
    name: "Chloe",
    image:
      "https://images.unsplash.com/photo-1440367850806-da68da359421?q=80&w=300&auto=format&fit=crop",
  },
];

function StarRow() {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.35, ease: "backOut" }}
        >
          <FaStar size={13} color="#C6A85D" />
        </motion.span>
      ))}
    </div>
  );
}

function TestimonialCard({ test, i }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      style={{
        width: 400,
        background: "#fff",
        borderRadius: 24,
        padding: 40,
        boxShadow: hovered
          ? "0 24px 44px rgba(154,0,2,0.14)"
          : "0 12px 30px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(154,0,2,0.05)",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Large watermark quote mark, drifting subtly */}
      <motion.div
        animate={{ y: hovered ? -4 : 0, opacity: hovered ? 0.1 : 0.05 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: -10,
          right: 10,
          fontSize: 130,
          fontFamily: "var(--font-canela), Georgia, serif",
          color: "#9a0002",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        "
      </motion.div>

      <motion.div
        animate={{ rotate: hovered ? -8 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: 20 }}
      >
        <FaQuoteLeft size={28} color="rgba(198,168,93,0.4)" />
      </motion.div>

      <StarRow />

      <p
        style={{
          fontSize: 16,
          color: "rgba(100,80,80,0.85)",
          lineHeight: 1.65,
          fontStyle: "italic",
          flexGrow: 1,
          margin: "0 0 32px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        "{test.quote}"
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: "auto",
        }}
      >
        <motion.div
          animate={
            hovered
              ? { boxShadow: "0 0 0 6px rgba(198,168,93,0.25)" }
              : { boxShadow: "0 0 0 0px rgba(198,168,93,0)" }
          }
          transition={{ duration: 0.4 }}
          style={{ borderRadius: "50%" }}
        >
          <img
            src={test.image}
            alt={test.name}
            draggable="false"
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #C6A85D",
              display: "block",
            }}
          />
        </motion.div>
        <h4
          style={{
            fontFamily: "var(--font-canela), Georgia, serif",
            fontSize: 20,
            color: "#1a0000",
            margin: 0,
          }}
        >
          {test.name}
        </h4>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const containerRef = useRef(null);
  const [dragWidth, setDragWidth] = useState(0);
  const x = useMotionValue(0);
  const progress = useTransform(x, [-dragWidth || -1, 0], [1, 0]);

  useEffect(() => {
    if (containerRef.current) {
      setDragWidth(
        containerRef.current.scrollWidth - containerRef.current.offsetWidth
      );
    }
  }, []);

  const nudge = (dir) => {
    const next = Math.min(
      0,
      Math.max(-dragWidth, x.get() + dir * 420)
    );
    animate(x, next, { type: "spring", stiffness: 220, damping: 30 });
  };

  return (
    <section
      style={{
        padding: "120px 20px",
        background: "#FAF8F3",
        borderTop: "1px solid rgba(198,168,93,0.2)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          textAlign: "center",
          marginBottom: 56,
        }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: "inline-block",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#9a0002",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Real Testimonies
        </motion.span>
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
          }}
        >
          Love Stories Written by <span style={{ color: "#9a0002" }}>Faith</span>
        </motion.h2>
      </div>

      {/* Testimonials Drag Carousel */}
      <div ref={containerRef} style={{ cursor: "grab", overflow: "hidden" }}>
        <motion.div
          drag="x"
          style={{ x }}
          dragConstraints={{ right: 0, left: -dragWidth }}
          dragElastic={0.08}
          whileTap={{ cursor: "grabbing" }}
          className="afm-testimonial-track"
        >
          <div
            style={{
              display: "flex",
              gap: 24,
              paddingBottom: 40,
              paddingLeft: 20,
              width: "max-content",
            }}
          >
            {testimonials.map((test, i) => (
              <TestimonialCard key={test.id} test={test} i={i} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress + manual nudge controls */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          marginTop: 8,
        }}
      >
        <motion.button
          onClick={() => nudge(1)}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(154,0,2,0.2)",
            background: "#fff",
            color: "#9a0002",
            fontSize: 16,
            cursor: "pointer",
          }}
          aria-label="Previous testimonial"
        >
          ←
        </motion.button>

        <div
          style={{
            width: 160,
            height: 4,
            borderRadius: 2,
            background: "rgba(154,0,2,0.12)",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              background: "#9a0002",
              scaleX: progress,
              transformOrigin: "left",
              width: "100%",
            }}
          />
        </div>

        <motion.button
          onClick={() => nudge(-1)}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(154,0,2,0.2)",
            background: "#fff",
            color: "#9a0002",
            fontSize: 16,
            cursor: "pointer",
          }}
          aria-label="Next testimonial"
        >
          →
        </motion.button>
      </div>
    </section>
  );
}