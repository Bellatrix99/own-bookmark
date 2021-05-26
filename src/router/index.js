import Vue from 'vue'
import VueRouter from 'vue-router'
import PopUpPage from "@/views/PopUpPage";
import ManagePage from "@/views/ManagePage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PopUpPage',
    component: PopUpPage
  },
  {
    path: '/manage',
    name: 'ManagePage',
    component: ManagePage
  }
]

const router = new VueRouter({
  routes
})

export default router
