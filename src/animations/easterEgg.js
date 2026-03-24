import { useState, useEffect } from 'react';

export const useEasterEgg = (triggerWord = 'visioncrafter') => {
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [inputBuffer, setInputBuffer] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore keypresses if user is typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      setInputBuffer((prev) => {
        const newBuffer = (prev + key).slice(-triggerWord.length);
        if (newBuffer === triggerWord) {
          setIsMatrixMode(true);
          // Auto reset after 10 seconds
          setTimeout(() => setIsMatrixMode(false), 10000);
          return '';
        }
        return newBuffer;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerWord]);

  return { isMatrixMode };
};
