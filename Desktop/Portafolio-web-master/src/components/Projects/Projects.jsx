import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import './Projects.css';

// Importar imágenes de ejemplo (reemplaza con tus propias imágenes)
import project1 from '../../assets/img/project1.jpg';
import project2 from '../../assets/img/project2.jpg';
import project3 from '../../assets/img/project3.jpg';

const Projects = () => {
  // Datos de proyectos
  const projectsData = [
    {
      id: 1,
      title: 'Analizador de URL',
      description: 'Herramienta avanzada de análisis de seguridad que examina enlaces sospechosos utilizando múltiples motores de búsqueda y fuentes de inteligencia de amenazas en tiempo real.',
      image: project1,
      tags: ['React', 'Node.js', 'API', 'Seguridad', 'VirusTotal API'],
      demoUrl: '#',
      codeUrl: 'https://github.com/valenfd3z/analizador-url'
    },
    {
      id: 2,
      title: 'Recon-Expert',
      description: 'Herramienta de reconocimiento avanzado que automatiza búsquedas de Google Dorking para identificar vulnerabilidades y exponer información sensible en sitios web. Ideal para evaluaciones de seguridad y pruebas de penetración.',
      image: project2,
      tags: ['TypeScript', 'Vue', 'OSINT', 'Google Dorking', 'Diseño responsivo'],
      demoUrl: 'https://valenfd3z.github.io/Recon-Expert/',
      codeUrl: 'https://github.com/valenfd3z/Recon-Expert'
    },
    {
      id: 3,
      title: 'Sherlock-Web',
      description: 'Herramienta OSINT automatizada con interfaz gráfica para encontrar cuentas en múltiples plataformas mediante un nombre de usuario. Incluye utilidades para detección de fraudes, identificación de cuentas comprometidas y búsqueda de personas en línea.',
      image: project3,
      tags: ['Python + Flask', 'HTML/CSS/JS', 'OSINT', 'Automatización'],
      demoUrl: '#',
      codeUrl: '#'
    }
  ];

  // Animaciones mejoradas
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.98
    },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.5
      }
    }
  };

  // Manejar error de carga de imagen
  const handleImageError = (e) => {
    e.target.onerror = null;
    // Usar un SVG en línea como placeholder
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZjlmYSIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iI2FhYSI+SW1hZ2VuIG5vIGRpc3BvbmlibGU8L3RleHQ+Cjwvc3ZnPg==';
    e.target.style.objectFit = 'contain';
    e.target.style.padding = '20px';
    e.target.style.backgroundColor = '#f8f9fa';
  };

  return (
    <section id="projects" className="projects-section" data-testid="projects-section">
      <div className="projects-container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Proyectos
        </motion.h2>
        
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projectsData.map((project) => (
            <motion.div 
              key={project.id} 
              className="project-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={handleImageError}
                />
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      className="project-link primary"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                      Demo
                    </a>
                  )}
                  
                  {project.codeUrl ? (
                    <a 
                      href={project.codeUrl} 
                      className="project-link secondary"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                      Código
                    </a>
                  ) : (
                    <span className="project-link secondary" style={{ opacity: 0.7, cursor: 'not-allowed' }}>
                      <FontAwesomeIcon icon={faCode} />
                      Código privado
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="projects-bg"></div>
    </section>
  );
};

export default Projects;
