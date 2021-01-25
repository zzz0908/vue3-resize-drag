import { createApp } from 'vue'
import App from './App.vue'
import vue3ResizeDrag from '../vue3-resize-drag'
const app = createApp(App)
app.use(vue3ResizeDrag)
app.mount('#app')
