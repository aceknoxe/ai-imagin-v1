"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 py-28">
      <div className="w-full max-w-2xl bg-background/70 backdrop-blur-2xl rounded-3xl p-12 shadow-lg border border-primary/10 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <i className="fas fa-compass text-8xl text-primary/50 mb-6 block"></i>
          <h1 className="text-5xl font-semibold text-primary mb-4">404</h1>
          <h2 className="text-2xl text-text/90 mb-8">Page Not Found</h2>
          <p className="text-text/70 mb-8 leading-relaxed">
            Oops! It seems your imagination has wandered too far. 
            Let's get you back to creating amazing images.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-3xl bg-gradient-to-r from-secondary to-accent text-text font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/40"
          >
            <i className="fas fa-home"></i>
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
} 