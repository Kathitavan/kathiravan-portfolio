import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiPaperAirplane } from 'react-icons/hi2';
import { CONTACT_DATA } from '../../data/data';
import './Contact.css';

/* ─── ContactForm ───────────────────────────────────────────────────
   Standalone form component — can be used anywhere independently.
   On submit: opens a pre-filled mailto link as a fallback.
   To use EmailJS instead, uncomment the emailjs block below.
   ─────────────────────────────────────────────────────────────── */
const ContactForm = ({ onSuccess } = {}) => {
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    /* ── Uncomment to use EmailJS ─────────────────────────────────
    import emailjs from '@emailjs/browser';
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          to_email:   'kathiravan15x@gmail.com',
        },
        'YOUR_PUBLIC_KEY'
      );
    } catch (err) {
      console.error('EmailJS error:', err);
    }
    ─────────────────────────────────────────────────────────────── */

    // Simulate delay then open mailto
    await new Promise(r => setTimeout(r, 1400));
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.open(
      `mailto:${CONTACT_DATA.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(body)}`,
      '_blank'
    );

    setStatus('success');
    setForm({ name:'', email:'', subject:'', message:'' });
    onSuccess?.();
  };

  if (status === 'success') {
    return (
      <motion.div
        className="cf-success"
        initial={{ opacity:0, scale:0.92 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:0.42, ease:[0.16,1,0.3,1] }}
      >
        <motion.div
          className="cf-success-icon"
          initial={{ scale:0, rotate:-15 }}
          animate={{ scale:1, rotate:0 }}
          transition={{ delay:0.1, type:'spring', stiffness:220, damping:18 }}
        >
          <HiCheckCircle style={{ width:30, height:30, color:'#050508' }} />
        </motion.div>
        <div className="cf-success-title">Message Sent!</div>
        <div className="cf-success-sub">I'll get back to you within 24 hours</div>
        <button className="cf-reset" onClick={() => setStatus('idle')}>
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <form className="cf-form" onSubmit={onSubmit}>
      <div className="cf-row-2">
        <div className="cf-field">
          <label className="cf-label">Name</label>
          <input className="cf-input" name="name" type="text"
            placeholder="Your name" value={form.name}
            onChange={onChange} required />
        </div>
        <div className="cf-field">
          <label className="cf-label">Email</label>
          <input className="cf-input" name="email" type="email"
            placeholder="you@email.com" value={form.email}
            onChange={onChange} required />
        </div>
      </div>

      <div className="cf-field">
        <label className="cf-label">Subject</label>
        <input className="cf-input" name="subject" type="text"
          placeholder="What's this about?" value={form.subject}
          onChange={onChange} />
      </div>

      <div className="cf-field">
        <label className="cf-label">Message</label>
        <textarea className="cf-textarea" name="message"
          placeholder="Tell me about your project, idea, or opportunity..."
          value={form.message} onChange={onChange} required rows={5} />
      </div>

      <button type="submit" className="cf-submit" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <><span className="cf-spinner" /> Sending...</>
        ) : (
          <>Send Message <HiPaperAirplane style={{ width:14, height:14 }} /></>
        )}
      </button>
    </form>
  );
};

export default ContactForm;