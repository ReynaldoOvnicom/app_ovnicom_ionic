import { createRouter, createWebHistory} from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../views/Auth/login.vue') },
  { path: '/forgot-password', component: () => import('../views/Auth/forgotPassword.vue') },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/account',
    name: 'Cuenta',
    component: () => import('../views/Account/Account.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/invoices',
    name: 'Facturas',
    component: () => import('../views/Invoices/invoices.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
