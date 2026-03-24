import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMagnifyingGlass, HiArrowRight } from 'react-icons/hi2';
import './CommandPalette.css';

/* ─── Commands with category + emoji icon ──────────────────────── */
const COMMANDS = [
  /* Navigation */
  { name:'Home',         hint:'Scroll to top',       href:'#hero',                  cat:'Navigate', icon:'⌂', external:false },
  { name:'About',        hint:'Who is Kathiravan',    href:'#about',                 cat:'Navigate', icon:'✦', external:false },
  { name:'Skills',       hint:'Tech stack & tools',   href:'#skills',                cat:'Navigate', icon:'◈', external:false },
  { name:'Projects',     hint:'Featured work',        href:'#projects',              cat:'Navigate', icon:'◉', external:false },
  { name:'Timeline',     hint:'Education journey',    href:'#timeline',              cat:'Navigate', icon:'◎', external:false },
  { name:'Certificates', hint:'10+ credentials',      href:'#certificates',          cat:'Navigate', icon:'◆', external:false },
  { name:'Contact',      hint:'Get in touch',         href:'#contact',               cat:'Navigate', icon:'◇', external:false },
  /* Actions */
  { name:'Resume',       hint:'Download PDF',         href:'/assets/Kathiravan_Resume.pdf',            cat:'Action',   icon:'↓', external:false },
  /* Links */
  { name:'GitHub',       hint:'Source code',          href:'https://github.com',     cat:'Connect',  icon:'G', external:true  },
  { name:'LinkedIn',     hint:'Professional profile', href:'https://linkedin.com',   cat:'Connect',  icon:'in',external:true  },
  { name:'NxtWave',      hint:'Verified certificates',href:'https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1', cat:'Connect', icon:'N', external:true },
];

const CATEGORIES = ['Navigate','Action','Connect'];

const CommandPalette = () => {
  const [isOpen,  setIsOpen]  = useState(false);
  const [query,   setQuery]   = useState('');
  const [cursor,  setCursor]  = useState(0);
  const inputRef = useRef(null);
  const listRef  = useRef(null);

  /* ── Filtered flat list ── */
  const filtered = COMMANDS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.hint.toLowerCase().includes(query.toLowerCase()) ||
    c.cat.toLowerCase().includes(query.toLowerCase())
  );

  /* ── Open / close ── */
  const open = useCallback(() => { setIsOpen(true);  setQuery(''); setCursor(0); }, []);
  const close = useCallback(() => { setIsOpen(false); setQuery(''); setCursor(0); }, []);

  /* ── Global keyboard shortcut ── */
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); isOpen ? close() : open(); }
      if (e.key === 'Escape' && isOpen) close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, open, close]);

  /* ── Focus input on open ── */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 60);
  }, [isOpen]);

  /* ── Arrow/Enter navigation ── */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c+1, filtered.length-1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor(c => Math.max(c-1, 0)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[cursor];
      if (!cmd) return;
      execute(cmd);
    }
  };

  const execute = (cmd) => {
    close();
    if (cmd.external) {
      window.open(cmd.href, '_blank', 'noopener,noreferrer');
    } else if (cmd.href.startsWith('#')) {
      document.querySelector(cmd.href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = cmd.href;
    }
  };

  /* ── Scroll active into view ── */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${cursor}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  useEffect(() => { setCursor(0); }, [query]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Build grouped view ── */
  const groups = CATEGORIES.map(cat => ({
    cat,
    items: filtered.filter(c => c.cat === cat),
  })).filter(g => g.items.length > 0);

  /* Flat index lookup for cursor */
  const flatItems = groups.flatMap(g => g.items);

  return (
    <>
      {/* Trigger hint — tiny badge at bottom of viewport for discoverability */}
      {!isOpen && (
        <button
          className="cp-trigger"
          onClick={open}
          aria-label="Open command palette"
          style={{
            position:'fixed', bottom:'1.75rem', left:'50%',
            transform:'translateX(-50%)', zIndex:199,
            display:'none',
          }}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="cp-overlay">
            {/* Backdrop */}
            <motion.div
              className="cp-backdrop"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={close}
            />

            {/* Panel */}
            <motion.div
              className="cp-panel"
              initial={{ opacity:0, y:-18, scale:0.96 }}
              animate={{ opacity:1, y:0,   scale:1    }}
              exit={{    opacity:0, y:-18, scale:0.96 }}
              transition={{ duration:0.24, ease:[0.16,1,0.3,1] }}
            >
              {/* Header */}
              <div className="cp-header">
                <HiMagnifyingGlass className="cp-search-icon" style={{ width:17, height:17 }}/>
                <input
                  ref={inputRef}
                  className="cp-input"
                  placeholder="Search sections, actions, links..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                />
                {query.length > 0 && (
                  <span className="cp-counter">{filtered.length}</span>
                )}
                <kbd className="cp-esc" onClick={close}>ESC</kbd>
              </div>

              {/* Results */}
              <div className="cp-list" ref={listRef}>
                {filtered.length === 0 ? (
                  <div className="cp-empty">
                    No results for <strong>"{query}"</strong>
                  </div>
                ) : (
                  groups.map(({ cat, items }) => (
                    <div key={cat}>
                      {/* Category group header */}
                      <div className="cp-group-label">{cat}</div>

                      {items.map((cmd) => {
                        const flatIdx = flatItems.indexOf(cmd);
                        const isActive = flatIdx === cursor;
                        return (
                          <motion.a
                            key={cmd.name}
                            data-index={flatIdx}
                            href={cmd.href}
                            target={cmd.external ? '_blank' : undefined}
                            rel={cmd.external ? 'noopener noreferrer' : undefined}
                            className={`cp-item ${isActive ? 'cp-item--active' : ''}`}
                            onClick={(e) => {
                              if (!cmd.external && cmd.href.startsWith('#')) e.preventDefault();
                              execute(cmd);
                            }}
                            onMouseEnter={() => setCursor(flatIdx)}
                            layout
                          >
                            {/* Icon box */}
                            <div className="cp-item-icon-box">
                              <span style={{
                                fontFamily: cmd.icon.length > 1 ? "'JetBrains Mono',monospace" : 'inherit',
                                fontSize: cmd.icon.length > 1 ? 8 : 13,
                                color: isActive ? '#C9A84C' : 'rgba(168,178,196,0.60)',
                                fontWeight: 700,
                                transition: 'color 0.15s',
                              }}>
                                {cmd.icon}
                              </span>
                            </div>

                            {/* Text */}
                            <div className="cp-item-info">
                              <span className="cp-item-name">{cmd.name}</span>
                              <span className="cp-item-hint">{cmd.hint}</span>
                            </div>

                            {/* Right */}
                            <div className="cp-item-right">
                              {cmd.external && <span className="cp-item-ext">ext</span>}
                              <HiArrowRight className="cp-item-arrow" style={{ width:14, height:14 }}/>
                            </div>
                          </motion.a>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="cp-footer">
                <div className="cp-help">
                  <span className="cp-key">↑↓</span>
                  <span className="cp-help-txt">Navigate</span>
                </div>
                <div className="cp-help">
                  <span className="cp-key">↵</span>
                  <span className="cp-help-txt">Open</span>
                </div>
                <div className="cp-help">
                  <span className="cp-key">⌘K</span>
                  <span className="cp-help-txt">Toggle</span>
                </div>
                <span className="cp-footer-brand">KathirX · CMD</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;