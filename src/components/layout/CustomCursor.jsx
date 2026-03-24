import { useEffect, useRef } from 'react';
import './CustomCursor.css';

// ─────────────────────────────────────────────────────────────────
// CustomCursor — pure DOM mouse-glow, zero React re-renders.
// Ref-scoped (no module-level variable) so HMR works cleanly.
// ─────────────────────────────────────────────────────────────────
const CustomCursor = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    // Create element scoped to this effect instance
    const el = document.createElement('div');
    el.id = 'cursor-glow';
    document.body.appendChild(el);
    glowRef.current = el;

    const onMove = ({ clientX, clientY }) => {
      el.style.transform = `translate(calc(${clientX}px - 50%), calc(${clientY}px - 50%))`;
      el.style.opacity   = '1';
    };

    const onLeave = () => { el.style.opacity = '0'; };

    // Show enhanced glow on hoverable elements
    const onEnterInteractive = () => { el.style.width = el.style.height = '420px'; };
    const onLeaveInteractive = () => { el.style.width = el.style.height = '320px'; };

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    window.addEventListener('mousemove', onMove, { passive: true });
    document.body.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
      glowRef.current?.remove();
      glowRef.current = null;
    };
  }, []);

  return null;
};

export default CustomCursor;