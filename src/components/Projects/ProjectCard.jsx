import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import GlassCard from '../ui/GlassCard';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="project-card-wrapper"
      onClick={() => onClick(project)}
    >
      <Tilt options={{ max: 15, scale: 1.02, speed: 1000 }}>
        <GlassCard className="!p-0 overflow-hidden h-full flex flex-col group">
          {/* Browser Mockup Area */}
          <div className="browser-mockup">
            <div className="browser-dot browser-dot-red" />
            <div className="browser-dot browser-dot-yellow" />
            <div className="browser-dot browser-dot-green" />
            <div className="browser-address">
              {project.title.toLowerCase().replace(/\s+/g, '-')}.app
            </div>
          </div>

          {/* Project Image Placeholder / Preview */}
          <div className="project-image-container">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-card-img"
              />
            ) : (
              <div className="project-card-placeholder">
                {project.title.split(' ').map(w => w[0]).join('')}
              </div>
            )}
            
            {/* Shimmer overlay */}
            <div className="project-card-shimmer" />
            
            {/* View Project Overlay */}
            <div className="project-card-overlay">
              <div className="project-card-overlay-text">
                Show Concept <HiOutlineArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="project-card-content">
            <div className="flex justify-between items-start">
              <span className="project-card-category">
                {project.category}
              </span>
              <span className="project-card-status">
                {project.status}
              </span>
            </div>

            <h3 className="project-card-title">
              {project.title}
            </h3>

            <p className="project-card-description">
              {project.description}
            </p>

            <div className="project-tech-stack">
              {project.stack.slice(0, 3).map((tech) => (
                <span key={tech} className="project-tech-chip">
                  {tech}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="text-[9px] font-mono text-silver/40 px-1 py-0.5">
                  +{project.stack.length - 3}
                </span>
              )}
            </div>
          </div>
        </GlassCard>
      </Tilt>
    </motion.div>
  );
};

export default ProjectCard;
