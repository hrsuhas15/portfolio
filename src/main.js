import { createApp } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource/fira-code/400.css'
import './styles/tokens.css'
import './styles/themes.css'
import './styles/global.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
