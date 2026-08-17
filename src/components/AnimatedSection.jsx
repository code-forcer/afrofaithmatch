'use client';
import { motion } from 'framer-motion';

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up", 
  fullWidth = false,
  once = true 
}) {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`${fullWidth ? 'w-full' : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} ${className}`}
    >
      {children}
    </motion.div>
  );
}
