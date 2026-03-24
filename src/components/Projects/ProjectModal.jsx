import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiArrowTopRightOnSquare, HiCodeBracket, HiCheckCircle } from 'react-icons/hi2';
import GoldButton from '../ui/GoldButton';
import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="modal-container"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="modal-close-btn"
            >
              <HiXMark className="w-8 h-8 font-light" />
            </button>

            {/* Left Column: Visuals */}
            <div className="modal-visuals-col">
              <div className="modal-visuals-inner">
                <div className="modal-bg-accent" />
                <div className="modal-visuals-bg-text">
                  {project.title.split(' ').map(w => w[0]).join('')}
                </div>
                {/* Project preview — shows image if available, else styled placeholder */}
                <div className="modal-preview-card">
                  <div className="modal-preview-overlay" />
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                      onError={e => { e.target.style.display='none'; }}
                    />
                  ) : (
                    <div className="modal-preview-placeholder">
                      {project.title.split(' ').map(w => w[0]).join('')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="modal-details-col">
              <span className="modal-category">
                {project.category}
              </span>
              
              <h2 className="modal-title">
                {project.title}
              </h2>

              <p className="modal-description">
                {project.description}
              </p>

              {/* Specs */}
              <div className="modal-specs-section">
                {/* Tech Stack */}
                <div>
                  <h4 className="modal-spec-label">Core Stack</h4>
                  <div className="modal-tech-stack">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-3 py-1 glass-card text-[10px] font-mono text-silver border-gold-mid/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="modal-spec-label">Key Innovation</h4>
                  <div className="modal-feature-list">
                    {project.features.map(feature => (
                      <div key={feature} className="modal-feature-item">
                        <HiCheckCircle className="text-gold-mid w-4 h-4" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="modal-actions">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ flexGrow: 1 }}>
                    <GoldButton variant="filled" icon={HiArrowTopRightOnSquare} className="w-full">
                      Explore Live
                    </GoldButton>
                  </a>
                )}
                {project.github && project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <GoldButton variant="outline" icon={HiCodeBracket}>
                      Source Code
                    </GoldButton>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;