"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaHeartBroken, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAF8F3", // Cream
        padding: 24,
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(154,0,2,0.1), rgba(198,168,93,0.1))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
        }}
      >
        <FaHeartBroken size={40} color="#9a0002" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          fontFamily: "var(--font-canela), Georgia, serif",
          fontSize: "clamp(3rem, 8vw, 5rem)",
          color: "#1a0000",
          margin: "0 0 16px 0",
          lineHeight: 1,
        }}
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: 24,
          color: "#9a0002",
          margin: "0 0 16px 0",
          fontWeight: 600,
        }}
      >
        Lost in the Wilderness
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: 16,
          color: "rgba(90,70,70,0.8)",
          maxWidth: 400,
          margin: "0 0 40px 0",
          lineHeight: 1.6,
        }}
      >
        It seems the page you are looking for doesn't exist or has been moved. Let's get you back on the right path.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 32px",
            background: "linear-gradient(135deg, #9a0002, #b80004)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 999,
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(154,0,2,0.25)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(154,0,2,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(154,0,2,0.25)";
          }}
        >
          <FaArrowLeft />
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
