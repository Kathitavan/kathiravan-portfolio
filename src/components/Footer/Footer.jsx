import React from 'react';
import { motion } from 'framer-motion';
import GoldButton from '../ui/GoldButton';
import { HiArrowRight, HiArrowUp, HiEnvelope } from 'react-icons/hi2';
import './Footer.css';

// ── Social links data ─────────────────────────────────────────────
const SOCIALS = [
  { label: 'GitHub',    icon: 'GH', href: 'https://github.com'    },
  { label: 'LinkedIn',  icon: 'LI', href: 'https://linkedin.com'  },
  { label: 'Instagram', icon: 'IG', href: 'https://instagram.com' },
  { label: 'Twitter',   icon: 'TW', href: 'https://twitter.com'   },
];

const NAV_LINKS = [
  { name: 'About',        href: '#about'        },
  { name: 'Skills',       href: '#skills'       },
  { name: 'Projects',     href: '#projects'     },
  { name: 'Timeline',     href: '#timeline'     },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact',      href: '#contact'      },
];

// ── Fade-up helper ────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ── CTA Section ───────────────────────────────────────────────────
const FooterCTA = () => (
  <section className="footer-cta-section">
    <div className="footer-cta-bg-glow" />
    <div className="footer-cta-grid" />

    <div className="footer-cta-container">
      <FadeUp delay={0.0}>
        <span className="footer-cta-eyebrow">Let's Build Something</span>
      </FadeUp>

      <FadeUp delay={0.1}>
        <h2 className="footer-cta-heading">
          Have an idea?<br />
          Let's make it <em>real.</em>
        </h2>
      </FadeUp>

      <FadeUp delay={0.18}>
        <p className="footer-cta-sub">
          I'm currently available for freelance projects, full-time roles,
          and exciting collaborations. Let's talk.
        </p>
      </FadeUp>

      <FadeUp delay={0.25}>
        <div className="footer-cta-actions">
          <GoldButton variant="filled" icon={HiArrowRight} href="#contact">
            Start a Conversation
          </GoldButton>
          <GoldButton variant="outline" href="/assets/Kathiravan_Resume.pdf">
            Download Resume
          </GoldButton>
        </div>
      </FadeUp>

      <FadeUp delay={0.32}>
        <a href="mailto:kathiravan@email.com" className="footer-cta-email">
          <span className="footer-cta-email-dot" />
          kathiravan@email.com
          <span className="footer-cta-email-dot" />
        </a>
      </FadeUp>
    </div>
  </section>
);

// ── Main Footer ───────────────────────────────────────────────────
const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <FooterCTA />

      <footer className="footer-section">
        <div className="footer-bg-decor" />

        <div className="footer-container">
          {/* ── Top Row ── */}
          <div className="footer-top">

            {/* Brand column */}
            <FadeUp delay={0.05}>
              <div className="footer-brand">
                <span className="footer-logo">K.</span>
                <span className="footer-motto">Architecting Digital Excellence</span>
                <p className="footer-brand-desc">
                  MERN Stack Developer crafting performant,
                  beautiful web experiences with clean code
                  and intentional design.
                </p>
              </div>
            </FadeUp>

            {/* Navigation column */}
            <FadeUp delay={0.1}>
              <div>
                <p className="footer-col-title">Navigation</p>
                <ul className="footer-nav-list">
                  {NAV_LINKS.map(link => (
                    <li key={link.name}>
                      <a href={link.href} className="footer-nav-link">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Socials column */}
            <FadeUp delay={0.15}>
              <div>
                <p className="footer-col-title">Connect</p>
                <div className="footer-social-grid">
                  {SOCIALS.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-item"
                    >
                      <span className="footer-social-icon">{s.icon}</span>
                      <span className="footer-social-label">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>

          </div>

          {/* ── Bottom Bar ── */}
          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="footer-copyright">
              © 2026 Kathiravan · All Rights Reserved
            </p>

            <div className="footer-bottom-right">
              <span className="footer-built-with">
                Built with <span>React</span> · <span>Tailwind</span> · <span>Framer Motion</span>
              </span>
              <button className="footer-back-top" onClick={scrollToTop}>
                <HiArrowUp className="w-2.5 h-2.5" />
                Top
              </button>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;