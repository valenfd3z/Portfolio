import { defineStore } from 'pinia';

type Tema = 'claro' | 'oscuro';

export const useTemaStore = defineStore('tema', {
  state: () => ({
    tema: 'claro' as Tema
  }),

  actions: {
    /**
     * Inicializa el tema desde localStorage o usa el tema predeterminado
     */
    inicializarTema() {
      const temaGuardado = localStorage.getItem('tema') || 'claro';
      this.establecerTema(temaGuardado as Tema);
    },
    
    /**
     * Establece el tema actual
     * @param tema - El tema a establecer ('claro' u 'oscuro')
     */
    establecerTema(tema: Tema) {
      this.tema = tema;
      document.documentElement.setAttribute('data-theme', tema);
      localStorage.setItem('tema', tema);
    },
    
    /**
     * Alterna entre temas claro y oscuro
     */
    alternarTema() {
      const nuevoTema = this.tema === 'claro' ? 'oscuro' : 'claro';
      this.establecerTema(nuevoTema);
    }
  },
  
  getters: {
    /**
     * Devuelve el tema actual
     */
    obtenerTemaActual: (state) => state.tema,
    
    /**
     * Devuelve si el tema actual es oscuro
     */
    esOscuro: (state) => state.tema === 'oscuro'
  }
});
