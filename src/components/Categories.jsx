"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

const features = [
  {
    id: 1,
    number: "01",
    title: "Real People, Redeemed by Christ",
    description:
      "Dating is hard enough without wondering if others truly share your faith. That's why on Afro Faith Match, Bible verification isn't a feature, it's required.",
    image:
      "https://images.unsplash.com/photo-1561406636-b80293969660?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    number: "02",
    title: "Unapologetically Christian",
    description:
      "Christians deserve more than just a filter on an app. Specify your denomination, how often you go to church, and answer questions about your faith.",
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    number: "03",
    title: "Shared Values Make Stronger Relationships",
    description:
      "Define your goals, values, relationship intentions, and more. Choose from over 100 topics to help you connect on things you actually care about.",
    image:
      "https://images.unsplash.com/photo-1644041852210-4873f99366be?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    number: "04",
    title: "Safety from the Storm",
    description:
      "Using a combination of AI and human-reviewed safety checks, we strive to provide a safe and secure environment before and after you join the app.",
    image:
      "https://images.unsplash.com/photo-1506956191951-7a88da4435e5?q=80&w=1200&auto=format&fit=crop",
  },
];

// One alternating row — image + text, each with its own scroll-linked parallax and tilt-on-hover
function FeatureRow({ feature, index }) {
  const rowRef = useRef(null);
  const isReversed = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const numberY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const numberOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  // Mouse-driven tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={rowRef}
      className="afm-feature-row"
      style={{
        display: "flex",
        flexDirection: isReversed ? "row-reverse" : "row",
        alignItems: "center",
        gap: 64,
        marginBottom: 120,
        position: "relative",
      }}
    >
      {/* Image side */}
      <div
        className="afm-feature-image-col"
        style={{ flex: "1 1 50%", position: "relative", perspective: 1200 }}
      >
        {/* Big decorative number, parallaxing behind the image */}
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            top: isReversed ? -40 : -50,
            [isReversed ? "left" : "right"]: -20,
            y: numberY,
            opacity: numberOpacity,
            fontFamily: "var(--font-canela), Georgia, serif",
            fontSize: "clamp(5rem, 12vw, 9rem)",
            color: "rgba(154,0,2,0.08)",
            fontWeight: 400,
            lineHeight: 1,
            zIndex: 0,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {feature.number}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, x: isReversed ? 60 : -60, scale: 0.94 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative",
            zIndex: 1,
            height: 440,
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(26,0,0,0.12)",
            rotateX: springX,
            rotateY: springY,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: "-8%",
              y: imageY,
            }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              draggable="false"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>

          {/* Gradient wash */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(26,0,0,0.35), transparent 55%)",
              pointerEvents: "none",
            }}
          />

          {/* Thin animated accent border on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              border: "2px solid rgba(154,0,2,0.5)",
              borderRadius: 28,
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        style={{ flex: "1 1 50%", zIndex: 1 }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            height: 3,
            background: "#9a0002",
            marginBottom: 20,
            borderRadius: 2,
          }}
        />
        <h3
          style={{
            fontFamily: "var(--font-canela), Georgia, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            color: "#1a0000",
            margin: "0 0 18px",
            lineHeight: 1.25,
          }}
        >
          {feature.title}
        </h3>
        <p
          style={{
            fontSize: 17,
            color: "rgba(90,70,70,0.85)",
            lineHeight: 1.7,
            margin: 0,
            fontWeight: 300,
            maxWidth: 440,
          }}
        >
          {feature.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function Categories() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "120px 20px",
        background: "#FAF8F3",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @media (max-width: 860px) {
          .afm-feature-row {
            flex-direction: column !important;
            gap: 28px !important;
            margin-bottom: 72px !important;
          }
          .afm-feature-image-col > div:last-child {
            height: 320px !important;
          }
          .afm-progress-rail { display: none; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {/* Vertical scroll-progress rail, desktop only */}
        <div
          className="afm-progress-rail"
          style={{
            position: "absolute",
            left: -40,
            top: 220,
            bottom: 40,
            width: 2,
            background: "rgba(154,0,2,0.1)",
          }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              background: "#9a0002",
              scaleY: railScale,
              transformOrigin: "top",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: 96, textAlign: "center" }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              display: "inline-block",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#9a0002",
              marginBottom: 16,
            }}
          >
            Why Afro Faith Match
          </motion.span>
          <h2
            style={{
              fontFamily: "var(--font-canela), Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#1a0000",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            What makes Afro Faith Match <br />
            <span style={{ color: "#9a0002" }}>special?</span>
          </h2>
        </motion.div>

        {features.map((feature, i) => (
          <FeatureRow key={feature.id} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}