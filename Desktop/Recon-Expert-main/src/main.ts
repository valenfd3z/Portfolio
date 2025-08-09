import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './main.css'

// Inicializar la aplicación
const app = createApp(App)

// Configurar Pinia
const pinia = createPinia()
app.use(pinia)

// Montar la aplicación
app.mount('#app')
