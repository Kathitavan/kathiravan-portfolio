import React from 'react';
import { motion } from 'framer-motion';

/* Category accent colors — matches CAT_THEME in Projects.jsx */
const CAT_COLOR = {
  All:       '#94A3B8',
  Learning:  '#F59E0B',   // amber  — NxtWave / CCBP projects
  Beginner:  '#3B82F6',   // blue   — HTML / CSS / JS projects
  Master:    '#8B5CF6',   // violet — full-stack flagship projects
};

const ProjectFilter = ({ categories, activeCategory, setCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
      {categories.map((cat) => {
        const color  = CAT_COLOR[cat] || '#C9A84C';
        const active = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`
              relative px-6 py-2 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-500
            `}
            style={{ color: active ? color : undefined }}
          >
            {/* original class still applied for non-active */}
            {!active && (
              <span className="text-silver hover:text-white-soft">{cat}</span>
            )}
            {active && <span>{cat}</span>}

            {/* Active border — uses category colour instead of gold-mid */}
            {active && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-px pointer-events-none"
                style={{ border: `1px solid ${color}50` }}
                initial={false}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {/* Active dot — uses category colour */}
            {active && (
              <motion.div
                layoutId="activeFilterDot"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: color }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectFilter;