/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import '@/assets/scss/main.scss'

// Composables
import { createApp } from 'vue'

// Directives
import { singleLetter } from '@/plugins/directives'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.directive('single-letter', singleLetter)

app.mount('#app')
