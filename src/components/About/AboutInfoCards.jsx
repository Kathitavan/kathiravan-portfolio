import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiRocketLaunch, HiBolt, HiCommandLine } from 'react-icons/hi2';
import './About.css';

const cards = [
  { icon: HiAcademicCap,  label:'Education', value:'B.Tech Information Technology', sub:'2022 – 2026',                color:'#C9A84C' },
  { icon: HiCommandLine,  label:'Focus',     value:'Full-Stack Web Dev',             sub:'MERN · PHP · SQLite',       color:'#7B5EA7' },
  { icon: HiBolt,         label:'Exploring', value:'Blockchain & Data Science',      sub:'Emerging Technologies',     color:'#E8C87A' },
  { icon: HiRocketLaunch, label:'Goal',      value:'Skilled Software Engineer',      sub:'Building impactful products', color:'#A8B2C4' },
];

const AboutInfoCards = () => (
  <div className="about-cards-grid">
    {cards.map((card, i) => (
      <motion.div
        key={card.label}
        className="info-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.22 } }}
      >
        <motion.div
          className="info-card-accent"
          style={{ background: card.color }}
          initial={{ scaleY: 0.2, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.45 }}
        />
        <div
          className="info-card-glow"
          style={{ background: `radial-gradient(circle at 0% 50%, ${card.color}20 0%, transparent 65%)` }}
        />
        <div style={{ display:'flex', alignItems:'flex-start', gap:'0.8rem', position:'relative', zIndex:1 }}>
          <div
            className="info-card-icon-box"
            style={{ background:`${card.color}18`, border:`1px solid ${card.color}28` }}
          >
            <card.icon style={{ color:card.color, width:17, height:17 }} />
          </div>
          <div>
            <div className="info-card-label">{card.label}</div>
            <div className="info-card-value">{card.value}</div>
            <div className="info-card-sub">{card.sub}</div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default AboutInfoCards;