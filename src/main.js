import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/style/global.scss'

Vue.config.productionTip = false
// import {elementMoveIn, elementMoveOut} from "./utils/animation.mjs";
import Globle from "./utils/Globle.mjs";
Vue.prototype.$Globle = Globle;

import animationInOut from "./utils/animation.mjs";
Vue.prototype.animationInOut = animationInOut;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
