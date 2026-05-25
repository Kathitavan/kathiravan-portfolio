import React, { forwardRef } from 'react';
import './GlassCard.css';

const GlassCard = forwardRef(({ children, className = '', hover = true }, ref) => {
  return (
    <div
      ref={ref}
      className={`
        relative p-8 glass-card
        ${hover ? 'glass-card-hover' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';
export default GlassCard;