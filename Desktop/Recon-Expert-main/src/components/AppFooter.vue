<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <button class="footer-link" @click="showHelp = true">
          <i class="fas fa-question-circle"></i> Ayuda
        </button>
        <button class="footer-link" @click="showPrivacy = true">
          <i class="fas fa-shield-alt"></i> Política de Privacidad
        </button>
      </div>
      
      <!-- Tarjeta de Ayuda -->
      <AnnouncementCard :is-open="showHelp" @close="showHelp = false">
        <h3><i class="fas fa-info-circle"></i> Cómo usar Recon-Expert</h3>
        
        <div class="help-section">
          <h4>1. Operadores de Búsqueda</h4>
          <p>Utiliza los botones de operadores para añadir búsquedas avanzadas:</p>
          <ul>
            <li><strong>filetype:</strong> Busca tipos específicos de archivos (ej: pdf, doc, xls)</li>
            <li><strong>site:</strong> Busca dentro de un sitio web específico</li>
            <li><strong>inurl:</strong> Busca palabras en la URL</li>
            <li><strong>intitle:</strong> Busca palabras en el título de la página</li>
            <li><strong>ext:</strong> Busca por extensión de archivo</li>
          </ul>
        </div>

        <div class="help-section">
          <h4>2. Ejemplos de Búsquedas</h4>
          <div class="example">
            <p>Buscar documentos PDF con contraseñas:</p>
            <code>filetype:pdf contraseña OR password</code>
          </div>
          <div class="example">
            <p>Buscar paneles de administración:</p>
            <code>inurl:admin | inurl:login intitle:"admin"</code>
          </div>
        </div>
        
        <div class="help-section">
          <h4>3. Consejos</h4>
          <ul>
            <li>Usa comillas para buscar frases exactas</li>
            <li>Combina múltiples operadores para búsquedas más precisas</li>
            <li>Usa paréntesis para agrupar condiciones</li>
            <li>El signo menos (-) excluye términos de la búsqueda</li>
          </ul>
        </div>
        
        <div class="help-note">
          <p><i class="fas fa-exclamation-triangle"></i> <strong>Importante:</strong> Utiliza esta herramienta de manera ética y legal.</p>
        </div>
      </AnnouncementCard>
      
      <!-- Tarjeta de Política de Privacidad -->
      <AnnouncementCard :is-open="showPrivacy" @close="showPrivacy = false">
        <h3><i class="fas fa-shield-alt"></i> Política de Privacidad</h3>
        
        <div class="privacy-section">
          <h4>1. Información que Recopilamos</h4>
          <p>No recopilamos ni almacenamos información personal identificable. Las búsquedas se procesan de forma anónima y no se asocian con tu identidad.</p>
        </div>
        
        <div class="privacy-section">
          <h4>2. Uso de la Información</h4>
          <p>Tus búsquedas se utilizan únicamente para generar las consultas de Google Dorking y no se comparten con terceros.</p>
        </div>
        
        <div class="privacy-section">
          <h4>3. Cookies y Tecnologías Similares</h4>
          <p>Esta aplicación solo utiliza cookies esenciales para su funcionamiento básico. No utilizamos cookies de seguimiento ni de terceros.</p>
        </div>
        
        <div class="privacy-section">
          <h4>4. Seguridad</h4>
          <p>Implementamos medidas de seguridad para proteger la información de tus búsquedas, aunque recuerda que las búsquedas en Google son públicas.</p>
        </div>
        
        <div class="privacy-section">
          <h4>5. Cambios en la Política</h4>
          <p>Podemos actualizar esta política ocasionalmente. Te notificaremos de cualquier cambio importante.</p>
        </div>
      </AnnouncementCard>
      
      <div class="footer-main">
        <div class="footer-contact">
          <div class="contact-methods">
            <a 
              href="https://www.linkedin.com/in/marco-valentin-fernandez-741222352/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="contact-link" 
              title="Ver perfil de LinkedIn"
            >
              <i class="fab fa-linkedin"></i> LinkedIn
            </a>
            <a 
              href="https://github.com/valenfd3z" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="contact-link" 
              title="Ver perfil de GitHub"
            >
              <i class="fab fa-github"></i> GitHub
            </a>
            <a 
              href="mailto:fernandezmarcovalentin@gmail.com" 
              class="contact-link"
              title="Enviar correo electrónico"
            >
              <i class="fas fa-envelope"></i>
              <span>fernandezmarcovalentin@gmail.com</span>
            </a>
          </div>
        </div>

        <div class="footer-about">
          <h4>Acerca de</h4>
          <p>Recon-Expert es una herramienta para crear consultas avanzadas de búsqueda en Google de manera sencilla y eficiente.</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-copyright">
          &copy; {{ currentYear }} Asistente de Google Dorking. Todos los derechos reservados.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AnnouncementCard from '@/components/ui/AnnouncementCard.vue';

