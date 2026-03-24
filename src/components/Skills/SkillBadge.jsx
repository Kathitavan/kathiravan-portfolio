import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiJavascript, SiTypescript, SiPython, SiPhp,
  SiTailwindcss, SiBootstrap, SiGit, SiGithub,
  SiHtml5, SiDocker, SiVite, SiNextdotjs,
} from 'react-icons/si';

const ICONS = {
  'react':        { Icon: SiReact,       color: '#61DAFB' },
  'node.js':      { Icon: SiNodedotjs,   color: '#6cc24a' },
  'mongodb':      { Icon: SiMongodb,     color: '#47A248' },
  'express':      { Icon: SiExpress,     color: '#CCCCCC' },
  'javascript':   { Icon: SiJavascript,  color: '#F7DF1E' },
  'typescript':   { Icon: SiTypescript,  color: '#3178C6' },
  'python':       { Icon: SiPython,      color: '#3776AB' },
  'php':          { Icon: SiPhp,         color: '#8892BF' },
  'tailwind css': { Icon: SiTailwindcss, color: '#38BDF8' },
  'bootstrap':    { Icon: SiBootstrap,   color: '#7952B3' },
  'git':          { Icon: SiGit,         color: '#F05032' },
  'github':       { Icon: SiGithub,      color: '#FFFFFF' },
  'html5':        { Icon: SiHtml5,       color: '#E34F26' },
  'docker':       { Icon: SiDocker,      color: '#2496ED' },
  'vite':         { Icon: SiVite,        color: '#646CFF' },
  'next.js':      { Icon: SiNextdotjs,   color: '#FFFFFF' },
};

const SkillBadge = ({ skill, delay = 0 }) => {
  const brand = ICONS[skill.toLowerCase()];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 12px',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 6,
        background: 'rgba(255,255,255,0.025)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, letterSpacing: '0.13em', textTransform: 'uppercase',
        color: 'rgba(168,178,196,0.70)',
        cursor: 'default',
      }}
    >
      {brand
        ? <brand.Icon style={{ color: brand.color, width: 13, height: 13, flexShrink: 0 }} />
        : <span style={{ width:5, height:5, borderRadius:'50%',
            background:'rgba(201,168,76,0.7)', flexShrink:0, display:'inline-block' }} />
      }
      {skill}
    </motion.div>
  );
};

export default SkillBadge;