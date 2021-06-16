import Vue from 'vue'
import App from './App.vue'
import router from './router'
import animate from 'animate.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/style/global.scss'
import "./utils/Globle.js";
import vuetify from './plugins/vuetify'

Vue.use(Antd);
Vue.use(animate)

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
