<template>
  <div class="operator-sections">
    <!-- Búsqueda Básica -->
    <div class="operator-section">
      <h3><i class="fas fa-search"></i> Búsqueda Básica</h3>
      <div class="operator-tags">
        <button 
          v-for="op in basicOperators" 
          :key="op.operator"
          class="operator-tag" 
          @click="addOperator(op.operator, op.description)"
          :title="op.description"
        >
          <i :class="op.icon"></i> <span>{{ op.label }}</span>
        </button>
      </div>
    </div>

    <!-- Filtros Avanzados -->
    <div class="operator-section">
      <h3><i class="fas fa-filter"></i> Filtros Avanzados</h3>
      <div class="operator-tags">
        <button 
          v-for="op in advancedOperators" 
          :key="op.operator"
          class="operator-tag" 
          @click="addOperator(op.operator, op.description)"
          :title="op.description"
        >
          <i :class="op.icon"></i> <span>{{ op.operator }}</span>
        </button>
      </div>
    </div>

    <!-- Operadores Técnicos -->
    <div class="operator-section">
      <h3><i class="fas fa-code"></i> Operadores Técnicos</h3>
      <div class="operator-tags">
        <button 
          v-for="op in techOperators" 
          :key="op.operator"
          class="operator-tag" 
          @click="addOperator(op.operator, op.description)"
          :title="op.description"
        >
          <i :class="op.icon"></i> <span>{{ op.operator }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['add-operator']);

const basicOperators = [
  { 
    operator: 'AND', 
    label: 'Y', 
    description: 'Todas estas palabras (Y lógico)',
    icon: 'fas fa-plus' 
  },
  { 
    operator: 'OR', 
    label: 'O', 
    description: 'Cualquiera de estas palabras (O lógico)',
    icon: 'fas fa-slash' 
  },
  { 
    operator: '-', 
    label: 'NO', 
    description: 'Excluir palabras',
    icon: 'fas fa-minus' 
  },
  { 
    operator: '""', 
    label: '""', 
    description: 'Frase exacta',
    icon: 'fas fa-quote-right' 
  },
  { 
    operator: '()', 
    label: '( )', 
    description: 'Agrupar términos',
    icon: 'fas fa-code-branch' 
  }
];

const advancedOperators = [
  { 
    operator: 'site:', 
    description: 'Buscar solo en un sitio web específico',
    icon: 'fas fa-globe' 
  },
  { 
    operator: 'filetype:', 
    description: 'Buscar un tipo específico de archivo',
    icon: 'fas fa-file' 
  },
  { 
    operator: 'intitle:', 
    description: 'Buscar términos en el título de la página',
    icon: 'fas fa-heading' 
  },
  { 
    operator: 'inurl:', 
    description: 'Buscar términos en la URL de la página',
    icon: 'fas fa-link' 
  },
  { 
    operator: 'intext:', 
    description: 'Buscar términos en el contenido de la página',
    icon: 'fas fa-font' 
  },
  { 
    operator: 'cache:', 
    description: 'Mostrar la versión en caché de una página',
    icon: 'fas fa-database' 
  }
];

const techOperators = [
  { 
    operator: 'ext:', 
    description: 'Buscar por extensión de archivo',
    icon: 'fas fa-file-export' 
  },
  { 
    operator: 'inurl:admin', 
    description: 'Buscar páginas de administración',
    icon: 'fas fa-user-shield' 
  },
  { 
    operator: 'intitle:"index of"', 
    description: 'Buscar listados de directorios',
    icon: 'fas fa-folder-open' 
  },
  { 
    operator: 'inurl:login', 
    description: 'Buscar páginas de inicio de sesión',
    icon: 'fas fa-sign-in-alt' 
  }
];

const addOperator = (operator: string, description: string) => {
  emit('add-operator', { operator, description });
};
</script>

<style scoped>
.operator-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.operator-section {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.operator-section h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.operator-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.operator-tag {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-family: 'JetBrains Mono', monospace, monospace;
  font-size: 0.8125rem;
  color: var(--text-primary);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s;
}

.operator-tag:hover {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: translateY(-1px);
}

.operator-tag i {
  font-size: 0.75em;
}

@media (max-width: 768px) {
  .operator-section {
    padding: 1rem;
  }
  
  .operator-tag {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
