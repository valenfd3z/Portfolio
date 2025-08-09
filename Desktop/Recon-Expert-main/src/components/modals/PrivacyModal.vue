<template>
  <div class="modal" v-if="isOpen" @click.self="close">
    <div class="modal-content">
      <button class="close" @click="close">&times;</button>
      <h2><i class="fas fa-shield-alt"></i> Política de Privacidad y Términos de Uso</h2>
      <div class="modal-body">
        <div class="privacy-section">
          <h3>1. Descargo de Responsabilidad</h3>
          <p>Esta herramienta está diseñada exclusivamente para fines educativos, de investigación en seguridad informática y pruebas de penetración autorizadas. El mal uso de esta herramienta puede violar leyes de privacidad y seguridad cibernética.</p>
        </div>
        
        <div class="privacy-section">
          <h3>2. Uso Aceptable</h3>
          <p>Al utilizar esta herramienta, aceptas:</p>
          <ul>
            <li>Utilizarla solo en sistemas sobre los que tengas autorización explícita</li>
            <li>Cumplir con todas las leyes y regulaciones aplicables</li>
            <li>No realizar actividades maliciosas o ilegales</li>
            <li>Obtener el consentimiento adecuado antes de realizar pruebas</li>
          </ul>
        </div>
        
        <div class="privacy-section">
          <h3>3. Privacidad y Datos</h3>
          <p>Esta aplicación respeta tu privacidad:</p>
          <ul>
            <li>No recopilamos ni almacenamos tus búsquedas</li>
            <li>No utilizamos cookies de seguimiento</li>
            <li>No compartimos datos con terceros</li>
            <li>Todas las búsquedas se realizan directamente desde tu navegador</li>
          </ul>
        </div>
        
        <div class="privacy-section">
          <h3>4. Limitación de Responsabilidad</h3>
          <p>Los desarrolladores de esta herramienta no se hacen responsables por:</p>
          <ul>
            <li>El mal uso de la herramienta</li>
            <li>Daños causados por el uso inadecuado</li>
            <li>Consecuencias legales derivadas de actividades no autorizadas</li>
            <li>La exactitud de los resultados de búsqueda</li>
          </ul>
        </div>
        
        <div class="privacy-section">
          <h3>5. Cumplimiento Legal</h3>
          <p>Es tu responsabilidad asegurarte de que el uso de esta herramienta cumpla con todas las leyes y regulaciones aplicables en tu jurisdicción, incluyendo pero no limitado a:</p>
          <ul>
            <li>Leyes de privacidad de datos</li>
            <li>Leyes de seguridad informática</li>
            <li>Regulaciones de protección de la propiedad intelectual</li>
          </ul>
        </div>
        
        <div class="modal-actions">
          <button class="btn btn-primary" @click="close">Entendido</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    close();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-content {
  background: var(--bg-primary);
  color: var(--text-primary);
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid var(--border-color);
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close:hover {
  color: var(--color-danger);
  background-color: var(--bg-secondary);
}

.modal h2, h3 {
  color: var(--color-primary);
  margin-top: 0;
}

p, li {
  color: var(--text-primary);
}

.privacy-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.privacy-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.modal p {
  margin: 0 0 1.5rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .modal h2 {
    font-size: 1.25rem;
    padding: 1.25rem 1rem 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal h3 {
    font-size: 1.125rem;
  }
  
  .modal-actions {
    justify-content: center;
  }
  
  .btn {
    width: 100%;
    padding: 0.625rem 1rem;
  }
}
</style>
