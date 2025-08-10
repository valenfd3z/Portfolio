import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './ThemeToggle.css';

const ThemeToggle = ({ toggleTheme, theme }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [tooltipText, setTooltipText] = useState('Cambiar tema');

  // Efecto para manejar la animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Efecto para actualizar el texto del tooltip según el tema
  useEffect(() => {
    setTooltipText(theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
  }, [theme]);

  const handleClick = () => {
    toggleTheme();
    // Feedback táctil si está disponible
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Estilos para la animación de entrada
  const buttonStyle = {
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? 'scale(1)' : 'scale(0.5)',
    transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  };

  return (
    <button 
      className="theme-toggle"
      onClick={handleClick}
      aria-label={tooltipText}
      data-tooltip={tooltipText}
      style={buttonStyle}
    >
      <FontAwesomeIcon 
        icon={theme === 'light' ? faMoon : faSun} 
        className={theme === 'light' ? 'moon-icon' : 'sun-icon'}
      />
    </button>
  );
};

export default ThemeToggle;
