import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { skillBars, skillsData } from '../../data/skills';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiJavascript, SiTypescript, SiPython, SiPhp,
  SiTailwindcss, SiBootstrap, SiGit, SiGithub,
  SiHtml5, SiMysql, SiPostgresql,
  SiDocker, SiVite, SiNextdotjs, SiRedux,
  SiFigma, SiLinux, SiNpm, SiYarn,
} from 'react-icons/si';
import './Skills.css';

/* ── Icon map — key = skill name (lowercase, no spaces) ── */
const ICON_MAP = {
  'react':        { Icon: SiReact,       color: '#61DAFB' },
  'node.js':      { Icon: SiNodedotjs,   color: '#6cc24a' },
  'nodejs':       { Icon: SiNodedotjs,   color: '#6cc24a' },
  'mongodb':      { Icon: SiMongodb,     color: '#47A248' },
  'express':      { Icon: SiExpress,     color: '#CCCCCC' },
  'express.js':   { Icon: SiExpress,     color: '#CCCCCC' },
  'javascript':   { Icon: SiJavascript,  color: '#F7DF1E' },
  'typescript':   { Icon: SiTypescript,  color: '#3178C6' },
  'python':       { Icon: SiPython,      color: '#3776AB' },
  'php':          { Icon: SiPhp,         color: '#8892BF' },
  'tailwind css': { Icon: SiTailwindcss, color: '#38BDF8' },
  'tailwind':     { Icon: SiTailwindcss, color: '#38BDF8' },
  'bootstrap':    { Icon: SiBootstrap,   color: '#7952B3' },
  'git':          { Icon: SiGit,         color: '#F05032' },
  'github':       { Icon: SiGithub,      color: '#FFFFFF' },
  'html5':        { Icon: SiHtml5,       color: '#E34F26' },
  'html':         { Icon: SiHtml5,       color: '#E34F26' },
  'css3':         { Icon: SiTailwindcss, color: '#1572B6' },
  'css':          { Icon: SiTailwindcss, color: '#1572B6' },
  'mysql':        { Icon: SiMysql,       color: '#4479A1' },
  'sqlite':       { Icon: SiMysql,       color: '#4479A1' },
  'postgresql':   { Icon: SiPostgresql,  color: '#4169E1' },
  'docker':       { Icon: SiDocker,      color: '#2496ED' },
  'vite':         { Icon: SiVite,        color: '#646CFF' },
  'next.js':      { Icon: SiNextdotjs,   color: '#FFFFFF' },
  'redux':        { Icon: SiRedux,       color: '#764ABC' },
  'figma':        { Icon: SiFigma,       color: '#F24E1E' },
  'linux':        { Icon: SiLinux,       color: '#FCC624' },
  'npm':          { Icon: SiNpm,         color: '#CB3837' },
  'yarn':         { Icon: SiYarn,        color: '#2C8EBB' },
};

const getIcon = (name) => ICON_MAP[name.toLowerCase()] || null;

/* ── Arc gauge with brand icon inside ── */
const ArcGauge = ({ name, percentage, delay }) => {
  const [count, setCount] = useState(0);
  const inView = true; // Use always-true to bypass Lenis/Observer conflicts on reload
  const brand = getIcon(name);
  const color = brand?.color || '#C9A84C';

  useEffect(() => {
    const dur = 1300;
    const t0  = Date.now();
    let timer;
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(e * percentage));
      if (p < 1) timer = requestAnimationFrame(tick);
    };
    const id = setTimeout(() => { timer = requestAnimationFrame(tick); }, delay * 1000);
    return () => { clearTimeout(id); cancelAnimationFrame(timer); };
  }, [percentage, delay]);

  const R       = 40;
  const CIRCUM  = 2 * Math.PI * R;
  const offset  = CIRCUM * (1 - percentage / 100);

  return (
    <div className="arc-card">
      <div className="arc-svg-wrap">
        <svg viewBox="0 0 100 100" className="arc-svg">
          {/* Track */}
          <circle cx="50" cy="50" r={R} fill="none"
            stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          {/* Fill */}
          <motion.circle
            cx="50" cy="50" r={R}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUM}
            initial={{ strokeDashoffset: CIRCUM }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%',
                     filter: `drop-shadow(0 0 5px ${color}80)` }}
          />
        </svg>

        {/* Center: brand icon + % */}
        <div className="arc-center">
          {brand
            ? <brand.Icon style={{ color, width: 22, height: 22 }} />
            : <span className="arc-initial"
                style={{ color }}>{name[0].toUpperCase()}</span>
          }
          <span className="arc-pct" style={{ color }}>{count}<sup>%</sup></span>
        </div>
      </div>

      <div className="arc-label">{name}</div>
      <div className="arc-hover-glow" style={{ background: `${color}12` }} />
    </div>
  );
};

/* ── Skill chip with brand icon ── */
const SkillChip = ({ skill, delay }) => {
  const brand = getIcon(skill);
  return (
    <motion.div
      className="sk-chip"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.35 }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      title={skill}
    >
      {brand
        ? <brand.Icon style={{ color: brand.color, width: 14, height: 14, flexShrink: 0 }} />
        : <span className="sk-chip-dot" />
      }
      <span className="sk-chip-label">{skill}</span>
    </motion.div>
  );
};

/* ── Category card ── */
const CatCard = ({ category, delay }) => (
  <motion.div
    className="cat-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="cat-card-glow" />

    <div className="cat-header">
      <span className="cat-icon">{category.icon}</span>
      <span className="cat-name">{category.category}</span>
      <span className="cat-count">{category.items.length}</span>
    </div>

    <div className="cat-chips">
      {category.items.map((skill, i) => (
        <SkillChip key={skill} skill={skill} delay={delay + i * 0.04} />
      ))}
    </div>
  </motion.div>
);

/* ── Main ── */
const Skills = () => (
  <section id="skills" className="sk-section">
    {/* Grid bg */}
    <div className="sk-grid-bg" aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="sk-g" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none"
              stroke="rgba(201,168,76,0.05)" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sk-g)" />
      </svg>
    </div>
    <div className="sk-glow-a" />
    <div className="sk-glow-b" />

    <div className="sk-wrap">
      <SectionTitle subtitle="[ Expertise ]" title="Technical Craft" align="center" />

      {/* Arc gauges row */}
      <div className="sk-row-label">
        <div className="sk-row-line" />
        <span>Core Proficiency</span>
        <div className="sk-row-line" />
      </div>

      <div className="arc-grid">
        {skillBars.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <ArcGauge
              name={skill.name}
              percentage={skill.percentage}
              delay={i * 0.1}
            />
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <motion.div className="sk-divider"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1 }} />

      {/* Category cards */}
      <div className="sk-row-label">
        <div className="sk-row-line" />
        <span>Technologies &amp; Tools</span>
        <div className="sk-row-line" />
      </div>

      <div className="cat-grid">
        {skillsData.map((cat, i) => (
          <CatCard key={cat.category} category={cat} delay={i * 0.09} />
        ))}
      </div>
    </div>
  </section>
);

export default Skills;