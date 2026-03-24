import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageLoader.css';

const PageLoader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('portfolio-loaded');

    // 🔥 CASE: Already visited
    if (hasLoaded) {
      setIsVisible(false);
      onComplete?.();

      // 🔥 FORCE FIX (IMPORTANT)
      setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
        window.dispatchEvent(new Event('resize'));
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      }, 120);

      return;
    }

    // Fake progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 14 + 4);
      });
    }, 120);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('portfolio-loaded', 'true');
        onComplete?.();

        // 🔥 CRITICAL FIX
        window.dispatchEvent(new Event('scroll'));
        window.dispatchEvent(new Event('resize'));
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      }, 500);
    }, 2600);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="page-loader-wrapper"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="page-loader-grid" />

          <div className="page-loader-inner">

            {/* Monogram */}
            <motion.span
              className="page-loader-monogram"
              initial={{ opacity: 0, scale: 0.6, filter: 'blur(16px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9 }}
            >
              K.
            </motion.span>

            {/* Line */}
            <motion.div
              className="page-loader-line"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            {/* Name */}
            <div className="page-loader-name-wrap">
              <motion.h1
                className="page-loader-name"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.7 }}
              >
                Kathiravan
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              className="page-loader-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Full-Stack Developer · MERN Stack
            </motion.p>

            {/* Progress */}
            <motion.div
              className="page-loader-progress-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <div className="page-loader-progress-track">
                <motion.div
                  className="page-loader-progress-fill"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <span className="page-loader-progress-num">
                {Math.min(progress, 100)}
              </span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;