const showHelp = ref(false);
const showPrivacy = ref(false);
const currentYear = computed(() => new Date().getFullYear());

defineExpose({
  showHelp,
  showPrivacy,
  currentYear
});
</script>

<style scoped>
.footer {
  background-color: #1a1a2e;
  color: #e6e6e6;
  padding: 3rem 0 0;
  margin-top: 3rem;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.footer-copyright {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* Help section styles */
.help-section {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.help-section h4 {
  color: var(--color-primary);
  margin: 1.5rem 0 0.75rem;
  font-size: 1.1rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.help-section ul {
  padding-left: 1.25rem;
  margin: 0.75rem 0;
}

.help-section li {
  margin-bottom: 0.5rem;
}

.example {
  background-color: var(--bg-secondary);
  border-left: 3px solid var(--color-primary);
  padding: 0.75rem 1rem;
  margin: 0.75rem 0;
  border-radius: 0 0.25rem 0.25rem 0;
  font-family: monospace;
  overflow-x: auto;
}

.example p {
  margin: 0 0 0.5rem;
  color: var(--text-primary);
  font-family: inherit;
}

.help-note {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 0 4px 4px 0;
}

.help-note p {
  margin: 0;
  color: #856404;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.help-note i {
  color: #856404;
}

/* Estilos para la sección de privacidad */
.privacy-section {
  margin-bottom: 1.5rem;
}

.privacy-section h4 {
  color: var(--color-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.privacy-section p {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.footer-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-bottom: 2.5rem;
  padding: 0 1.5rem;
  max-width: 1200px;
  margin: 0 auto 2.5rem;
  width: 100%;
}

.footer-contact h4,
.footer-about h4 {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-contact h4::after,
.footer-about h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background-color: var(--color-primary);
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e6e6e6;
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 0.5rem 0;
  border-radius: 0.25rem;
}

.contact-link:hover {
  color: var(--color-primary);
}

.contact-link i {
  width: 20px;
  text-align: center;
}

.email-button {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  padding: 0.5rem 0.5rem 0.5rem 0;
}

.footer-about p {
  line-height: 1.6;
  color: #b3b3b3;
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1rem 1.5rem;
  background-color: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-bottom {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1.25rem 1.5rem;
  text-align: center;
}

.footer-link {
  background: none;
  border: none;
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-weight: 500;
}

.footer-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.footer-link:active {
  transform: translateY(0);
}

.footer-contact {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.social-link {
  color: var(--text-secondary);
  font-size: 1.25rem;
  transition: color 0.2s;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.social-link:hover {
  color: var(--color-primary);
  transform: translateY(-2px);
}

.footer-copyright {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  opacity: 0.8;
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-about {
    order: 2;
  }
  
  .footer-contact {
    order: 1;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }
  
  .footer-link {
    width: 100%;
    justify-content: center;
    padding: 0.75rem 1rem;
  }
  
  .footer-content {
    padding: 0 1rem;
    gap: 1.5rem;
  }
  
  .footer {
    padding: 2rem 0 0;
  }
  
  .footer-main {
    padding: 0;
    margin-bottom: 1.5rem;
  }
  
  .footer-bottom {
    padding: 1rem;
  }
  
  .contact-methods {
    gap: 0.5rem;
  }
  
  .contact-link {
    font-size: 0.95rem;
  }
  
  .footer-about p {
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

@media (max-width: 640px) {
  .footer-links {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .footer-link {
    justify-content: center;
  }
  
  .social-link {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1.1rem;
  }
}
</style>
