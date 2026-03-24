import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCheckBadge, HiArrowTopRightOnSquare, HiXMark,
  HiArrowDownTray, HiSparkles, HiFunnel,
  HiEye, HiDocumentText, HiChevronDown, HiChevronUp,
  HiCalendar, HiTag, HiAcademicCap,
} from 'react-icons/hi2';
import SectionTitle from '../ui/SectionTitle';
import { certificatesData } from '../../data/certificates';
import './Certificates.css';

/* ─── Category themes — STRONG visible colors ─────────────────
   bgColor   = actual section background (replaces #050508)
   accentRGB = used for glow / borders
   accent    = hex accent for text / buttons
─────────────────────────────────────────────────────────────── */
const CAT_THEME = {
  All:        {
    accent: '#C9A84C', accentRGB: '201,168,76',
    bg: 'linear-gradient(160deg, #0a0900 0%, #050508 55%, #09070f 100%)',
    glow: 'radial-gradient(ellipse 60% 50% at 15% 30%, rgba(201,168,76,0.18) 0%, transparent 70%)',
    glowB: 'radial-gradient(ellipse 50% 40% at 85% 70%, rgba(123,94,167,0.14) 0%, transparent 70%)',
  },
  NxtWave:    {
    accent: '#E8C87A', accentRGB: '232,200,122',
    bg: 'linear-gradient(160deg, #110e00 0%, #0c0900 40%, #070508 100%)',
    glow: 'radial-gradient(ellipse 65% 55% at 10% 25%, rgba(232,200,122,0.22) 0%, transparent 70%)',
    glowB: 'radial-gradient(ellipse 45% 35% at 90% 80%, rgba(201,168,76,0.12) 0%, transparent 70%)',
  },
  College:    {
    accent: '#A78BFA', accentRGB: '167,139,250',
    bg: 'linear-gradient(160deg, #07040f 0%, #060510 40%, #050508 100%)',
    glow: 'radial-gradient(ellipse 65% 55% at 10% 25%, rgba(139,92,246,0.24) 0%, transparent 70%)',
    glowB: 'radial-gradient(ellipse 45% 35% at 90% 80%, rgba(167,139,250,0.12) 0%, transparent 70%)',
  },
  Internship: {
    accent: '#2DD4BF', accentRGB: '45,212,191',
    bg: 'linear-gradient(160deg, #00100e 0%, #040b0a 40%, #050508 100%)',
    glow: 'radial-gradient(ellipse 65% 55% at 10% 25%, rgba(20,184,166,0.22) 0%, transparent 70%)',
    glowB: 'radial-gradient(ellipse 45% 35% at 90% 80%, rgba(45,212,191,0.10) 0%, transparent 70%)',
  },
  Others:     {
    accent: '#94A3B8', accentRGB: '148,163,184',
    bg: 'linear-gradient(160deg, #07080a 0%, #060709 40%, #050508 100%)',
    glow: 'radial-gradient(ellipse 55% 45% at 10% 25%, rgba(100,116,139,0.18) 0%, transparent 70%)',
    glowB: 'radial-gradient(ellipse 40% 30% at 90% 80%, rgba(148,163,184,0.10) 0%, transparent 70%)',
  },
};
const getTheme = (cat) => CAT_THEME[cat] ?? CAT_THEME.Others;
const getCategories = (data) =>
  ['All', ...new Set(data.map(c => c.category || c.issuer))];

const PEEK = 8;

/* ─── Gradient first color extractor ─────────────────────────── */
const gradStop = (g) => {
  if (!g) return 'rgba(201,168,76,0.25)';
  if (g.includes('orange'))  return 'rgba(249,115,22,0.32)';
  if (g.includes('yellow'))  return 'rgba(234,179,8,0.28)';
  if (g.includes('blue'))    return 'rgba(59,130,246,0.28)';
  if (g.includes('purple'))  return 'rgba(168,85,247,0.28)';
  if (g.includes('cyan'))    return 'rgba(34,211,238,0.28)';
  if (g.includes('teal'))    return 'rgba(20,184,166,0.28)';
  if (g.includes('gray'))    return 'rgba(107,114,128,0.28)';
  if (g.includes('green'))   return 'rgba(34,197,94,0.28)';
  if (g.includes('pink'))    return 'rgba(236,72,153,0.28)';
  return 'rgba(201,168,76,0.25)';
};

