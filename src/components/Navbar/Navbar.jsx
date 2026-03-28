import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import GoldButton from '../ui/GoldButton';
import { CONTACT_DATA } from '../../data/data';
import './Navbar.css';

const NAV_LINKS = [
  { name: 'About',        href: '#about',        id: 'about'        },
  { name: 'Skills',       href: '#skills',       id: 'skills'       },
  { name: 'Projects',     href: '#projects',     id: 'projects'     },
  { name: 'Timeline',     href: '#timeline',     id: 'timeline'     },
  { name: 'Certificates', href: '#certificates', id: 'certificates' },
  { name: 'Contact',      href: '#contact',      id: 'contact'      },
];

const Navbar = () => {
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [isMenuOpen,  setIsMenuOpen]  = useState(false);
  const [activeId,    setActiveId]    = useState('');

  // ── Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // ── Scrolled state
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section via IntersectionObserver
  useEffect(() => {
    const observers = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // ── Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="navbar-progress"
        style={{ scaleX, width: '100%' }}
      />

      {/* ── Navbar ── */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">

          {/* Logo */}
          <a href="#hero" className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="navbar-logo-glyph">K.</span>
            <span className="navbar-logo-dot" />
          </a>

          {/* Desktop Links */}
          <div className="navbar-links">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`navbar-link ${activeId === link.id ? 'active' : ''}`}
              >
                <span className="navbar-link-index">0{i + 1}</span>
                {link.name}
                <span className="navbar-link-bar" />
              </a>
            ))}
          </div>

          {/* CTA + Availability */}
          <div className="navbar-cta">
            <div className="navbar-availability">
              <span className="navbar-availability-dot" />
              <span className="navbar-availability-text">Open to work</span>
            </div>
            <GoldButton variant="outline" className="navbar-cta-btn" href="#contact">
              Hire Me
            </GoldButton>
          </div>

          {/* Mobile Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="mobile-toggle-line" />
            <span className="mobile-toggle-line" />
            <span className="mobile-toggle-line" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="mobile-drawer-header">
              <span className="mobile-drawer-logo">K.</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="mobile-drawer-close"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Links */}
            <div className="mobile-drawer-links">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="mobile-drawer-link"
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mobile-drawer-link-idx">0{i + 1}</span>
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <div className="mobile-drawer-footer">
              <span className="mobile-drawer-footer-label">MERN Stack Dev · 2026</span>
              <div className="mobile-drawer-socials">
                {[
                  { label: 'GH', href: CONTACT_DATA.github    },
                  { label: 'LI', href: CONTACT_DATA.linkedin  },
                  { label: 'IG', href: CONTACT_DATA.instagram },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="mobile-drawer-social-link">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;