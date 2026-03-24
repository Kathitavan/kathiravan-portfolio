import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiEnvelope, HiXMark, HiChatBubbleLeftRight } from 'react-icons/hi2';
import { FaWhatsapp, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import './FloatingContact.css';

const MENU_ITEMS = [
  {
    Icon:    FaGithub,
    label:   'GitHub',
    href:    'https://github.com',
    external: true,
    color:   '#C9A84C',
    bg:      'rgba(201,168,76,0.1)',
    border:  'rgba(201,168,76,0.2)',
  },
  {
    Icon:    FaLinkedinIn,
    label:   'LinkedIn',
    href:    'https://linkedin.com',
    external: true,
    color:   '#7BB3D0',
    bg:      'rgba(123,179,208,0.08)',
    border:  'rgba(123,179,208,0.18)',
  },
  {
    Icon:    FaWhatsapp,
    label:   'WhatsApp',
    href:    'https://wa.me/yourphone',
    external: true,
    color:   '#5CB85C',
    bg:      'rgba(92,184,92,0.08)',
    border:  'rgba(92,184,92,0.18)',
  },
  {
    Icon:    HiEnvelope,
    label:   'Email',
    href:    'mailto:kathiravan@email.com',
    external: false,
    color:   '#E8C87A',
    bg:      'rgba(232,200,122,0.08)',
    border:  'rgba(232,200,122,0.18)',
  },
];

const FloatingContact = () => {
  const [isOpen,    setIsOpen]    = useState(false);
  const [hovered,   setHovered]   = useState(null);

  return (
    <div className="floating-contact-wrapper">

      {/* Menu items — appear above the button */}
      <AnimatePresence>
        {isOpen && (
          <div className="floating-menu" aria-label="Quick links">
            {MENU_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-label={item.label}
                className="floating-menu-item"
                style={{
                  background: hovered === item.label ? item.bg : 'rgba(10,10,18,0.92)',
                  borderColor: hovered === item.label ? item.border : 'rgba(201,168,76,0.12)',
                }}
                initial={{ opacity: 0, scale: 0.5, y: 16 }}
                animate={{ opacity: 1, scale: 1,   y: 0  }}
                exit={{    opacity: 0, scale: 0.5, y: 16 }}
                transition={{ delay: (MENU_ITEMS.length - 1 - i) * 0.06, type: 'spring', damping: 18, stiffness: 300 }}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                title={item.label}
              >
                <item.Icon style={{ color: item.color, width: 17, height: 17 }} />

                {/* Label tooltip on hover */}
                <AnimatePresence>
                  {hovered === item.label && (
                    <motion.span
                      className="floating-menu-label"
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        className="floating-main-btn"
        onClick={() => setIsOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label={isOpen ? 'Close quick links' : 'Open quick links'}
        title={isOpen ? 'Close' : 'Quick Links'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="floating-btn-icon-wrap"
        >
          {/* Always render as component — never string */}
          {isOpen
            ? <HiXMark style={{ width: 22, height: 22 }} />
            : <HiChatBubbleLeftRight style={{ width: 20, height: 20 }} />
          }
        </motion.div>

        {/* Glow ring when open */}
        {isOpen && (
          <motion.div
            className="floating-btn-ring"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          />
        )}
      </motion.button>

    </div>
  );
};

export default FloatingContact;