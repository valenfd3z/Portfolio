<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useTemaStore } from '@/stores/theme';
import AppHeader from '@/components/AppHeader.vue';
import SearchBuilder from '@/components/search/SearchBuilder.vue';
import AppFooter from '@/components/AppFooter.vue';
import HelpModal from '@/components/modals/HelpModal.vue';
import PrivacyModal from '@/components/modals/PrivacyModal.vue';

export default defineComponent({
  name: 'Aplicacion',
  components: {
    AppHeader,
    SearchBuilder,
    AppFooter,
    HelpModal,
    PrivacyModal
  },
  setup() {
    // Estado de los modales
    const mostrarModalAyuda = ref(false);
    const mostrarModalPrivacidad = ref(false);

    // Usar el store de tema
    const tiendaTema = useTemaStore();

    // Inicializar tema al cargar
    onMounted(() => {
      tiendaTema.inicializarTema();
    });

    return {
      mostrarModalAyuda,
      mostrarModalPrivacidad,
      tiendaTema
    };
  }
});
</script>

<template>
  <div class="app-container">
    <AppHeader />
    
    <main class="main-content">
      <SearchBuilder />
    </main>
    
    <AppFooter 
      @show-help="mostrarModalAyuda = true"
      @show-privacy="mostrarModalPrivacidad = true"
    />
    
    <button 
      id="cambiar-tema" 
      class="boton-tema" 
      @click="tiendaTema.alternarTema"
      :aria-label="tiendaTema.tema === 'oscuro' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
      :title="tiendaTema.tema === 'oscuro' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
    >
      <i :class="['fas', tiendaTema.tema === 'oscuro' ? 'fa-sun' : 'fa-moon']"></i>
      <span class="solo-lectura">Cambiar tema</span>
    </button>
    
    <!-- Modales -->
    <HelpModal v-if="mostrarModalAyuda" @close="mostrarModalAyuda = false" />
    <PrivacyModal v-if="mostrarModalPrivacidad" @close="mostrarModalPrivacidad = false" />
  </div>
</template>

<style>
:root {
  /* Colores base */
  --color-primario: #2563eb;
  --color-secundario: #4b5563;
  --color-exito: #10b981;
  --color-advertencia: #f59e0b;
  --color-peligro: #ef4444;
  --color-claro: #f9fafb;
  --color-oscuro: #1f2937;
  
  /* Tema claro (por defecto) */
  --fondo-primario: #ffffff;
  --fondo-secundario: #f3f4f6;
  --texto-primario: #111827;
  --texto-secundario: #4b5563;
  --color-borde: #e5e7eb;
}

/* Tema oscuro */
[data-theme="oscuro"] {
  --fondo-primario: #1a1a1a;
  --fondo-secundario: #2d2d2d;
  --texto-primario: #f3f4f6;
  --texto-secundario: #9ca3af;
  --color-borde: #374151;
}

[data-theme="oscuro"] .encabezado {
  background-color: #0f0f1a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

[data-theme="oscuro"] .subtitulo {
  color: #d1d5db;
}

[data-theme="oscuro"] .descripcion {
  color: #9ca3af;
}

[data-theme="oscuro"] .contenedor-logo {
  background-color: #2d2d2d;
}

/* Estilos base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--fondo-primario);
  color: var(--texto-primario);
  line-height: 1.5;
  transition: background-color 0.3s, color 0.3s;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.boton-tema {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-primario);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  z-index: 50;
}

.boton-tema:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.boton-tema:active {
  transform: translateY(0);
}

.solo-lectura {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Estilos para los modales */
.capa-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.contenido-modal {
  background-color: var(--fondo-primario);
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
}

.cerrar-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--texto-secundario);
}

.cerrar-modal:hover {
  color: var(--color-primario);
}

/* Transiciones */
.desvanecer-entrada-activo,
.desvanecer-salida-activo {
  transition: opacity 0.2s ease;
}

.desvanecer-entrada,
.desvanecer-salida-a {
  opacity: 0;
}

.deslizar-entrada-activo,
.deslizar-salida-activo {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.deslizar-entrada,
.deslizar-salida-a {
  opacity: 0;
  transform: translateY(20px);
}
</style>
