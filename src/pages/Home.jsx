import React, { Suspense, useEffect } from 'react';
import Hero from '../components/Hero/Hero';

// ─── Import all sections directly to avoid lazy-loading race conditions on reload ───
import About        from '../components/About/About';
import Skills       from '../components/Skills/Skills';
import Projects     from '../components/Projects/Projects';
import Timeline     from '../components/Timeline/Timeline';
import Certificates from '../components/Certificates/Certificates';
import Achievements from '../components/Achievements/Achievements';
import Contact      from '../components/Contact/Contact';

const Home = () => {
  useEffect(() => {
    // Scroll to top on mount to ensure entrance animations fire correctly
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Certificates />
      <Achievements />
      <Contact />
    </div>
  );
};

export default Home;
