import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import './Home.css';

// Importar la imagen de perfil
import perfil from '../../assets/img/perfil.jpeg';

// Ruta de la imagen de perfil
const profileImg = perfil;

const Home = () => {
  const particlesRef = useRef(null);

  // Efecto para crear partículas flotantes
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    // Limpiar partículas existentes
    container.innerHTML = '';

    // Crear partículas
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Tamaño aleatorio entre 5px y 15px
      const size = Math.random() * 10 + 5;
      
      // Posición aleatoria
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Establecer estilos
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${posX}%`,
        top: `${posY}%`,
        opacity: Math.random() * 0.5 + 0.1,
        animationDuration: `${Math.random() * 20 + 10}s`,
        animationDelay: `-${Math.random() * 10}s`,
      });
      
      container.appendChild(particle);
    }
  }, []);

  // Animation variants for consistent transitions
  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      }
    }
  };

  return (
    <section id="home" className="home-section" data-testid="home-section">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
        <div className="particles" ref={particlesRef}></div>
      </div>
      
      <div className="container">
        <div className="profile-content">
          <motion.div 
            className="profile-image-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src={profileImg} 
              alt="Marco Valentín" 
              className="profile-image"
              width="200"
              height="200"
            />
          </motion.div>

          <motion.div 
            className="text-content"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.h1 
              className="title"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Hola, soy <span className="accent-text">Marco Valentín</span>
            </motion.h1>
            <motion.h2 
              className="subtitle"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              Estudiante de Licenciatura en Informática | Ciberseguridad | Ciencia de Datos
            </motion.h2>
            
            <motion.p 
              className="description"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              Apasionado por la tecnología con enfoque en análisis de datos y seguridad ofensiva.
              Sumando experiencia en análisis de vulnerabilidades y visualización de datos, comprometido con el 
              aprendizaje continuo y el desarrollo de herramientas de seguridad.
            </motion.p>
            
            <motion.div 
              className="button-group"
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
            >
              <a 
                href="#contact" 
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="icon" />
                Contáctame
              </a>
              <a 
                href="/cv.pdf" 
                download 
                className="btn btn-outline"
              >
                <FontAwesomeIcon icon={faDownload} className="icon" />
                Descargar CV
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
