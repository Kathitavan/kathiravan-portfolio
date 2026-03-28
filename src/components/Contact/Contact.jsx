import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUpRight, HiCheckCircle, HiPaperAirplane } from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { CONTACT_DATA } from '../../data/data';
import SectionTitle from '../ui/SectionTitle';
import './Contact.css';

/* ─── Real social links ─────────────────────────────────────────── */
const SOCIALS = [
  {
    Icon:     FaGithub,
    platform: 'GitHub',
    handle:   'Kathitavan',
    href:     CONTACT_DATA.github,
    color:    '#E8C87A',
  },
  {
    Icon:     FaLinkedinIn,
    platform: 'LinkedIn',
    handle:   'kathiravan-kumar',
    href:     CONTACT_DATA.linkedin,
    color:    '#7BB3D0',
  },
  {
    Icon:     FaInstagram,
    platform: 'Instagram',
    handle:   '@k_kathiravan_x',
    href:     CONTACT_DATA.instagram,
    color:    '#E1306C',
  },
  {
    Icon:     FaWhatsapp,
    platform: 'WhatsApp',
    handle:   CONTACT_DATA.mobile,
    href:     CONTACT_DATA.whatsapp,
    color:    '#25D366',
  },
  {
    Icon:     MdEmail,
    platform: 'Email',
    handle:   CONTACT_DATA.email,
    href:     `mailto:${CONTACT_DATA.email}`,
    color:    '#C9A84C',
  },
];

/* ─── FadeUp helper ─────────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 22 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.60, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

/* ─── Contact form ──────────────────────────────────────────────── */
const ContactForm = () => {
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    /* ── EmailJS integration (fill in your IDs to activate) ──
       import emailjs from '@emailjs/browser';
       await emailjs.send(
         'YOUR_SERVICE_ID',
         'YOUR_TEMPLATE_ID',
         { from_name: form.name, from_email: form.email,
           subject: form.subject, message: form.message },
         'YOUR_PUBLIC_KEY'
       );
    ── Without EmailJS, opens mailto as fallback ─────────────── */

    await new Promise(r => setTimeout(r, 1400)); // simulate network

    // Fallback: open mailto
    const mailto =
      `mailto:${CONTACT_DATA.email}` +
      `?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}` +
      `&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto, '_blank');

    setStatus('success');
    setForm({ name:'', email:'', subject:'', message:'' });
  };

  if (status === 'success') {
    return (
      <motion.div
        className="cf-success"
        initial={{ opacity:0, scale:0.92 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
      >
        <motion.div
          className="cf-success-icon"
          initial={{ scale:0, rotate:-20 }}
          animate={{ scale:1, rotate:0 }}
          transition={{ delay:0.1, type:'spring', stiffness:200, damping:18 }}
        >
          <HiCheckCircle style={{ width:32, height:32, color:'#050508' }} />
        </motion.div>
        <div className="cf-success-title">Message Sent!</div>
        <div className="cf-success-sub">I'll get back to you soon — usually within 24 hrs</div>
        <button className="cf-reset" onClick={() => setStatus('idle')}>
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <form className="cf-form" onSubmit={onSubmit}>
      {/* Name + Email */}
      <div className="cf-row-2">
        <div className="cf-field">
          <label className="cf-label">Name</label>
          <input
            className="cf-input" name="name" type="text"
            placeholder="Your name" value={form.name}
            onChange={onChange} required
          />
        </div>
        <div className="cf-field">
          <label className="cf-label">Email</label>
          <input
            className="cf-input" name="email" type="email"
            placeholder="you@email.com" value={form.email}
            onChange={onChange} required
          />
        </div>
      </div>

      {/* Subject */}
      <div className="cf-field">
        <label className="cf-label">Subject</label>
        <input
          className="cf-input" name="subject" type="text"
          placeholder="What's this about?" value={form.subject}
          onChange={onChange}
        />
      </div>

      {/* Message */}
      <div className="cf-field">
        <label className="cf-label">Message</label>
        <textarea
          className="cf-textarea" name="message"
          placeholder="Tell me about your project, idea, or opportunity..."
          value={form.message} onChange={onChange} required
          rows={5}
        />
      </div>

      <button
        type="submit"
        className="cf-submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <>
            <span className="cf-spinner" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <HiPaperAirplane style={{ width:14, height:14 }} />
          </>
        )}
      </button>
    </form>
  );
};

/* ─── Main Contact Section ─────────────────────────────────────── */
const Contact = () => (
  <section id="contact" className="contact-section">
    <div className="contact-glow-a" />
    <div className="contact-glow-b" />
    <div className="contact-grid-bg" />

    <div className="contact-wrap">
      <SectionTitle subtitle="[ Get In Touch ]" title="Contact" align="center" />

      <div className="contact-body">

        {/* ── LEFT: info + socials ── */}
        <div className="contact-info">
          <FadeUp delay={0.05}>
            <h2 className="contact-heading">
              Let's build something <em>great.</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="contact-sub">
              Open to freelance projects, full-time roles, internships, and
              collaborations. Drop a message or reach out on any platform — I
              respond fast.
            </p>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div className="contact-status">
              <span className="contact-status-dot" />
              <span className="contact-status-txt">Available for work</span>
            </div>
          </FadeUp>

          <div className="contact-divider" />

          {/* Social links */}
          <div className="contact-socials">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-row"
                initial={{ opacity:0, x:-16 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: 0.22 + i * 0.07, duration:0.50, ease:[0.16,1,0.3,1] }}
                whileHover={{ x: 3 }}
              >
                <div className="social-icon-wrap">
                  <s.Icon style={{ width:18, height:18, color: s.color }} />
                </div>
                <div className="social-text">
                  <span className="social-platform">{s.platform}</span>
                  <span className="social-handle">{s.handle}</span>
                </div>
                <HiArrowUpRight className="social-arrow" style={{ width:16, height:16 }} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── RIGHT: form card ── */}
        <FadeUp delay={0.15}>
          <div className="contact-card">
            <ContactForm />
          </div>
        </FadeUp>

      </div>
    </div>
  </section>
);

export default Contact;