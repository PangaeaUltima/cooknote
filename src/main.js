/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
// import axios from 'axios'
import api from '@/plugins/api'
import '@/assets/scss/main.scss'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(api, { api })

registerPlugins(app)

app.mount('#app')
