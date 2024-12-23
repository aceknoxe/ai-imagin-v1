"use client";

import { motion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ clipPath: 'circle(0% at 100% 0)' }}
      animate={{ clipPath: 'circle(150% at 100% 0)' }}
      exit={{ clipPath: 'circle(0% at 100% 0)' }}
      transition={{
        duration: 1.25,
        ease: [0.30, 1, 0.25, 1]
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
} 