import { createApp } from 'vue'
import 'element-plus/dist/index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App.vue'
import ElementPlue from 'element-plus'
import router from './router'
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(ElementPlue);
app.use(router);
app.use(pinia);
app.mount('#app');


