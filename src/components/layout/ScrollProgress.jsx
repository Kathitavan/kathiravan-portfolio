// ─── ScrollProgress.jsx ────────────────────────────────────────────
// Advanced scroll progress — base bar + shimmer + glowing dot at tip
//
// NOTE: Navbar.jsx also renders a progress bar (.navbar-progress).
// If using the updated Navbar, remove the <ScrollProgress /> import
// from App.jsx to avoid a duplicate bar, OR remove the progress bar
// from Navbar.jsx. Do NOT mount both simultaneously.
// ──────────────────────────────────────────────────────────────────

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  /* Spring-smoothed scale for the bar */
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping:    28,
    restDelta:  0.001,
  });

  /* Translate the glowing dot to follow the bar's right edge.
     scrollYProgress 0→1 maps to left 0%→100% of viewport */
  const dotLeft = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      {/* Main bar */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Glow dot — tracks the leading edge */}
      <motion.div
        className="scroll-progress-dot"
        style={{ left: dotLeft, top: '1.25px' }}
        aria-hidden="true"
      />
    </>
  );
};

export default ScrollProgress;