import { createApp } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource/fira-code/400.css'
import './styles/tokens.css'
import './styles/themes.css'
import './styles/global.css'
import './styles/animations.css'
import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'
import { tilt } from './directives/tilt'

createApp(App).use(router).directive('reveal', reveal).directive('tilt', tilt).mount('#app')
