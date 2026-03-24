import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiPaperAirplane, HiSparkles, HiChevronDown } from 'react-icons/hi2';
import './KathirX.css';

/* ─────────────────────────────
   LOCAL AI ENGINE
───────────────────────────── */

const detectIntent = (msg) => {
  msg = msg.toLowerCase();

  if (msg.includes("name")) return "name";
  if (msg.includes("skill")) return "skills";
  if (msg.includes("project")) return "projects";
  if (msg.includes("education")) return "education";
  if (msg.includes("contact")) return "contact";
  if (msg.includes("cert")) return "certificates";
  if (msg.includes("experience")) return "experience";
  if (msg.includes("hire") || msg.includes("work")) return "hire";

  return "unknown";
};

const generateReply = (intent) => {
  switch (intent) {
    case "name":
      return `I'm KathirX 🤖 — representing Kathiravan, a Full Stack Developer.\n\n👉 Learn more [NAV:about]`;

    case "skills":
      return `Kathiravan works with MERN Stack, Python, Tailwind, and modern tools.\n\n👉 Explore skills [NAV:skills]`;

    case "projects":
      return `He has built multiple projects like Portfolio, Tourism site, and UI/UX redesigns.\n\n👉 View projects [NAV:projects]`;

    case "education":
      return `He is pursuing B.Tech IT and trained in Full Stack via NxtWave.\n\n👉 See timeline [NAV:timeline]`;

    case "experience":
      return `He has 2+ years of hands-on development experience.\n\n👉 Explore work [NAV:projects]`;

    case "certificates":
      return `He has 10+ certifications in Full Stack, React, Node, Python.\n\n👉 View certificates [NAV:certificates]`;

    case "contact":
      return `You can contact him via email, LinkedIn, or WhatsApp.\n\n👉 Go to contact [NAV:contact]`;

    case "hire":
      return `Yes — Kathiravan is open to work, freelance, and collaborations 🚀\n\n👉 Contact now [NAV:contact]`;

    default:
      return `I'm KathirX 🚀\n\nAsk me about projects, skills, or experience.\n\nTry: "Show projects"`;
  }
};

/* ─────────────────────────────
   HELPERS
───────────────────────────── */

const parseNav = (t) => {
  const m = t.match(/\[NAV:(\w+)\]/);
  return m ? m[1] : null;
};

const cleanText = (t) => t.replace(/\[NAV:\w+\]/g, '').trim();

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

/* ─────────────────────────────
   CHAT UI
───────────────────────────── */

const Bubble = ({ msg }) => {
  const isUser = msg.role === 'user';
  const nav = !isUser ? parseNav(msg.content) : null;
  const text = !isUser ? cleanText(msg.content) : msg.content;

  return (
    <motion.div
      className={'kx-row ' + (isUser ? 'kx-row--user' : 'kx-row--bot')}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {!isUser && <div className="kx-av">K</div>}

      <div className={'kx-bub ' + (isUser ? 'kx-bub--u' : 'kx-bub--b')}>
        <p>{text}</p>

        {nav && (
          <button className="kx-nav" onClick={() => scrollTo(nav)}>
            Go to {nav}
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Typing = () => (
  <div className="kx-row kx-row--bot">
    <div className="kx-av">K</div>
    <div className="kx-bub kx-bub--b">Typing...</div>
  </div>
);

/* ─────────────────────────────
   MAIN COMPONENT
───────────────────────────── */

const KathirX = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: 'assistant',
      content:
        "Hey, I'm KathirX 🤖\n\nAsk me anything about Kathiravan — projects, skills, or experience."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;

    setInput('');
    setMsgs(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    setTimeout(() => {
      const intent = detectIntent(msg);
      const reply = generateReply(intent);

      setMsgs(prev => [
        ...prev,
        { role: 'assistant', content: reply }
      ]);

      setLoading(false);
    }, 600);
  };

  return (
    <div className="kx-root">

      {/* CHAT PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="kx-panel"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="kx-head">
              <span>KathirX</span>
              <button onClick={() => setOpen(false)}>
                <HiXMark />
              </button>
            </div>

            <div className="kx-msgs">
              {msgs.map((m, i) => (
                <Bubble key={i} msg={m} />
              ))}
              {loading && <Typing />}
              <div ref={endRef} />
            </div>

            <div className="kx-input-wrap">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                onKeyDown={(e) => e.key === 'Enter' && send()}
              />
              <button onClick={() => send()}>
                <HiPaperAirplane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOAT BUTTON */}
      <motion.button
        className="kx-fab"
        onClick={() => setOpen(o => !o)}
      >
        {open ? <HiChevronDown /> : <HiSparkles />}
      </motion.button>

    </div>
  );
};

export default KathirX;