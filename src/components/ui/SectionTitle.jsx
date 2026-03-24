import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ subtitle, title, align = 'left', className = '' }) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-16 md:mb-24 ${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      {/* ── Subtitle ── */}
      <motion.span
        initial={{ opacity: 0, x: isCenter ? 0 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-block mb-4 text-xs font-mono tracking-[0.3em] uppercase text-gold-mid"
      >
        {subtitle}
      </motion.span>
      
      {/* ── Heading ── */}
      <div className="relative overflow-hidden">
        <motion.h2
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white-soft leading-tight"
        >
          {title}
        </motion.h2>
      </div>

      {/* ── Divider ── */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isCenter ? '120px' : '80px', opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={`h-[1px] bg-gradient-to-r from-gold-mid/60 to-transparent mt-6 ${isCenter ? 'mx-auto' : ''}`}
      />
    </div>
  );
};

export default SectionTitle;
