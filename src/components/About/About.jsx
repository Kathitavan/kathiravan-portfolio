import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import AboutInfoCards from './AboutInfoCards';
import './About.css';

const techStack = [
  'React','Node.js','MongoDB','Express',
  'JavaScript','PHP','SQLite','Python',
  'Tailwind CSS','Bootstrap','Git','GitHub',
];

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const About = () => (
  <section id="about" className="about-section">
    <div className="about-bg-glow-1" />
    <div className="about-bg-glow-2" />

    <div className="about-content">
      <SectionTitle subtitle="[ About Me ]" title="Who I Am" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-16 lg:gap-24 items-start">

        {/* ── LEFT: image ── */}
        <motion.div
          className="about-image-wrapper"
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-image-frame">
            <div className="about-offset-1" />
            <div className="about-offset-2" />

            <div className="about-image-container">
              <img
                src="/assets/images/profile.jpg"
                alt="Kathiravan"
                className="about-image-img"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div className="about-img-overlay" />
              <div className="about-scanline" />
              <div className="about-name-tag">
                <div className="about-name-tag-role">Full-Stack Developer</div>
                <div className="about-name-tag-name">Kathiravan</div>
              </div>
            </div>

            <motion.div
              className="about-floating-badge about-badge-top about-badge-desktop"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="about-badge-glass">
                <div className="about-badge-label">Status</div>
                <div className="about-badge-value">
                  <span className="about-badge-dot" />
                  Available
                </div>
              </div>
            </motion.div>

            <motion.div
              className="about-floating-badge about-badge-bottom about-badge-desktop"
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="about-badge-glass">
                <div className="about-badge-label">Degree</div>
                <div className="about-badge-value">B.Tech — IT</div>
              </div>
            </motion.div>
          </div>

          <FadeUp delay={0.45}>
            <div className="about-stat-bar">
              {[['2+','Years'],['15+','Projects'],['10+','Certs'],['8th','Sem']].map(([n,l]) => (
                <div key={l} className="about-stat-item">
                  <span className="about-stat-num">{n}</span>
                  <span className="about-stat-lbl">{l}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </motion.div>

        {/* ── RIGHT: bio + tech + cards ── */}
        <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>

          <FadeUp delay={0.15}>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.9rem' }}>
              <p className="about-lead">
                A passionate software developer pursuing a{' '}
                <em>B.Tech in Information Technology</em>,
                building modern web applications and solving real-world problems through code.
              </p>
              <p className="about-body">
                I craft digital experiences that balance aesthetic precision with technical depth —
                scalable, user-centric applications with clean architecture and polished interfaces.
              </p>
              <p className="about-body-sm">
                Beyond the MERN stack, I'm exploring blockchain basics and data science fundamentals.
                Always curious, always building.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.22}>
            <div className="about-divider" />
          </FadeUp>

          <FadeUp delay={0.28}>
            <div>
              <div className="about-tech-label">Technologies</div>
              <div className="about-chips">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="tech-chip"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.03, duration: 0.36 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.36}>
            <AboutInfoCards />
          </FadeUp>

        </div>
      </div>
    </div>
  </section>
);

export default About;