<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue';
import ExampleQueries from './ExampleQueries.vue';

// Reactive state
const query = ref('');
const copied = ref(false);
const searchUrl = computed(() => 'https://www.google.com/search?q=' + encodeURIComponent(query.value.trim()));

// Methods
const updateSearchPreview = () => {
  // Additional logic if needed
};

const handleExampleQuery = (exampleQuery: string) => {
  query.value = exampleQuery;
  updateSearchPreview();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const onUseExample = (query: string) => {
  handleExampleQuery(query);
};

const addOperator = (operator: string) => {
  const textarea = document.querySelector('.query-input') as HTMLTextAreaElement;
  if (!textarea) return;
  
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const before = text.substring(0, start);
  const after = text.substring(end);
  const selectedText = text.substring(start, end);
  
  let newText = '';
  let newCursorPos = start;
  
  switch (operator) {
    case 'AND':
      newText = before + ' AND ' + after;
      newCursorPos = start + 5;
      break;
    case 'OR':
      newText = before + ' OR ' + after;
      newCursorPos = start + 4;
      break;
    case 'filetype:':
      newText = before + 'filetype:' + after;
      newCursorPos = start + 9;
      break;
    case 'site:':
      newText = before + 'site:' + after;
      newCursorPos = start + 5;
      break;
    case 'intitle:':
      newText = before + 'intitle:"' + selectedText + '" ' + after;
      newCursorPos = start + (selectedText ? selectedText.length + 9 : 9);
      break;
    case 'inurl:':
      newText = before + 'inurl:' + after;
      newCursorPos = start + 6;
      break;
    case 'filetype:':
      newText = before + 'filetype:pdf ' + after;
      newCursorPos = start + 12;
      break;
    case '""':
      newText = before + '"' + selectedText + '"' + after;
      newCursorPos = start + (selectedText ? selectedText.length + 2 : 2);
      break;
    case '()':
      newText = before + '(' + selectedText + ')' + after;
      newCursorPos = start + (selectedText ? selectedText.length + 2 : 2);
      break;
    default:
      newText = before + operator + after;
      newCursorPos = start + operator.length;
  }
  
  query.value = newText;
  updateSearchPreview();
  
  nextTick(() => {
    const newTextarea = document.querySelector('.query-input') as HTMLTextAreaElement;
    if (newTextarea) {
      newTextarea.focus();
      newTextarea.setSelectionRange(newCursorPos, newCursorPos);
    }
  });
};

const search = () => {
  if (query.value.trim()) {
    window.open(searchUrl.value, '_blank');
  }
};

const clearQuery = () => {
  query.value = '';
  updateSearchPreview();};

const copyToClipboard = async () => {
  if (!query.value.trim()) return;
  
  try {
    await navigator.clipboard.writeText(query.value);
    copied.value = true;
    showNotification('¡Consulta copiada al portapapeles!', 'success');
    setTimeout(() => { copied.value = false; }, 2000);
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
    showNotification('Error al copiar al portapapeles', 'error');
  }
};

const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  console.log(`[${type}] ${message}`);
};

// Lifecycle Hooks
onMounted(() => {
  const textarea = document.querySelector('.query-input') as HTMLTextAreaElement;
  if (textarea) textarea.focus();
});
</script>

<template>
  <div class="query-builder">
    <h2><i class="fas fa-magic"></i> Constructor de Consultas</h2>
    <p>Haz clic en los operadores para añadirlos a tu consulta o escribe directamente en el campo de búsqueda.</p>
    
    <div class="quick-search-buttons">
      <h3>Operadores de Búsqueda:</h3>
      <div class="button-group">
        <button class="btn btn-operator" @click="addOperator('filetype:')">
          <i class="fas fa-file"></i> filetype:
        </button>
        <button class="btn btn-operator" @click="addOperator('site:')">
          <i class="fas fa-globe"></i> site:
        </button>
        <button class="btn btn-operator" @click="addOperator('inurl:')">
          <i class="fas fa-link"></i> inurl:
        </button>
        <button class="btn btn-operator" @click="addOperator('intitle:')">
          <i class="fas fa-heading"></i> intitle:
        </button>
        <button class="btn btn-operator" @click="addOperator('ext:')">
          <i class="fas fa-file-code"></i> ext:
        </button>
      </div>
    </div>
    
    <div class="query-input-container">
      <textarea 
        v-model="query"
        class="query-input" 
        placeholder="Ej: contraseña admin filetype:pdf site:ejemplo.com"
        rows="3"
        spellcheck="false"
        @input="updateSearchPreview"
      ></textarea>
    </div>

    <div class="query-actions">
      <button class="btn btn-primary" @click="search">
        <i class="fas fa-search"></i> Buscar en Google
      </button>
      <button class="btn btn-secondary" @click="clearQuery">
        <i class="fas fa-eraser"></i> Limpiar
      </button>
      <button 
        class="btn btn-secondary" 
        :title="copied ? '¡Copiado!' : 'Copiar consulta'"
        @click="copyToClipboard"
      >
        <i :class="['far', copied ? 'fa-check' : 'fa-copy']"></i>
      </button>
    </div>

    <div class="query-preview">
      <p>Vista previa de la búsqueda:</p>
      <div class="preview-link">
        <a :href="searchUrl" target="_blank" rel="noopener noreferrer">
          {{ searchUrl }}
        </a>
      </div>
    </div>
    
    <!-- Add ExampleQueries component -->
    <ExampleQueries @use-example="onUseExample" />
  </div>
</template>



<style scoped>
.quick-search-buttons {
  margin-bottom: 1.5rem;
}

.btn-operator {
  background-color: var(--color-primary);
  color: white;
  border: 1px solid var(--color-primary);
  transition: all 0.2s ease;
  margin: 0.25rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-operator i {
  font-size: 0.9em;
}

/* Light mode */
:root {
  --operator-text-light: #1a56db;
  --operator-bg-light: #ebf5ff;
  --operator-border-light: #d1e9ff;
}

/* Dark mode */
.dark .btn-operator {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Light mode overrides */
:not(.dark) .btn-operator {
  background-color: var(--operator-bg-light);
  color: var(--operator-text-light);
  border-color: var(--operator-border-light);
}

/* Hover and active states */
.btn-operator:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.btn-operator:active {
  transform: translateY(0);
}

.quick-search-buttons h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.btn-search {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-search:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
}

.btn-search:active {
  transform: translateY(0);
}

.btn-search i {
  font-size: 0.9em;
}

.query-builder {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.query-builder h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.query-builder p {
  margin-top: 0;
  margin-bottom: 1.25rem;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.query-input-container {
  margin-bottom: 1.25rem;
}

.query-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-family: 'JetBrains Mono', monospace, monospace;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  resize: vertical;
  min-height: 6rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.query-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.query-actions {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.2s;
  gap: 0.5rem;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--bg-secondary);
}

.query-preview {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 1rem;
  font-size: 0.875rem;
}

.query-preview p {
  margin: 0 0 0.5rem 0;
  color: var(--text-secondary);
  font-size: 0.8125rem;
}

.preview-link {
  word-break: break-all;
}

.preview-link a {
  color: var(--color-primary);
  text-decoration: none;
}

.preview-link a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .query-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    padding: 0.625rem 1rem;
  }
}
</style>
