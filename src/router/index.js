import Vue from 'vue'
import VueRouter from 'vue-router'
import PopUpPage from "@/views/PopUpPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PopUpPage',
    component: PopUpPage
  },
]

const router = new VueRouter({
  routes
})

export default router
