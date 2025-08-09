<template>
  <section class="examples">
    <h2><i class="fas fa-lightbulb"></i> Ejemplos de Búsqueda</h2>
    <p>Haz clic en cualquiera de estos ejemplos para probarlos:</p>
    
    <div class="example-cards">
      <div 
        v-for="(example, index) in examples" 
        :key="index"
        class="example-card"
        @click="useExample(example.query)"
      >
        <h3>{{ example.title }}</h3>
        <p>{{ example.description }}</p>
        <div class="example-query">{{ example.query }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['use-example']);

const examples = ref([
  {
    title: 'Documentos con contraseñas',
    description: 'Encuentra documentos PDF que puedan contener contraseñas.',
    query: 'filetype:pdf inurl:contraseña OR password'
  },
  {
    title: 'Archivos de configuración',
    description: 'Busca archivos de configuración expuestos en directorios web.',
    query: 'intitle:"index of" ".env" | ".htaccess"'
  },
  {
    title: 'Paneles phpMyAdmin',
    description: 'Localiza paneles de administración de bases de datos MySQL.',
    query: 'inurl:phpmyadmin intitle:phpMyAdmin'
  },
  {
    title: 'Paneles de WordPress',
    description: 'Encuentra paneles de administración de WordPress.',
    query: 'inurl:wp-login.php | inurl:wp-admin'
  },
  {
    title: 'Páginas de inicio de sesión',
    description: 'Localiza formularios de inicio de sesión en sitios web.',
    query: 'intitle:"login" | intitle:"sign in" | inurl:login | inurl:signin'
  },
  {
    title: 'Listados de directorios',
    description: 'Encuentra directorios con listado de archivos habilitado.',
    query: 'intitle:"index of" "parent directory"'
  }
]);

const useExample = (query: string) => {
  emit('use-example', query);
  // Desplazarse suavemente hacia arriba
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style scoped>
.examples {
  margin-top: 2rem;
}

.examples h2 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.examples > p {
  margin-top: 0;
  margin-bottom: 1.25rem;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.example-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
  width: 100%;
}

.example-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.example-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

.example-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--color-primary);
  font-size: 1.125rem;
  font-weight: 600;
}

.example-card p {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  flex-grow: 1;
}

.example-query {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  background: var(--bg-primary);
  padding: 0.75rem;
  border-radius: 0.35rem;
  margin-top: auto;
  overflow-x: auto;
  white-space: pre;
  word-break: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .example-cards {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .examples {
    padding: 0 1rem;
  }
  
  .example-card h3 {
    font-size: 1.1rem;
  }
  
  .example-query {
    font-size: 0.8rem;
    padding: 0.6rem;
  }
}

@media (max-width: 480px) {
  .example-cards {
    grid-template-columns: 1fr;
  }
  
  .example-card {
    padding: 1rem;
  }
  
  .examples h2 {
    font-size: 1.4rem;
  }
}
</style>
