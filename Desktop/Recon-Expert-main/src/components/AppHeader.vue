<template>
  <header class="encabezado">
    <div class="contenido-encabezado">
      <div class="contenedor-logo">
        <img src="/lupa-logo.svg" alt="Logo de Recon Expert" class="logo" style="width: 40px; height: 40px;">
      </div>
      <div class="texto-encabezado">
        <h1 class="titulo-app">RECON-EXPERT</h1>
        <h2 class="subtitulo">Asistente de Google Dorking</h2>
        <p class="descripcion">Crea consultas avanzadas de búsqueda en Google con facilidad</p>
      </div>
    </div>

    <!-- Tarjeta de ayuda -->
    <TarjetaAnuncio :esta-abierto="mostrarAyuda" @cerrar="mostrarAyuda = false">
      <h3><i class="fas fa-info-circle"></i> Cómo usar Recon-Expert</h3>
      
      <div class="seccion-ayuda">
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

      <div class="seccion-ayuda">
        <h4>2. Ejemplos de Búsquedas</h4>
        <div class="ejemplo">
          <p>Buscar documentos PDF con contraseñas:</p>
          <code>filetype:pdf contraseña OR password</code>
        </div>
        <div class="ejemplo">
          <p>Buscar paneles de administración:</p>
          <code>inurl:admin | inurl:login intitle:"admin"</code>
        </div>
        <div class="ejemplo">
          <p>Buscar en un dominio específico:</p>
          <code>site:ejemplo.com "palabra clave"</code>
        </div>
      </div>

      <div class="seccion-ayuda">
        <h4>3. Consejos Rápidos</h4>
        <ul>
          <li>Usa comillas para búsquedas exactas: <code>"texto exacto"</code></li>
          <li>Excluye términos con guión: <code>-palabra</code></li>
          <li>Usa OR para buscar múltiples términos: <code>usuario OR admin</code></li>
          <li>Usa comodines: <code>admin*</code> (encuentra admin, administrator, etc.)</li>
        </ul>
      </div>
    </TarjetaAnuncio>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TarjetaAnuncio from '@/components/ui/AnnouncementCard.vue';

// Estado para controlar la visibilidad de la ayuda
const mostrarAyuda = ref(false);

// Definir los eventos que emite el componente
defineEmits(['mostrar-privacidad']);
</script>

<style scoped>
.encabezado {
  background-color: #1a1a2e !important;
  color: white !important;
  padding: 1.5rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

/* Forzar colores del texto en el encabezado */
.encabezado .subtitulo,
.encabezado .descripcion {
  color: white !important;
}

/* Asegurar que el contenedor del logo mantenga su fondo blanco */
.contenedor-logo {
  background-color: white !important;
}

.contenido-encabezado {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1rem;
}

.contenedor-logo {
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  flex-shrink: 0;
}

.logo {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.texto-encabezado {
  flex: 1;
}

.titulo-app {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #4f46e5, #9333ea);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}

.subtitulo {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0.3rem 0 0.5rem;
  color: #e0e0e0;
}

.descripcion {
  margin: 0;
  font-size: 0.95rem;
  color: #a5b4fc;
  max-width: 600px;
}

/* Estilos para la tarjeta de ayuda */
.seccion-ayuda {
  margin-bottom: 1.5rem;
}

.seccion-ayuda h4 {
  color: var(--texto-primario);
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.seccion-ayuda p {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.seccion-ayuda ul {
  margin: 0.5rem 0 1rem 1.25rem;
  padding-left: 1rem;
}

.seccion-ayuda li {
  margin-bottom: 0.25rem;
  line-height: 1.5;
}

.ejemplo {
  background-color: var(--fondo-secundario);
  border-left: 3px solid var(--color-primario);
  padding: 0.75rem 1rem;
  margin: 0.75rem 0;
  border-radius: 0 4px 4px 0;
}

.ejemplo p {
  margin: 0 0 0.5rem 0;
  color: var(--texto-secundario);
  font-size: 0.9rem;
}

code {
  font-family: 'JetBrains Mono', monospace;
  background-color: var(--fondo-primario);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.85em;
  color: var(--color-primario);
  word-break: break-word;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .contenido-encabezado {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .contenedor-logo {
    width: 70px;
    height: 70px;
    margin: 0 auto;
  }
  
  .app-title {
    font-size: 1.5rem;
  }
  
  .subtitle {
    font-size: 1.125rem;
  }
  
  .header-actions {
    position: static;
    justify-content: center;
    margin-top: 1rem;
  }
  
  .header-button span {
    display: none;
  }
  
  .help-card-content {
    padding: 1rem;
  }
  
  .help-section {
    margin-bottom: 1.25rem;
  }
}
</style>
