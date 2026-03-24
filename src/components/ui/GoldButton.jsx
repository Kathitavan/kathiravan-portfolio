import { motion } from 'framer-motion';
import './GoldButton.css';

const GoldButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'filled', 
  className = '',
  href = null,
  icon: Icon = null
}) => {
  const baseStyles = "gold-button group";
  
  const variants = {
    filled: "gold-button-filled",
    outline: "gold-button-outline",
    ghost: "gold-button-ghost"
  };

  const content = (
    <>
      <span className="gold-button-content">
        {children}
        {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </span>
      {variant === 'filled' && (
        <div className="gold-button-shimmer" />
      )}
      {variant === 'outline' && (
        <div className="gold-button-bg-hover" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
};

export default GoldButton;
