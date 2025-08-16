import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faPaperPlane,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Si ya está enviando, no hacer nada
    if (formStatus.submitting) return;
    
    try {
      // Estado de "enviando..."
      setFormStatus({ 
        submitting: true, 
        submitted: false, 
        error: null 
      });
      
      // Simulamos el envío del formulario (1.5 segundos)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Éxito - Limpiamos el formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Mostramos mensaje de éxito
      setFormStatus({ 
        submitting: false, 
        submitted: true, 
        error: null 
      });
      
      // No usaremos setTimeout para reiniciar, lo haremos con un botón
      
    } catch (error) {
      // En caso de error
      setFormStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.' 
      });
    }
  };

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
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

  return (
    <section id="contact" className="contact-section" data-testid="contact-section">
      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="contact-title">Contáctame</h2>
          <p className="contact-subtitle">
            ¿Tienes alguna pregunta o quieres trabajar juntos en un proyecto? 
            No dudes en contactarme a través del formulario o cualquiera de mis redes sociales.
          </p>
          
          <motion.div 
            className="contact-methods"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="contact-method"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="contact-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="contact-details">
                <h4>Correo Electrónico</h4>
                <a href="mailto:fernandezmarcovalentin@gmail.com">fernandezmarcovalentin@gmail.com</a>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-method"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="contact-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div className="contact-details">
                <h4>Ubicación</h4>
                <p>Buenos Aires, Argentina</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-method"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="contact-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="contact-details">
                <h4>Teléfono</h4>
                <a href="tel:+541159408162">+54 11 5940-8162</a>
              </div>
            </motion.div>
            
            <motion.div 
              className="social-links"
              variants={itemVariants}
              style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center',
                marginTop: '1.5rem'
              }}
            >
              <a 
                href="https://github.com/valenfd3z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a 
                href="https://linkedin.com/in/valenfd3z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>

            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="contact-form-container"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={formStatus.submitting || formStatus.submitted}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={formStatus.submitting || formStatus.submitted}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={formStatus.submitting || formStatus.submitted}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={formStatus.submitting || formStatus.submitted}
              ></textarea>
            </div>
            
            {formStatus.error && (
              <div className="error-message" style={{ color: '#ff4d4f', marginBottom: '1rem' }}>
                {formStatus.error}
              </div>
            )}
            
            {!formStatus.submitted ? (
              <button 
                type="submit" 
                className="submit-btn"
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  'Enviando...'
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Enviar Mensaje
                  </>
                )}
              </button>
            ) : (
              <div className="form-success">
                <div className="success-message">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>¡Mensaje enviado con éxito!</span>
                </div>
                <button 
                  type="button" 
                  className="submit-btn new-message-btn"
                  onClick={() => {
                    setFormStatus({ 
                      submitting: false, 
                      submitted: false, 
                      error: null 
                    });
                  }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
      
      <div className="contact-bg"></div>
    </section>
  );
};

export default Contact;
