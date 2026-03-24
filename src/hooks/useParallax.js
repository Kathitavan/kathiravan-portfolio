import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useParallax = (ref, speed = 0.5, direction = 'vertical') => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const movement = direction === 'vertical' ? { y: `${speed * 100}px` } : { x: `${speed * 100}px` };

    gsap.to(element, {
      ...movement,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [ref, speed, direction]);
};
