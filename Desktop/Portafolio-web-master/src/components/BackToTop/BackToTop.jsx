import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './BackToTop.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mostrar/ocultar el botón según el scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Agregar listener para el scroll
    window.addEventListener('scroll', toggleVisibility);
    
    // Mostrar el botón después de la animación inicial
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 1000);

    // Limpiar listeners
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      clearTimeout(timer);
    };
  }, []);

  // Función para hacer scroll suave al principio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Feedback táctil si está disponible
    if (navigator.vibrate) {
      navigator.vibrate(30);
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
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
      style={buttonStyle}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
};

export default BackToTop;
