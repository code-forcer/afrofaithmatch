"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ── Ambient floating particle ── */
function Particle({ size, left, delay, duration, color, driftX = 20 }) {
  return (
    <motion.div
      animate={{
        y: [0, -700],
        x: [0, driftX, -driftX * 0.6, driftX * 0.4],
        opacity: [0, 0.5, 0.5, 0],
        scale: [0.7, 1, 1, 0.8],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
      style={{
        position: "absolute",
        bottom: 0,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

const communityParticles = [
  { size: 10, left: "8%", delay: 0, duration: 14, color: "rgba(198,168,93,0.5)" },
  { size: 6, left: "18%", delay: 2, duration: 11, color: "rgba(154,0,2,0.4)" },
  { size: 14, left: "30%", delay: 4, duration: 16, color: "rgba(198,168,93,0.35)" },
  { size: 8, left: "50%", delay: 1, duration: 13, color: "rgba(154,0,2,0.3)" },
  { size: 12, left: "68%", delay: 3, duration: 15, color: "rgba(198,168,93,0.45)" },
  { size: 7, left: "80%", delay: 5, duration: 12, color: "rgba(154,0,2,0.35)" },
  { size: 16, left: "90%", delay: 2.5, duration: 17, color: "rgba(198,168,93,0.3)" },
];

const ctaParticles = [
  { size: 10, left: "10%", delay: 0, duration: 13, color: "rgba(255,255,255,0.4)" },
  { size: 6, left: "22%", delay: 2, duration: 10, color: "rgba(198,168,93,0.5)" },
  { size: 13, left: "38%", delay: 4, duration: 15, color: "rgba(255,255,255,0.3)" },
  { size: 8, left: "55%", delay: 1, duration: 12, color: "rgba(198,168,93,0.4)" },
  { size: 15, left: "72%", delay: 3, duration: 16, color: "rgba(255,255,255,0.25)" },
  { size: 7, left: "86%", delay: 5, duration: 11, color: "rgba(198,168,93,0.45)" },
];

const bounceIn = {
  hidden: { opacity: 0, scale: 0.85, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 15 },
  },
};

export default function CTASection() {
  const cardRef = useRef(null);
  const isVisible = useInView(cardRef, { once: true, margin: "-80px" });
  const [wordsActive, setWordsActive] = useState(false);

  const imgWrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgWrapRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setWordsActive(true), 700);
    }
  }, [isVisible]);

  return (
    <>
      <style>{`
        .afm-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .afm-split-grid {
            grid-template-columns: 1fr !important;
          }
          .afm-split-grid.reverse > *:first-child { order: 2; }
          .afm-split-grid.reverse > *:last-child { order: 1; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          1. COMMUNITY — split image / content
          ══════════════════════════════════════ */}
      <section
        ref={cardRef}
        style={{
          position: "relative",
          padding: "110px 20px",
          background: "#FAF8F3",
          overflow: "hidden",
        }}
      >
        {communityParticles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        <div
          className="afm-split-grid"
          style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}
        >
          {/* Image side */}
          <motion.div
            ref={imgWrapRef}
            initial={{ opacity: 0, x: -60, rotate: -3 }}
            animate={isVisible ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "relative",
                height: 480,
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: "0 32px 70px rgba(26,0,0,0.18)",
              }}
            >
              <motion.div style={{ position: "absolute", inset: "-8%", y: imgY }}>
                <img
                  src="/images/cta/c2.avif"
                  alt="Members of the Afro Christian community"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(160deg, rgba(26,0,0,0.15), transparent 50%)",
                }}
              />
            </div>

            {/* Gold accent frame, offset behind the image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                position: "absolute",
                top: 20,
                left: -20,
                right: -20,
                bottom: -20,
                border: "2px solid rgba(198,168,93,0.4)",
                borderRadius: 28,
                zIndex: -1,
              }}
            />

            {/* Floating verified-community badge overlapping the image */}
            <motion.div
              variants={bounceIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 15 }}
              style={{
                position: "absolute",
                bottom: -24,
                right: -16,
                background: "#fff",
                borderRadius: 18,
                padding: "16px 22px",
                boxShadow: "0 20px 40px rgba(26,0,0,0.18)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(154,0,2,0.18)",
                    "0 0 0 8px rgba(154,0,2,0)",
                    "0 0 0 0 rgba(154,0,2,0.18)",
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#9a0002",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 18,
                  fontFamily: "var(--font-canela), Georgia, serif",
                }}
              >
                ✓
              </motion.div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1a0000" }}>
                  Faith Verified
                </div>
                <div style={{ fontSize: 12, color: "rgba(90,70,70,0.7)" }}>
                  Every profile, every time
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <div>
            <motion.div
              variants={bounceIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              style={{
                width: 64,
                height: 64,
                marginBottom: 24,
                background: "rgba(154,0,2,0.08)",
                borderRadius: 16,
                border: "1px solid rgba(154,0,2,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9a0002",
              }}
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
              </svg>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                color: "#9a0002",
                margin: "0 0 20px",
                lineHeight: 1.25,
                fontFamily: "var(--font-canela), Georgia, serif",
              }}
            >
              A Community Built on Respect and Faith
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={isVisible ? { width: 56 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ height: 3, background: "#C6A85D", borderRadius: 2, marginBottom: 24 }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 460 }}>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.6 }}
                style={{ fontSize: 16, color: "#555b66", lineHeight: 1.8, margin: 0 }}
              >
                We are committed to creating a safe and uplifting environment where members
                treat one another with{" "}
                {["kindness", "honesty", "integrity"].map((word, i) => (
                  <motion.span
                    key={word}
                    animate={
                      wordsActive
                        ? { backgroundSize: "100% 40%" }
                        : { backgroundSize: "0% 40%" }
                    }
                    transition={{ delay: i * 0.12, duration: 0.8, ease: "easeOut" }}
                    style={{
                      color: "#9a0002",
                      fontWeight: 600,
                      backgroundImage:
                        "linear-gradient(to right, rgba(198,168,93,0.25), rgba(198,168,93,0.25))",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "0 85%",
                      backgroundSize: "0% 40%",
                    }}
                  >
                    {word}
                    {i < 2 ? (i === 1 ? ", and " : ", ") : "."}
                  </motion.span>
                ))}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.6 }}
                style={{ fontSize: 16, color: "#555b66", lineHeight: 1.8, margin: 0 }}
              >
                Our platform encourages meaningful connections rooted in shared faith and
                values — where relationships grow with{" "}
                {["intention", "purpose"].map((word, i) => (
                  <motion.span
                    key={word}
                    animate={
                      wordsActive
                        ? { backgroundSize: "100% 40%" }
                        : { backgroundSize: "0% 40%" }
                    }
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                    style={{
                      color: "#C6A85D",
                      fontWeight: 600,
                      backgroundImage:
                        "linear-gradient(to right, rgba(198,168,93,0.25), rgba(198,168,93,0.25))",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "0 85%",
                      backgroundSize: "0% 40%",
                    }}
                  >
                    {word}
                    {i === 0 ? " and " : "."}
                  </motion.span>
                ))}
              </motion.p>
            </div>

            <motion.div
              variants={bounceIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 15 }}
              style={{ marginTop: 28 }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#9a0002",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "rgba(154,0,2,0.06)",
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(154,0,2,0.1)",
                }}
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified & Trusted
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. FINAL CTA — content / image split
          ══════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          padding: "110px 20px",
          background: "linear-gradient(135deg, #9a0002 0%, #7a0002 60%, #5a0001 100%)",
          overflow: "hidden",
        }}
      >
        {ctaParticles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* Decorative glow circles */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-40%",
            left: "-8%",
            width: 600,
            height: 600,
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            position: "absolute",
            bottom: "-30%",
            right: "-10%",
            width: 500,
            height: 500,
            background: "rgba(198,168,93,0.15)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <div
          className="afm-split-grid reverse"
          style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}
        >
          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 22 }}
          >
            <motion.span
              variants={bounceIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: "inline-block",
                width: "fit-content",
                padding: "6px 20px",
                borderRadius: 999,
                background: "rgba(198,168,93,0.2)",
                color: "#C6A85D",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid rgba(198,168,93,0.3)",
              }}
            >
              Your Faith Journey Starts Here
            </motion.span>

            <h2
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.15,
                margin: 0,
                fontFamily: "var(--font-canela), Georgia, serif",
              }}
            >
              Ready to Meet Your
              <br />
              <span style={{ color: "#C6A85D" }}>God-Given Partner?</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "rgba(255,239,179,0.9)",
                maxWidth: 460,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Join thousands of African Christian singles who have found meaningful,
              faith-centered love on AfroFaithMatch.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <motion.a
                href="/register"
                variants={bounceIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -3, boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 40px",
                  background: "#fff",
                  color: "#9a0002",
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: 16,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  textDecoration: "none",
                }}
              >
                Create Free Profile
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>

              <motion.a
                href="/browse"
                variants={bounceIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -3, background: "rgba(255,255,255,0.15)" }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 36px",
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: 16,
                  border: "2px solid rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  transition: "background 0.3s",
                }}
              >
                Browse Profiles
              </motion.a>
            </div>

            <p style={{ fontSize: 13, color: "rgba(255,239,179,0.65)", margin: 0 }}>
              Free to join · No credit card required · Faith-verified community
            </p>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                height: 440,
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: "0 32px 70px rgba(0,0,0,0.35)",
                border: "3px solid rgba(255,255,255,0.15)",
              }}
            >
              <img
                src="/images/cta/c1.jpg"
                alt="A couple who found love through faith"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: -20,
                left: -20,
                background: "#FAF8F3",
                borderRadius: 16,
                padding: "12px 18px",
                boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
                fontSize: 13,
                fontWeight: 700,
                color: "#9a0002",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 16 }}>💍</span>
              Matched through faith
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}