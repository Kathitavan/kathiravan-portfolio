import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import ProjectModal from './ProjectModal';
import './Projects.css';
import { projectsData, projectCategories } from '../../data/projects';

/* ── Category → background theme (strong vivid glows) ── */
const CAT_THEME = {
  All:       { accent:'#94A3B8',
    bg:'linear-gradient(155deg,rgba(100,116,139,0.18) 0%,#0A0A12 45%,#0A0A12 100%)',
    glowA:'radial-gradient(ellipse 70% 60% at 0% 0%,rgba(100,116,139,0.50) 0%,transparent 65%)',
    glowB:'radial-gradient(ellipse 55% 45% at 100% 100%,rgba(71,85,105,0.35) 0%,transparent 65%)' },
  // ── NxtWave CCBP learning projects ──
  Learning:  { accent:'#F59E0B',
    bg:'linear-gradient(155deg,rgba(217,119,6,0.22) 0%,#0A0A12 45%,#0A0A12 100%)',
    glowA:'radial-gradient(ellipse 70% 60% at 0% 0%,rgba(245,158,11,0.52) 0%,transparent 65%)',
    glowB:'radial-gradient(ellipse 50% 40% at 100% 100%,rgba(180,83,9,0.30) 0%,transparent 65%)' },
  // ── HTML / CSS / JS beginner projects ──
  Beginner:  { accent:'#3B82F6',
    bg:'linear-gradient(155deg,rgba(37,99,235,0.22) 0%,#0A0A12 45%,#0A0A12 100%)',
    glowA:'radial-gradient(ellipse 70% 60% at 0% 0%,rgba(59,130,246,0.55) 0%,transparent 65%)',
    glowB:'radial-gradient(ellipse 50% 40% at 100% 100%,rgba(29,78,216,0.30) 0%,transparent 65%)' },
  // ── Advanced full-stack master projects ──
  Master:    { accent:'#8B5CF6',
    bg:'linear-gradient(155deg,rgba(109,40,217,0.22) 0%,#0A0A12 45%,#0A0A12 100%)',
    glowA:'radial-gradient(ellipse 70% 60% at 0% 0%,rgba(139,92,246,0.55) 0%,transparent 65%)',
    glowB:'radial-gradient(ellipse 50% 40% at 100% 100%,rgba(109,40,217,0.30) 0%,transparent 65%)' },
};
const getTheme = (cat) => CAT_THEME[cat] ?? CAT_THEME.All;
const PEEK = 6;

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const filteredProjects = projectsData.filter(p => 
    filter === 'All' ? true : p.category === filter
  );

  const theme    = getTheme(filter);
  const visible  = expanded ? filteredProjects : filteredProjects.slice(0, PEEK);
  const hiddenN  = Math.max(0, filteredProjects.length - PEEK);
  const canPeek  = !expanded && hiddenN > 0;

  const handleFilter = (cat) => { setFilter(cat); setExpanded(false); };

  return (
    <section id="projects" className="projects-section">
      {/* ── Category bg color layers — only additions, nothing else changed ── */}
      <motion.div className="projects-cat-bg"
        animate={{ background: theme.bg }} transition={{ duration: 0.65 }} />
      <motion.div className="projects-cat-glow-a"
        animate={{ background: theme.glowA }} transition={{ duration: 0.65 }} />
      <motion.div className="projects-cat-glow-b"
        animate={{ background: theme.glowB }} transition={{ duration: 0.65 }} />

      <div className="projects-bg-decor">
        <div className="projects-glow-1" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionTitle 
          subtitle="[ Portfolio ]"
          title="Featured Works"
          align="center"
        />

        <ProjectFilter 
          categories={projectCategories}
          activeCategory={filter}
          setCategory={handleFilter}
        />

        {/* ── Glass peek wrapper — only addition ── */}
        <div className={`projects-grid-wrap${canPeek ? ' projects-grid-wrap--peek' : ''}`}>
          <div className="projects-grid-inner">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode='popLayout'>
                {visible.map((project, i) => (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    onClick={setSelectedProject}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Glass peek overlay */}
          {canPeek && (
            <div className="projects-glass-peek">
              <div className="projects-glass-fade" />
              <motion.button
                className="projects-peek-btn"
                style={{ borderColor:`${theme.accent}50`, color: theme.accent,
                         boxShadow:`0 8px 32px rgba(0,0,0,0.55), 0 0 20px ${theme.accent}30` }}
                onClick={() => setExpanded(true)}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.35, duration:0.4 }}
              >
                <span className="projects-peek-count"
                  style={{ background:`${theme.accent}20`, color: theme.accent }}>
                  {hiddenN}
                </span>
                <span>more project{hiddenN > 1 ? 's' : ''} — tap to reveal</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </motion.button>
            </div>
          )}
        </div>
        {/* ── End glass peek wrapper ── */}

        {/* Collapse button */}
        {expanded && hiddenN > 0 && (
          <motion.div className="projects-collapse-row" initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <div className="projects-collapse-line" />
            <button className="projects-collapse-btn" onClick={() => setExpanded(false)}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
              Collapse
            </button>
            <div className="projects-collapse-line" />
          </motion.div>
        )}

        {/* Masonry Placeholder / Load More Hint */}
        {filteredProjects.length === 0 && (
          <div className="projects-empty-hint">
            The archive for this category is currently empty.
          </div>
        )}
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;