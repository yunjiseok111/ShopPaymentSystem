import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import Success from '@/views/payment/Success.vue';
import Fail from '@/views/payment/Fail.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/payment/success', component: Success },
  { path: '/payment/fail', component: Fail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
