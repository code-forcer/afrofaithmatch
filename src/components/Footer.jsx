"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaPhoneAlt,
  FaArrowUp,
  FaPaperPlane,
  FaChevronRight,
} from "react-icons/fa";

const navGroups = [
  {
    label: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "Browse Christian Profiles", href: "/browse" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Services",
    links: [
      { name: "How It Works", href: "/how-it-works" },
      { name: "Create Profile", href: "/register" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "Christian Values", href: "/values" },
      { name: "Community Guidelines", href: "/guidelines" },
    ],
  },
  {
    label: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socials = [
  { Icon: FaFacebook, href: "#", label: "Facebook", color: "#1877F2" },
  { Icon: FaTwitter, href: "#", label: "Twitter", color: "#1DA1F2" },
  { Icon: FaInstagram, href: "#", label: "Instagram", color: "#E4405F" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const linkContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const linkItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track scroll for back-to-top visibility
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowBackToTop(window.scrollY > 500);
    });
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#FAF8F3",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated top gradient strip */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 4,
          background: "linear-gradient(to right, #9a0002, #C6A85D, #9a0002)",
          transformOrigin: "left",
        }}
      />

      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(198,168,93,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(154,0,2,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 24px 40px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #9a0002 0%, #7a0002 100%)",
            borderRadius: 24,
            padding: "48px 32px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(154,0,2,0.2)",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.08)",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 32,
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.15)",
                  padding: "6px 16px",
                  borderRadius: 999,
                  marginBottom: 16,
                }}
              >
                <FaHeart size={12} color="#C6A85D" />
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
                  Weekly Devotionals & Updates
                </span>
              </motion.div>
              <h3
                style={{
                  fontFamily: "var(--font-canela), Georgia, serif",
                  fontSize: "clamp(24px, 4vw, 32px)",
                  color: "#fff",
                  margin: "0 0 12px",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Stay Connected in Faith
              </h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
                Get weekly encouragement, dating tips, and success stories delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                      padding: "16px 24px",
                      borderRadius: 16,
                      color: "#fff",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <FaHeart size={16} color="#C6A85D" />
                    Thank you for subscribing! God bless you.
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", gap: 12, flex: 1, minWidth: 260 }}
                  >
                    <div style={{ position: "relative", flex: 1 }}>
                      <FaEnvelope
                        size={16}
                        style={{
                          position: "absolute",
                          left: 16,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "rgba(154,0,2,0.5)",
                        }}
                      />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          width: "100%",
                          padding: "14px 16px 14px 44px",
                          borderRadius: 999,
                          border: "none",
                          background: "rgba(255,255,255,0.95)",
                          color: "#1a0000",
                          fontSize: 15,
                          outline: "none",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "14px 28px",
                        background: "#C6A85D",
                        color: "#1a0000",
                        border: "none",
                        borderRadius: 999,
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        whiteSpace: "nowrap",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                      }}
                    >
                      Subscribe
                      <FaPaperPlane size={14} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 32px" }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px 40px",
            marginBottom: 56,
            alignItems: "start",
          }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} style={{ minWidth: 260 }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #9a0002, #C6A85D)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 16px rgba(154,0,2,0.25)",
                }}
              >
                <FaHeart size={20} color="#FAF8F3" />
              </motion.div>
              <span
                style={{
                  fontFamily: "var(--font-canela), Georgia, serif",
                  fontSize: 22,
                  color: "#9a0002",
                  fontWeight: 600,
                  letterSpacing: "-0.5px",
                }}
              >
                Afro Faith Match
              </span>
            </motion.div>

            <p
              style={{
                fontSize: 15,
                color: "rgba(100,80,80,0.75)",
                lineHeight: 1.8,
                margin: "0 0 24px",
                maxWidth: 300,
              }}
            >
              A Christ-centered community where African Christian singles find
              faith-rooted love built on prayer, purpose, and commitment.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: 12 }}>
              {socials.map(({ Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -4,
                    background: color,
                    color: "#fff",
                  }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "rgba(154,0,2,0.06)",
                    color: "#9a0002",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav Group Columns */}
          {navGroups.map((group, gi) => (
            <motion.div key={group.label} variants={itemVariants}>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  color: "#9a0002",
                  margin: "0 0 20px",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#C6A85D",
                  }}
                />
                {group.label}
              </h4>
              <motion.div
                variants={linkContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {group.links.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={linkItemVariants}
                    style={{
                      fontSize: 14,
                      color: "rgba(100,80,80,0.7)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "color 0.25s",
                      width: "fit-content",
                    }}
                    whileHover={{ 
                      color: "#9a0002", 
                      x: 6,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      style={{ display: "inline-flex" }}
                    >
                      <FaChevronRight size={10} />
                    </motion.span>
                    {link.name}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ))}

          {/* Contact Column */}
          <motion.div variants={itemVariants}>
            <h4
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#9a0002",
                margin: "0 0 20px",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#C6A85D",
                }}
              />
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  Icon: FaMapMarkerAlt,
                  text: "Lagos, Nigeria",
                  href: null,
                },
                {
                  Icon: FaEnvelope,
                  text: "hello@afrofaithmatch.com",
                  href: "mailto:hello@afrofaithmatch.com",
                },
                {
                  Icon: FaPhoneAlt,
                  text: "+234 800 000 0000",
                  href: "tel:+2348000000000",
                },
              ].map(({ Icon, text, href }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  style={{ 
                    display: "flex", 
                    alignItems: "flex-start", 
                    gap: 12,
                    cursor: href ? "pointer" : "default",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(154,0,2,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9a0002",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontSize: 14,
                        color: "rgba(100,80,80,0.75)",
                        textDecoration: "none",
                        lineHeight: 1.6,
                        transition: "color 0.25s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#9a0002")}
                      onMouseLeave={(e) => (e.target.style.color = "rgba(100,80,80,0.75)")}
                    >
                      {text}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontSize: 14,
                        color: "rgba(100,80,80,0.75)",
                        lineHeight: 1.6,
                      }}
                    >
                      {text}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/register"
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 8px 24px rgba(154,0,2,0.3)",
                y: -2,
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 24,
                padding: "12px 24px",
                background: "linear-gradient(135deg, #9a0002, #b80004)",
                color: "#fff",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(154,0,2,0.2)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <FaHeart size={12} />
              Join for Free
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Divider with heart */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(198,18,3,0.3))" }} />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaHeart size={12} color="#9A0002" />
          </motion.div>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent,  rgba(198,18,3,0.3))" }} />
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <p style={{ fontSize: 13, color: "rgba(100,80,80,0.6)", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
            <FaHeart size={10} color="#9A0002" />
            © {new Date().getFullYear()} Afro Faith Match · Where Faith Leads to Meaningful Love
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Cookies"].map((item, i) => (
              <motion.a
                key={item}
                href={`/${item.toLowerCase()}`}
                whileHover={{ color: "#9a0002", y: -2 }}
                style={{
                  fontSize: 13,
                  color: "rgba(100,80,80,0.6)",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.25s",
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, boxShadow: "0 8px 24px rgba(154,0,2,0.3)" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: 32,
              right: 32,
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #9a0002, #b80004)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(154,0,2,0.25)",
              zIndex: 40,
            }}
          >
            <FaArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Spacing (if using mobile bottom nav) */}
      <div className="mobile-footer-spacer" style={{ height: 0 }} />
      <style jsx global>{`
        @media (max-width: 991px) {
          .mobile-footer-spacer {
            height: 80px !important;
          }
        }
      `}</style>
    </footer>
  );
}