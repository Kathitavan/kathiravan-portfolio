import React from 'react';
import './GlassCard.css';

const GlassCard = ({ children, className = '', hover = true }) => {
  return (
    <div className={`
      relative p-8 glass-card
      ${hover ? 'glass-card-hover' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;
