import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import {
  HiCodeBracket,
  HiCpuChip,
  HiLightBulb,
} from 'react-icons/hi2';
import './Achievements.css';

// ── Easter egg hook (inlined — no external file needed) ──────────────────────
const useEasterEgg = (triggerWord = 'visioncrafter') => {
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  useEffect(() => {
    let buffer = '';
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      buffer = (buffer + e.key.toLowerCase()).slice(-triggerWord.length);
      if (buffer === triggerWord) {
        setIsMatrixMode(true);
        setTimeout(() => setIsMatrixMode(false), 10000);
        buffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerWord]);

  return { isMatrixMode };
};

// ── Animated counter ─────────────────────────────────────────────────────────
const StatCounter = ({ end, label, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const isInView = true; // Use always-true to ensure counts run on mount without IntersectionObserver lag

  useEffect(() => {
    let raf;
    const startTime = performance.now();
    const duration = 1800;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end]);

  return (
    <div className="stat-item">
      <div className="stat-number">
        {prefix}{count}{suffix}
      </div>
      <div className="stat-label">
        {label}
      </div>
    </div>
  );
};

// ── Highlight card ────────────────────────────────────────────────────────────
const HighlightCard = ({ icon: Icon, title, desc, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -5, transition: { duration: 0.3 } }}
    className="highlight-card"
  >
    <div
      className="highlight-accent-line"
      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
    />

    <div
      className="highlight-bg-glow"
      style={{ background: `radial-gradient(circle at 20% 20%, ${color}12 0%, transparent 60%)` }}
    />

    <div className="relative z-10">
      <div
        className="highlight-icon-box"
        style={{ background: `${color}18` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>

      <h4 className="text-xl font-serif text-white-soft mb-3">{title}</h4>

      <div
        className="highlight-divider-bar"
        style={{ background: color }}
      />

      <p className="text-silver/60 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

// ── Easter egg matrix overlay ─────────────────────────────────────────────────
const MatrixOverlay = ({ active }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols   = Math.floor(canvas.width / 14);
    const drops  = Array(cols).fill(1);
    const chars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()カタカナ';

    const draw = () => {
      ctx.fillStyle = 'rgba(5,5,8,0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#C9A84C';
      ctx.font = '13px JetBrains Mono, monospace';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="matrix-overlay"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass-card !p-6 border border-gold-mid/40 text-center">
          <div className="text-xs font-mono text-gold-mid tracking-[0.4em] uppercase mb-2">
            Easter Egg Unlocked
          </div>
          <div className="text-2xl font-serif text-white-soft">Vision Crafter Mode</div>
          <div className="text-[10px] font-mono text-silver/40 mt-2">Auto-resets in 10s</div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const highlights = [
  {
    icon: HiCodeBracket,
    title: 'Project Excellence',
    desc: 'Delivered 12+ web applications across the full stack — from concept to deployment — with clean, maintainable code.',
    color: '#C9A84C',
  },
  {
    icon: HiCpuChip,
    title: 'Technical Depth',
    desc: 'Proficient across 10+ technologies including React, Node.js, MongoDB, PHP and SQLite with hands-on project experience.',
    color: '#7B5EA7',
  },
  {
    icon: HiLightBulb,
    title: 'Always Learning',
    desc: 'Actively exploring blockchain fundamentals, data science, and emerging UI/UX patterns to stay ahead of the curve.',
    color: '#E8C87A',
  },
];

const Achievements = () => {
  const { isMatrixMode } = useEasterEgg('visioncrafter');

  return (
    <section
      id="achievements"
      className="achievements-section"
    >
      <div className="achievements-bg-decor">
        <div className="achievements-line-decor" />
        <div className="achievements-glow-decor" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionTitle
          subtitle="[ Metrics ]"
          title="Digital Impact"
          align="center"
        />

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="stats-container"
        >
          <div className="stats-inner-glow" />

          <div className="stats-grid">
            <div className="stat-divider lg:left-1/4" />
            <div className="stat-divider lg:left-2/4" />
            <div className="stat-divider lg:left-3/4" />

            <StatCounter end={12}  label="Projects Delivered" suffix="+" />
            <StatCounter end={5}   label="Verified Certifications" suffix="+" />
            <StatCounter end={10}  label="Technologies" suffix="+" />
            <StatCounter end={100} label="Commitment" suffix="%" />
          </div>
        </motion.div>

        {/* ── Highlight cards with easter egg ── */}
        <div className="relative">
          <MatrixOverlay active={isMatrixMode} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <HighlightCard key={h.title} {...h} index={i} />
            ))}
          </div>

          {/* Easter egg hint — barely visible */}
          <div className="mt-8 text-center">
            <span className="text-[9px] font-mono text-white/8 select-none tracking-widest">
              // there is a secret in this portfolio...
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;