/* ─── Advanced Certificate Card ───────────────────────────────── */
const CertCard = ({ cert, onOpen, index, theme }) => {
  const [hov, setHov] = useState(false);
  const color1 = gradStop(cert.gradient);
  const color2 = gradStop(cert.gradient?.replace(/from-\S+/, 'from-').replace('to-', ''));

  return (
    <motion.div
      className={`cc ${hov ? 'cc--hov' : ''}`}
      style={{ '--ca': theme.accent, '--cr': theme.accentRGB }}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.055, duration: 0.55, ease: [0.16,1,0.3,1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onOpen(cert)}
    >
      {/* ── Visual header ─────────────────────────────── */}
      <div className="cc-head" style={{
        background: `linear-gradient(145deg, ${color1} 0%, rgba(15,12,25,0.92) 100%)`
      }}>
        {/* Ambient inner glow */}
        <div className="cc-inner-glow" style={{ background: color1 }} />

        {/* Large watermark letter */}
        <div className="cc-watermark">{cert.issuer[0]}</div>

        {/* Certificate document */}
        <div className="cc-doc">
          <div className="cc-doc-header">
            <span className="cc-doc-issuer">{cert.issuer}</span>
            <HiCheckBadge className="cc-doc-check" style={{ color: theme.accent }} />
          </div>
          <div className="cc-doc-body">
            {cert.image && cert.image !== '#' ? (
              <img src={cert.image} alt={cert.title}
                onError={e => e.target.style.display = 'none'} />
            ) : (
              <div className="cc-doc-placeholder">
                <HiAcademicCap style={{ width:24, height:24, color:`${theme.accent}60` }} />
              </div>
            )}
          </div>
          <div className="cc-doc-footer">
            <div className="cc-doc-line" />
            <div className="cc-doc-line cc-doc-line--short" />
          </div>
        </div>

        {/* Shimmer */}
        <div className="cc-shimmer" />

        {/* Featured */}
        {cert.featured && (
          <div className="cc-featured" style={{ borderColor: `${theme.accent}50`, color: theme.accent }}>
            <HiSparkles style={{ width:8, height:8 }} />
            Featured
          </div>
        )}

        {/* Year badge */}
        <div className="cc-year">{cert.year}</div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hov && (
            <motion.div className="cc-hover-overlay"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration: 0.18 }}>
              <motion.div
                initial={{ scale: 0.7, opacity:0 }}
                animate={{ scale: 1, opacity:1 }}
                transition={{ delay: 0.05, duration: 0.22 }}
                style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}
              >
                <div className="cc-eye-ring" style={{ borderColor: `${theme.accent}70` }}>
                  <HiEye style={{ width:20, height:20, color: theme.accent }} />
                </div>
                <span className="cc-hover-txt" style={{ color: theme.accent }}>View Certificate</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Card body ─────────────────────────────────── */}
      <div className="cc-body">
        {/* Category tag */}
        <div className="cc-tag" style={{ color: theme.accent, borderColor:`${theme.accent}30`, background:`${theme.accent}10` }}>
          <HiTag style={{ width:8, height:8 }} />
          {cert.category || cert.issuer}
        </div>

        {/* Title */}
        <div className="cc-title">{cert.title}</div>

        {/* Meta row */}
        <div className="cc-meta">
          <span className="cc-meta-issuer" style={{ color: theme.accent }}>{cert.issuer}</span>
          <span className="cc-meta-dot">·</span>
          <HiCalendar style={{ width:9, height:9, color:'rgba(168,178,196,0.4)' }} />
          <span className="cc-meta-year">{cert.year}</span>
        </div>

        {/* Skills */}
        {cert.skills?.length > 0 && (
          <div className="cc-skills">
            {cert.skills.slice(0,3).map(s => (
              <span key={s} className="cc-skill">{s}</span>
            ))}
            {cert.skills.length > 3 && (
              <span className="cc-skill cc-skill--more" style={{ color:theme.accent, borderColor:`${theme.accent}30` }}>
                +{cert.skills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className="cc-bottom-bar" style={{ background: `linear-gradient(to right, ${theme.accent}80, transparent)` }} />
    </motion.div>
  );
};

/* ─── Rich Certificate Modal ──────────────────────────────────── */
const CertModal = ({ cert, onClose, theme }) => {
  if (!cert) return null;
  /* ── Robust file-type detection ──────────────────────────────
     pdfUrl: null  → no PDF tab shown
     image:  null  → no Preview tab shown
     If pdfUrl accidentally points to a .png/.jpg → treat as image
  ─────────────────────────────────────────────────────────── */
  const hasPDF    = !!(cert.pdfUrl && cert.pdfUrl !== '#');
  const hasImg    = !!(cert.image  && cert.image  !== '#');
  const pdfIsImg  = hasPDF && /\.(png|jpg|jpeg|webp)$/i.test(cert.pdfUrl);
  const effectivePDF = hasPDF && !pdfIsImg;
  const effectiveImg = hasImg || pdfIsImg;
  const imgSrc       = hasImg ? cert.image : (pdfIsImg ? cert.pdfUrl : null);
  const [tab, setTab] = useState(effectivePDF ? 'pdf' : effectiveImg ? 'preview' : 'info');

  return (
    <motion.div className="cm-wrap"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
      {/* Backdrop */}
      <motion.div className="cm-backdrop" onClick={onClose}
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} />

      {/* Panel */}
      <motion.div className="cm-panel"
        style={{ '--ca': theme.accent, '--cr': theme.accentRGB }}
        initial={{ opacity:0, y:40, scale:0.93 }}
        animate={{ opacity:1, y:0, scale:1 }}
        exit={{ opacity:0, y:40, scale:0.93 }}
        transition={{ duration:0.42, ease:[0.16,1,0.3,1] }}>

        {/* Panel header gradient strip */}
        <div className="cm-header-strip"
          style={{ background:`linear-gradient(90deg, ${theme.accent}30 0%, ${theme.accent}08 50%, transparent 100%)` }} />

        {/* Header */}
        <div className="cm-head">
          <div className="cm-head-left">
            <div className="cm-head-icon" style={{ background:`${theme.accent}18`, border:`1px solid ${theme.accent}35` }}>
              <HiAcademicCap style={{ width:20, height:20, color:theme.accent }} />
            </div>
            <div>
              <span className="cm-eyebrow" style={{ color:theme.accent }}>
                {cert.category || cert.issuer} · {cert.year}
              </span>
              <h2 className="cm-title">{cert.title}</h2>
            </div>
          </div>
          <button className="cm-close" onClick={onClose}>
            <HiXMark style={{ width:18, height:18 }} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="cm-tabs">
          {effectivePDF && (
            <button className={`cm-tab ${tab==='pdf' ? 'cm-tab--on' : ''}`}
              style={tab==='pdf' ? { color:theme.accent, borderColor:theme.accent } : {}}
              onClick={() => setTab('pdf')}>
              <HiDocumentText style={{ width:12, height:12 }} /> PDF View
            </button>
          )}
          {effectiveImg && (
            <button className={`cm-tab ${tab==='preview' ? 'cm-tab--on' : ''}`}
              style={tab==='preview' ? { color:theme.accent, borderColor:theme.accent } : {}}
              onClick={() => setTab('preview')}>
              <HiEye style={{ width:12, height:12 }} /> Preview
            </button>
          )}
          <button className={`cm-tab ${tab==='info' ? 'cm-tab--on' : ''}`}
            style={tab==='info' ? { color:theme.accent, borderColor:theme.accent } : {}}
            onClick={() => setTab('info')}>
            <HiCheckBadge style={{ width:12, height:12 }} /> Details
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            transition={{ duration:0.22 }}>

            {tab === 'pdf' && effectivePDF && (
              <div className="cm-pdf-wrap">
                <iframe src={cert.pdfUrl} title={cert.title} className="cm-iframe" />
              </div>
            )}

            {tab === 'preview' && effectiveImg && (
              <div className="cm-img-wrap">
                <img src={imgSrc} alt={cert.title} className="cm-img" />
              </div>
            )}

            {tab === 'info' && (
              <div className="cm-info">
                {/* Big cert preview thumbnail */}
                <div className="cm-thumb" style={{
                  background:`linear-gradient(135deg, ${gradStop(cert.gradient)} 0%, rgba(10,10,18,0.95) 100%)`
                }}>
                  <div className="cm-thumb-watermark">{cert.issuer[0]}</div>
                  <div className="cm-thumb-card">
                    <div className="cm-thumb-top" style={{ background: theme.accent }} />
                    <div className="cm-thumb-mid">
                      {effectiveImg
                        ? <img src={imgSrc} alt="" className="cm-thumb-img" />
                        : <HiAcademicCap style={{ width:32, height:32, color:`${theme.accent}60` }} />
                      }
                    </div>
                    <div className="cm-thumb-name">{cert.issuer}</div>
                  </div>
                  <div className="cm-thumb-shimmer" />
                </div>

                {/* Meta grid */}
                <div className="cm-meta-grid">
                  {[
                    { l:'Issuer',   v: cert.issuer   },
                    { l:'Year',     v: cert.year      },
                    { l:'Category', v: cert.category || cert.issuer },
                    { l:'Skills',   v: `${cert.skills?.length || 0} covered` },
                  ].map(({ l, v }) => (
                    <div key={l} className="cm-meta-cell">
                      <span className="cm-meta-label">{l}</span>
                      <span className="cm-meta-value">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                {cert.skills?.length > 0 && (
                  <div className="cm-skills-wrap">
                    <div className="cm-skills-label" style={{ color: theme.accent }}>Skills Covered</div>
                    <div className="cm-skills">
                      {cert.skills.map((s, i) => (
                        <motion.span key={s} className="cm-skill"
                          initial={{ opacity:0, scale:0.85 }}
                          animate={{ opacity:1, scale:1 }}
                          transition={{ delay: i * 0.04 }}
                          style={{ borderColor:`${theme.accent}28`, color:'rgba(238,240,245,0.75)' }}>
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Actions bar */}
        <div className="cm-actions">
          {cert.verifyUrl && cert.verifyUrl !== '#' && (
            <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
              className="cm-btn-primary"
              style={{ background:theme.accent, borderColor:theme.accent }}>
              Verify Credential
              <HiArrowTopRightOnSquare style={{ width:13, height:13 }} />
            </a>
          )}
          {effectivePDF && (
            <a href={cert.pdfUrl} download={`${cert.title}.pdf`} className="cm-btn-secondary"
              style={{ borderColor:`${theme.accent}35`, color:`${theme.accent}cc` }}>
              Download PDF
              <HiArrowDownTray style={{ width:13, height:13 }} />
            </a>
          )}
          <button className="cm-btn-ghost" onClick={onClose}>Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Section ────────────────────────────────────────────── */
const Certificates = () => {
  const [selected,  setSelected]  = useState(null);
  const [activeCat, setActiveCat] = useState('All');
  const [expanded,  setExpanded]  = useState(false);

  const categories = getCategories(certificatesData);
  const theme      = getTheme(activeCat);

  const filtered = activeCat === 'All'
    ? certificatesData
    : certificatesData.filter(c => (c.category || c.issuer) === activeCat);

  const visible = expanded ? filtered : filtered.slice(0, PEEK);
  const hiddenN = Math.max(0, filtered.length - PEEK);
  const canPeek = !expanded && hiddenN > 0;

  const handleCat = (cat) => { setActiveCat(cat); setExpanded(false); };

  const counts = {};
  categories.forEach(cat => {
    counts[cat] = cat === 'All'
      ? certificatesData.length
      : certificatesData.filter(c => (c.category || c.issuer) === cat).length;
  });

  return (
    <section id="certificates" className="cert-section">
      {/* ── Strong animated bg ── */}
      <motion.div className="cert-bg"
        animate={{ background: theme.bg }}
        transition={{ duration: 0.7 }} />
      <motion.div className="cert-glow-a"
        animate={{ background: theme.glow }}
        transition={{ duration: 0.7 }} />
      <motion.div className="cert-glow-b"
        animate={{ background: theme.glowB }}
        transition={{ duration: 0.7 }} />

      {/* Noise grain on bg */}
      <div className="cert-noise" />

      <div className="cert-wrap">
        <SectionTitle subtitle="[ Recognition ]" title="Certifications" align="center" />

        {/* Stats */}
        <div className="cert-stats">
          {[
            { n: certificatesData.length, l: 'Certificates' },
            { n: new Set(certificatesData.map(c => c.issuer)).size, l: 'Platforms' },
            { n: [...new Set(certificatesData.flatMap(c => c.skills||[]))].length, l: 'Skills' },
          ].map(({ n, l }) => (
            <div key={l} className="cert-stat">
              <motion.span className="cert-stat-n"
                animate={{ color: theme.accent }}
                transition={{ duration:0.5 }}>{n}+</motion.span>
              <span className="cert-stat-l">{l}</span>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="cert-filter-row">
          <HiFunnel style={{ width:14, height:14, color:'rgba(168,178,196,0.32)' }} />
          {categories.map(cat => {
            const t  = getTheme(cat);
            const on = activeCat === cat;
            return (
              <motion.button key={cat}
                className={`cert-tab${on ? ' cert-tab--on' : ''}`}
                style={on
                  ? { background: t.accent, color:'#050508', borderColor:t.accent, fontWeight:700 }
                  : { borderColor:'rgba(255,255,255,0.10)', color:'rgba(168,178,196,0.55)' }}
                onClick={() => handleCat(cat)}
                whileHover={{ scale:1.04, transition:{ duration:0.15 } }}
                whileTap={{ scale:0.96 }}>
                {cat}
                <span className="cert-tab-n" style={on ? { color:'rgba(5,5,8,0.5)' } : {}}>
                  {counts[cat]}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Grid + glass peek */}
        <div className={`cert-grid-wrap${canPeek ? ' cert-grid-wrap--peek' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div key={activeCat} className="cert-grid"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.2 }}>
              {visible.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} onOpen={setSelected}
                  index={i} theme={theme} />
              ))}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Glass peek — OUTSIDE grid-wrap so it never overlaps cards */}
        {canPeek && (
          <div className="cert-glass-peek">
            <div className="cert-glass-fade" />
            <motion.button className="cert-peek-pill"
              style={{ borderColor:`${theme.accent}50`, color:theme.accent,
                       boxShadow:`0 8px 32px rgba(${theme.accentRGB},0.20)` }}
              onClick={() => setExpanded(true)}
              whileHover={{ scale:1.04, y:-2, boxShadow:`0 14px 40px rgba(${theme.accentRGB},0.30)` }}
              whileTap={{ scale:0.97 }}
              initial={{ opacity:0, y:12 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.4, duration:0.42 }}>
              <span className="cert-peek-count"
                style={{ background:`${theme.accent}20`, color:theme.accent }}>
                {hiddenN}
              </span>
              <span>more certificate{hiddenN>1?'s':''} — tap to reveal</span>
              <HiChevronDown style={{ width:15, height:15 }} />
            </motion.button>
          </div>
        )}

        {/* Collapse */}
        {expanded && hiddenN > 0 && (
          <motion.div className="cert-collapse" initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <div className="cert-collapse-line" />
            <button className="cert-collapse-btn"
              style={{ borderColor:`${theme.accent}25`, color:`${theme.accent}80` }}
              onClick={() => setExpanded(false)}>
              <HiChevronUp style={{ width:11, height:11 }} /> Collapse
            </button>
            <div className="cert-collapse-line" />
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} theme={theme} />}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;