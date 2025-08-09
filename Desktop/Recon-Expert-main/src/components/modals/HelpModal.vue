<template>
  <div class="modal" v-if="isOpen" @click.self="close">
    <div class="modal-content">
      <button class="close" @click="close">&times;</button>
      <h2><i class="fas fa-question-circle"></i> Guía de Uso - Constructor de Consultas</h2>
      <div class="modal-body">
        <h3>¿Cómo usar el Constructor de Consultas?</h3>
        <p>El Constructor de Consultas te permite crear búsquedas avanzadas de manera sencilla utilizando operadores específicos.</p>
        
        <h3>Uso de Operadores</h3>
        <p>Haz clic en cualquiera de los botones de operadores para insertarlos en tu búsqueda:</p>
        
        <div class="operator-examples">
          <div class="operator-example">
            <code>filetype:</code>
            <p>Busca un tipo específico de archivo. Ejemplo: <code>filetype:pdf</code> para documentos PDF</p>
          </div>
          
          <div class="operator-example">
            <code>site:</code>
            <p>Busca dentro de un sitio web específico. Ejemplo: <code>site:ejemplo.com</code></p>
          </div>
          
          <div class="operator-example">
            <code>inurl:</code>
            <p>Busca términos en la URL. Ejemplo: <code>inurl:admin</code></p>
          </div>
          
          <div class="operator-example">
            <code>intitle:</code>
            <p>Busca términos en el título de la página. Ejemplo: <code>intitle:login</code></p>
          </div>
          
          <div class="operator-example">
            <code>ext:</code>
            <p>Busca por extensión de archivo. Ejemplo: <code>ext:sql</code></p>
          </div>
        </div>

        <h3>Consejos para Búsquedas Efectivas</h3>
        <ul>
          <li>Combina múltiples operadores para refinar tus búsquedas</li>
          <li>Usa comillas para buscar frases exactas: <code>"palabras exactas"</code></li>
          <li>Excluye términos con guión: <code>-palabra</code></li>
          <li>Usa comodines: <code>admin*</code> encontrará admin, administrator, administration, etc.</li>
        </ul>

        <h3>Ejemplos Prácticos</h3>
        <div class="search-examples">
          <div class="search-example">
            <h4>Buscar documentos confidenciales</h4>
            <code>filetype:pdf contraseña OR password</code>
          </div>
          
          <div class="search-example">
            <h4>Encontrar paneles de administración</h4>
            <code>inurl:admin | inurl:login intitle:"admin"</code>
          </div>
          
          <div class="search-example">
            <h4>Buscar en un dominio específico</h4>
            <code>site:ejemplo.com "palabra clave"</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

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

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    close();
  }
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

.modal h2, h3 {
  color: var(--color-primary);
  margin-top: 0;
}

p, li {
  color: var(--text-primary);
}

code {
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: monospace;
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

.modal-body {
  padding: 1.5rem;
}

.operator-examples {
  margin: 1.5rem 0;
}

.modal p {
  margin: 0 0 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.modal ul {
  margin: 0.5rem 0 1.5rem;
  padding-left: 1.5rem;
}

.modal li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.modal code {
  font-family: 'JetBrains Mono', monospace, monospace;
  background-color: var(--bg-secondary);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  color: var(--color-primary);
  border: 1px solid var(--border-color);
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
}
</style>
