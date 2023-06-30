import './assets/main.css'

import { createApp, markRaw, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'


const app = createApp(App)
const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router);
})
app.use(pinia)
app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_CLIENT_ID
})
app.use(router)

app.mount('#app')
