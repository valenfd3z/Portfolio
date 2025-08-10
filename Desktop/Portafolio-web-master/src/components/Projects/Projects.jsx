import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import './Projects.css';

// Importar imágenes de ejemplo (reemplaza con tus propias imágenes)
import project1 from '../../assets/img/project1.jpg';
import project2 from '../../assets/img/project2.jpg';

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
      demoUrl: '#',
      codeUrl: 'https://github.com/valenfd3z/Recon-Expert'
    }
  ];

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Manejar error de carga de imagen
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/assets/img/placeholder.svg';
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
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projectsData.map((project) => (
            <motion.div 
              key={project.id} 
              className="project-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
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
