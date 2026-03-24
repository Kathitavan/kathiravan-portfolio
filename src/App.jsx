import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar          from './components/Navbar/Navbar';
import Footer          from './components/Footer/Footer';
import Home            from './pages/Home';

import PageLoader       from './components/layout/PageLoader';
import SectionNavigator from './components/layout/SectionNavigator';
import FloatingContact  from './components/layout/FloatingContact';
import CommandPalette   from './components/layout/CommandPalette';
import KathirX          from './components/KathirX/KathirX';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showLoader, setShowLoader] = useState(
    () => !sessionStorage.getItem('portfolio-loaded')
  );

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

  // ─── CRITICAL: Wake up IntersectionObserver & GSAP on mount ───
  // This is essential on reloads because Lenis root overflow:hidden
  // can "lock" observers until a scroll event is detected.
  useEffect(() => {
    const kick = () => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));
      // Subtle scroll to poke the browser's render engine
      window.scrollTo(0, 1);
      window.scrollTo(0, 0);
    };

    // Run immediately + once more for lazy-loaded sections
    kick();
    const t = setTimeout(kick, 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration:        1.0,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:     'vertical',
      smoothWheel:     true,
      wheelMultiplier: 0.9,
      smoothTouch:     false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      // Bridge Lenis scroll to native window scroll so observers (Navbar/Dots) work
      window.dispatchEvent(new Event('scroll'));
    });

    const rafCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };
  }, []);

  return (
    <Router>
      <div className="bg-bg-primary min-h-screen text-white-soft">

        {/* Intro loader — stays on top via z-index, never hides content-dom */}
        {showLoader && <PageLoader onComplete={handleLoaderComplete} />}

        {/* Global UI */}
        <SectionNavigator />
        <FloatingContact />
        <CommandPalette />
        <KathirX />

        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;