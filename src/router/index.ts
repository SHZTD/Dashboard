import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Bizdash from '@/views/biz/bizdash.vue';
import Devdash from '@/views/dev/devdash.vue';
import kpi from '@/views/kpi/kpi.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/biz',
    name: 'Biz',
    component: Bizdash
  },
  {
    path: '/dev',
    name: 'Dev',
    component: Devdash
  },
  {
    path: '/kpi',
    name: 'Kpi',
    component: kpi
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;