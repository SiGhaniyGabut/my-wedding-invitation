import './assets/main.css'
import 'viewerjs/dist/viewer.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Lottie from 'vue3-lottie'
import VueViewer from 'v-viewer'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(Vue3Lottie, { name: 'LottieAnimation' })
app.use(VueViewer)

app.mount('#app')
