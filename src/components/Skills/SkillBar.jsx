import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiJavascript, SiTypescript, SiPython, SiPhp,
  SiTailwindcss, SiBootstrap, SiGit, SiHtml5,
} from 'react-icons/si';
import './Skills.css';

const ICONS = {
  'react':      { Icon: SiReact,       color: '#61DAFB' },
  'node.js':    { Icon: SiNodedotjs,   color: '#6cc24a' },
  'mongodb':    { Icon: SiMongodb,     color: '#47A248' },
  'express':    { Icon: SiExpress,     color: '#CCCCCC' },
  'javascript': { Icon: SiJavascript,  color: '#F7DF1E' },
  'typescript': { Icon: SiTypescript,  color: '#3178C6' },
  'python':     { Icon: SiPython,      color: '#3776AB' },
  'php':        { Icon: SiPhp,         color: '#8892BF' },
  'tailwind':   { Icon: SiTailwindcss, color: '#38BDF8' },
  'bootstrap':  { Icon: SiBootstrap,   color: '#7952B3' },
  'git':        { Icon: SiGit,         color: '#F05032' },
  'html':       { Icon: SiHtml5,       color: '#E34F26' },
};

const SkillBar = ({ name, percentage, delay = 0 }) => {
  const brand = ICONS[name.toLowerCase()];
  return (
    <div className="skill-bar-container">
      <div className="skill-bar-header">
        <span style={{ display:'flex', alignItems:'center', gap:8,
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          fontSize:'1.05rem', color:'#EEF0F5' }}>
          {brand && <brand.Icon style={{ color: brand.color, width:18, height:18 }} />}
          {name}
        </span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace",
          fontSize:'0.7rem', color:'#C9A84C', letterSpacing:'0.12em' }}>
          {percentage}%
        </span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: `linear-gradient(to right, #8A6520, ${brand?.color || '#C9A84C'}, #7B5EA7)` }}
        >
          <div className="skill-bar-shimmer" />
        </motion.div>
      </div>
    </div>
  );
};

export default SkillBar;