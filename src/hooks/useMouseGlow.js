import { useEffect } from 'react';

const useMouseGlow = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const glowEl = document.getElementById('mouse-glow');
      if (glowEl) {
        glowEl.style.setProperty('--mouse-x', `${x}px`);
        glowEl.style.setProperty('--mouse-y', `${y}px`);
        glowEl.classList.remove('opacity-0');
        glowEl.classList.add('opacity-100');
      }
    };

    const handleMouseLeave = () => {
      const glowEl = document.getElementById('mouse-glow');
      if (glowEl) {
        glowEl.classList.add('opacity-0');
        glowEl.classList.remove('opacity-100');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
};

export default useMouseGlow;
