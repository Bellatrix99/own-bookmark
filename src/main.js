import Vue from 'vue'
import App from './App.vue'
import router from './router'
import animate from 'animate.css'
import '@/style/global.scss'
import Globle from "./utils/Globle.js";
import '../node_modules/modern-normalize/modern-normalize.css';

Vue.use(animate)

Vue.config.productionTip = false
Vue.prototype.$Globle = Globle;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
