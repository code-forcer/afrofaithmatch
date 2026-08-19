"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { 
  FaHeart, 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaSearch, 
  FaPlus, 
  FaUser, 
  FaBlog, 
  FaBell 
} from "react-icons/fa";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  
  // Track scroll direction for hide/show header
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  // Animate header background from transparent to solid
  const headerBackground = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.98)"]
  );
  
  const headerBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(154, 0, 2, 0)", "rgba(154, 0, 2, 0.1)"]
  );

  // Text color: cream on dark hero, cherry red when scrolled
  const textColor = useTransform(
    scrollY,
    [0, 80],
    ["#FAF8F3", "#9a0002"]
  );

  const shadow = useTransform(
    scrollY,
    [0, 80],
    ["0 0 0 rgba(0,0,0,0)", "0 8px 32px rgba(154, 0, 2, 0.08)"]
  );

  const navLinks = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Browse Christian Profiles", href: "/community", icon: FaSearch },
    { name: "About Us", href: "/about", icon: FaHeart },
    { name: "Contact", href: "/contact", icon: FaUser },
    { name: "Blog", href: "/blog", icon: FaBlog },
  ];

  const mobileNavItems = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Search", href: "/community", icon: FaSearch },
    { name: "Add", href: "/register", icon: FaPlus, isAction: true },
    { name: "Account", href: "/login", icon: FaUser },
    { name: "Blog", href: "/blog", icon: FaBlog },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ===== TOP HEADER ===== */}
      <motion.header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: headerBackground,
          boxShadow: shadow,
          borderBottom: `1px solid`,
          borderColor: headerBorder,
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div 
          style={{ 
            maxWidth: 1280, 
            margin: "0 auto", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            padding: scrolled ? "12px 24px" : "20px 24px",
            transition: "padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Logo */}
          <motion.a 
            href="/" 
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
               
              }}
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
            >
            <img src="/logo/afrofaithmatch_logo_horizontal.svg" alt="" width={200} height={50} />
            </motion.div>
          </motion.a>

          {/* Desktop Nav */}
          <nav style={{ display: "none", alignItems: "center", gap: 8 }} className="desktop-nav">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="nav-link"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                style={{
                  position: "relative",
                  padding: "8px 16px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: textColor,
                  textDecoration: "none",
                  borderRadius: 999,
                  transition: "all 0.2s ease",
                }}
                whileHover={{ 
                  backgroundColor: "rgba(154, 0, 2, 0.06)",
                }}
              >
                {link.name}
                <motion.span
                  className="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: "50%",
                    height: 2,
                    background: "#9a0002",
                    borderRadius: 2,
                  }}
                  initial={{ width: 0, x: "-50%" }}
                  whileHover={{ width: "40%", x: "-50%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
            
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: 16 }}>
              {/* Notification Bell */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                  borderRadius: "50%",
                  position: "relative",
                  color: textColor,
                }}
              >
                <FaBell size={20} />
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    background: "#C6A85D",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                />
              </motion.button>

              <motion.a
                href="/login"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: textColor,
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: 999,
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(154, 0, 2, 0.06)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.a>
              
              <motion.a
                href="/register"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(154,0,2,0.35)" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "10px 24px",
                  background: "linear-gradient(135deg, #9a0002, #b80004)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  borderRadius: 999,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(154,0,2,0.25)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                Join Now
              </motion.a>
            </div>
          </nav>

          {/* Mobile Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="mobile-actions">
            <motion.button
              whileTap={{ scale: 0.9 }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                borderRadius: "50%",
                position: "relative",
                color: textColor,
              }}
            >
              <FaBell size={22} />
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  background: "#C6A85D",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.8)",
                }}
              />
            </motion.button>

            <motion.button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(true)}
              whileTap={{ scale: 0.9 }}
              style={{
                background: scrolled ? "rgba(154, 0, 2, 0.06)" : "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                padding: 10,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.div style={{ color: textColor }}>
                <FaBars size={22} />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(26, 0, 0, 0.4)",
                backdropFilter: "blur(4px)",
                zIndex: 100,
              }}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(380px, 85vw)",
                background: "#FAF8F3",
                zIndex: 101,
                display: "flex",
                flexDirection: "column",
                boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
              }}
            >
              {/* Menu Header */}
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                padding: "24px 24px 16px",
                borderBottom: "1px solid rgba(154, 0, 2, 0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #9a0002, #C6A85D)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaHeart size={16} color="#FAF8F3" />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-canela), Georgia, serif",
                      fontSize: 20,
                      color: "#9a0002",
                      fontWeight: 600,
                    }}
                  >
                    Menu
                  </span>
                </div>
                
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: "rgba(154, 0, 2, 0.06)",
                    border: "none",
                    color: "#9a0002",
                    cursor: "pointer",
                    padding: 10,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaTimes size={22} />
                </motion.button>
              </div>

              {/* Menu Links */}
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 4, 
                padding: "16px 16px",
                flex: 1,
                overflowY: "auto",
              }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
                    whileHover={{ x: 8, backgroundColor: "rgba(154, 0, 2, 0.04)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "16px 20px",
                      fontSize: 17,
                      fontWeight: 600,
                      color: "#1a0000",
                      textDecoration: "none",
                      borderRadius: 16,
                      fontFamily: "var(--font-canela), Georgia, serif",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, rgba(154,0,2,0.08), rgba(198,168,93,0.08))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9a0002",
                    }}>
                      <link.icon size={18} />
                    </div>
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Menu Footer - CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                style={{ 
                  padding: "20px 24px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  borderTop: "1px solid rgba(154, 0, 2, 0.08)",
                  background: "linear-gradient(to top, rgba(154,0,2,0.02), transparent)",
                }}
              >
                <a
                  href="/login"
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#9a0002",
                    textDecoration: "none",
                    border: "2px solid #9a0002",
                    borderRadius: 999,
                    transition: "all 0.2s ease",
                  }}
                >
                  Sign In
                </a>
                <motion.a
                  href="/register"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(154,0,2,0.25)" }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#fff",
                    background: "linear-gradient(135deg, #9a0002, #b80004)",
                    textDecoration: "none",
                    borderRadius: 999,
                    boxShadow: "0 4px 16px rgba(154,0,2,0.2)",
                  }}
                >
                  Create Free Profile
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== MOBILE BOTTOM NAVIGATION ===== */}
      <nav className="mobile-bottom-nav" style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(154, 0, 2, 0.08)",
        padding: "8px 16px calc(8px + env(safe-area-inset-bottom))",
        display: "none",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          maxWidth: 500,
          margin: "0 auto",
        }}>
          {mobileNavItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileTap={{ scale: 0.9 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                textDecoration: "none",
                padding: "4px 12px",
                borderRadius: 12,
              }}
            >
              {item.isAction ? (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #9a0002, #b80004)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(154,0,2,0.3)",
                    marginTop: -28,
                    border: "4px solid #FAF8F3",
                  }}
                >
                  <FaPlus size={22} color="#fff" />
                </motion.div>
              ) : (
                <item.icon size={22} color="#9a0002" style={{ opacity: 0.7 }} />
              )}
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: item.isAction ? "#9a0002" : "#666",
              }}>
                {item.name}
              </span>
            </motion.a>
          ))}
        </div>
      </nav>

      {/* ===== RESPONSIVE STYLES ===== */}
      <style jsx global>{`
        @media (min-width: 992px) {
          .mobile-toggle,
          .mobile-actions,
          .mobile-bottom-nav {
            display: none !important;
          }
          .desktop-nav {
            display: flex !important;
          }
        }
        
        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-bottom-nav {
            display: block !important;
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Prevent content from being hidden behind bottom nav on mobile */
        @media (max-width: 991px) {
          main, .page-content {
            padding-bottom: 80px !important;
          }
        }
      `}</style>
    </>
  );
}