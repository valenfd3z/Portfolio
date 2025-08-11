import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import './Blog.css';

// Importar imágenes de ejemplo (reemplaza con tus propias imágenes)
import blog1 from '../../assets/img/redes.avif';
import blog2 from '../../assets/img/blog2.jpg';
import blog3 from '../../assets/img/blog3.jpg';

const Blog = () => {
  // Datos de publicaciones del blog
  const blogPosts = [
    {
      id: 1,
      title: 'Fundamentos de Redes',
      excerpt: 'Exploración de los conceptos esenciales de redes de computadoras, protocolos de comunicación y su funcionamiento en el mundo digital actual.',
      image: blog1,
      date: '15 de Agosto, 2023',
      author: 'Marco Fernández',
      readTime: '5 min de lectura',
      tags: ['Redes', 'Tecnología', 'Educación'],
      url: '/blog/fundamentos-redes'
    },
    {
      id: 2,
      title: 'Resolución CTF: SEDITION - The Hacker Labs',
      excerpt: 'Análisis detallado y guía paso a paso para resolver la máquina SEDITION de The Hacker Labs, cubriendo técnicas de explotación, escalada de privilegios y hardening del sistema.',
      image: blog2,
      date: '1 de Septiembre, 2023',
      author: 'Marco Fernández',
      readTime: '15 min de lectura',
      tags: ['CTF', 'Hacking', 'The Hacker Labs', 'Walkthrough', 'Pentesting'],
      url: '/blog/ctf-sedition-thehackerlabs'
    },
    {
      id: 3,
      title: 'Herramientas Esenciales para Pentesting',
      excerpt: 'Descubre las herramientas más utilizadas en pruebas de penetración y cómo pueden ayudarte a identificar vulnerabilidades en sistemas informáticos.',
      image: blog3,
      date: '20 de Septiembre, 2023',
      author: 'Marco Fernández',
      readTime: '10 min de lectura',
      tags: ['Pentesting', 'Herramientas', 'Seguridad'],
      url: '/blog/herramientas-pentesting'
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
    hidden: { y: 20, opacity: 0 },
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
    // Usar un SVG en línea como placeholder
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZjlmYSIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iI2FhYSI+SW1hZ2VuIG5vIGRpc3BvbmlibGU8L3RleHQ+Cjwvc3ZnPg==';
    e.target.style.objectFit = 'contain';
    e.target.style.padding = '20px';
    e.target.style.backgroundColor = '#f8f9fa';
  };

  return (
    <section id="blog" className="blog-section" data-testid="blog-section">
      <div className="blog-container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Blog
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Artículos y tutoriales sobre ciberseguridad, desarrollo y tecnología
        </motion.p>
        
        <motion.div 
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {blogPosts.map((post) => (
            <motion.article 
              key={post.id} 
              className="blog-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="blog-image">
                <img 
                  src={post.image} 
                  alt={post.title}
                  onError={handleImageError}
                />
              </div>
              
              <div className="blog-content">
                <div className="blog-date">
                  <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px' }} />
                  {post.date}
                </div>
                
                <h3 className="blog-title">{post.title}</h3>
                
                <p className="blog-excerpt">{post.excerpt}</p>
                
                <div className="blog-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="blog-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="blog-meta">
                  <span>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
                    {post.author}
                  </span>
                  
                  <a href={post.url} className="read-more">
                    Leer más
                    <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
      
      <div className="blog-bg"></div>
    </section>
  );
};

export default Blog;
