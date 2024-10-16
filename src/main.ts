import { createApp } from 'vue'
import 'element-plus/dist/index.css'; 
import App from './App.vue'
import ElementPlue from 'element-plus'
import router from './router'


const app = createApp(App);
app.use(ElementPlue);
app.use(router);
app.mount('#app');


