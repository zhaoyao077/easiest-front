import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/theme-chalk/index.css';
import qs from 'qs'
import VueAxios from 'vue-axios'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import moment from 'moment'

// import 'element-plus/lib/theme-chalk/index.css'
const app = createApp(App);
createApp(App).use(VueAxios,axios).use(ElementPlus).use(store).use(router).mount('#app')
app.config.globalProperties.$axios = axios
app.config.globalProperties.$qs=qs
app.config.globalProperties.$moment = moment
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }