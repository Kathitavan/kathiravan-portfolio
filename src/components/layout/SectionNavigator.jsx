import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { CONTACT_DATA } from '../../data/data';
import './SectionNavigator.css';

/* ─── Section list ────────────────────────────────────────────── */
const SECTIONS = [
  { id: 'hero',         label: 'Home',        roman: 'I'   },
  { id: 'about',        label: 'About',       roman: 'II'  },
  { id: 'skills',       label: 'Skills',      roman: 'III' },
  { id: 'projects',     label: 'Projects',    roman: 'IV'  },
  { id: 'timeline',     label: 'Timeline',    roman: 'V'   },
  { id: 'certificates', label: 'Certs',       roman: 'VI'  },
  { id: 'contact',      label: 'Contact',     roman: 'VII' },
];

/* ─── Social links — update hrefs to your real URLs ─────────── */
const SOCIALS = [
  {
    Icon:  FaGithub,
    label: 'GitHub',
    href:  CONTACT_DATA.github,
    color: '#E8C87A',
    glow:  'rgba(232,200,122,0.22)',
  },
  {
    Icon:  FaLinkedinIn,
    label: 'LinkedIn',
    href:  CONTACT_DATA.linkedin,
    color: '#7BB3D0',
    glow:  'rgba(123,179,208,0.22)',
  },
  {
    Icon:  FaInstagram,
    label: 'Instagram',
    href:  CONTACT_DATA.instagram,
    color: '#E1306C',
    glow:  'rgba(225,48,108,0.22)',
  },
  {
    Icon:  FaWhatsapp,
    label: 'WhatsApp',
    href:  CONTACT_DATA.whatsapp,
    color: '#25D366',
    glow:  'rgba(37,211,102,0.22)',
  },
  {
    Icon:  MdEmail,
    label: 'Email',
    href:  `mailto:${CONTACT_DATA.email}`,
    color: '#C9A84C',
    glow:  'rgba(201,168,76,0.22)',
  },
];

/* ─── Social Media Bar — LEFT SIDE ──────────────────────────── */
const SocialBar = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="soc-root" aria-label="Social media links">
      {/* Top decorative line */}
      <motion.div
        className="soc-line-top"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16,1,0.3,1] }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Icons */}
      <div className="soc-icons">
        {SOCIALS.map(({ Icon, label, href, color, glow }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="soc-link"
            aria-label={label}
            style={{ '--soc-color': color, '--soc-glow': glow }}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.07, duration: 0.45, ease: [0.16,1,0.3,1] }}
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <Icon style={{ width: 14, height: 14 }} />

            {/* Tooltip right */}
            <AnimatePresence>
              {hovered === label && (
                <motion.span
                  className="soc-tip"
                  initial={{ opacity: 0, x: -6, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0,  scale: 1    }}
                  exit={   { opacity: 0, x: -6, scale: 0.92 }}
                  transition={{ duration: 0.15, ease: [0.16,1,0.3,1] }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        ))}
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="soc-line-bot"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16,1,0.3,1] }}
        style={{ transformOrigin: 'bottom' }}
      />
    </div>
  );
};

/* ─── Section Navigator — RIGHT SIDE ────────────────────────── */
const SectionNavigator = () => {
  const [activeId,  setActiveId]  = useState('hero');
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeIdx = SECTIONS.findIndex(s => s.id === activeId);
  const fillPct = SECTIONS.length > 1
    ? ((activeIdx * 50 + 9) / ((SECTIONS.length - 1) * 50 + 18)) * 100
    : 0;

  return (
    <>
      {/* ── Social bar on the LEFT ── */}
      <SocialBar />

      {/* ── Section navigator on the RIGHT ── */}
      <div className="sn-root" role="navigation" aria-label="Section navigation">

        {/* Track */}
        <div className="sn-track">
          <motion.div
            className="sn-track-fill"
            animate={{ height: `${fillPct}%` }}
            transition={{ duration: 0.55, ease: [0.16,1,0.3,1] }}
          />
        </div>

        {/* Nodes */}
        <div className="sn-nodes">
          {SECTIONS.map((section, i) => {
            const isActive  = activeId  === section.id;
            const isHovered = hoveredId === section.id;
            const isPast    = i < activeIdx;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="sn-node-link"
                onClick={(e) => handleClick(e, section.id)}
                onMouseEnter={() => setHoveredId(section.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={section.label}
              >
                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="sn-tooltip"
                      initial={{ opacity: 0, x: 10, scale: 0.92 }}
                      animate={{ opacity: 1, x: 0,  scale: 1    }}
                      exit={   { opacity: 0, x: 10, scale: 0.92 }}
                      transition={{ duration: 0.16, ease: [0.16,1,0.3,1] }}
                    >
                      <span className="sn-tooltip-roman">{section.roman}</span>
                      <span className="sn-tooltip-label">{section.label}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Node */}
                <div className="sn-node-wrap">
                  {/* Static glow behind active node */}
                  {isActive && <div className="sn-node-glow" />}

                  {/* Expanding pulse ring */}
                  {isActive && (
                    <motion.div
                      className="sn-node-pulse"
                      initial={{ scale: 1,   opacity: 0.65 }}
                      animate={{ scale: 2.8, opacity: 0    }}
                      transition={{ duration: 1.7, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}

                  {/* The dot */}
                  <motion.div
                    animate={{
                      width:  isActive ? 11 : isHovered ? 9 : 7,
                      height: isActive ? 11 : isHovered ? 9 : 7,
                      backgroundColor:
                        isActive    ? '#C9A84C'
                        : isPast    ? 'rgba(201,168,76,0.48)'
                        : isHovered ? 'rgba(201,168,76,0.28)'
                        : 'transparent',
                      borderColor:
                        isActive || isHovered ? '#C9A84C'
                        : isPast ? 'rgba(201,168,76,0.40)'
                        : 'rgba(201,168,76,0.20)',
                      boxShadow: isActive
                        ? '0 0 0 3px rgba(201,168,76,0.16), 0 0 16px rgba(201,168,76,0.60)'
                        : isHovered
                        ? '0 0 8px rgba(201,168,76,0.30)'
                        : 'none',
                    }}
                    transition={{ duration: 0.26, ease: [0.16,1,0.3,1] }}
                    style={{
                      borderRadius: '50%',
                      borderWidth:  1.5,
                      borderStyle:  'solid',
                      flexShrink:   0,
                    }}
                  />

                  {/* Roman numeral — active only */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        className="sn-roman"
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={   { opacity: 0, x: 6 }}
                        transition={{ duration: 0.22 }}
                      >
                        {section.roman}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SectionNavigator;