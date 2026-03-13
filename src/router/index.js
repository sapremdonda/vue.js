// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const routes = [
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/register', component: () => import('../views/Register.vue') },
  
  { path: '/forgot-password', component: () => import('../views/ForgotPassword.vue') },
  { path: '/reset-password', component: () => import('../views/ResetPassword.vue') },

  { 
    path: '/dashboard', 
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true } 
  },
  { 
    path: '/profile', 
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true } 
  },
  { 
    path: '/settings', 
    component: () => import('../views/Settings.vue'),
    meta: { requiresAuth: true } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route Guard for Protection and Expiration Check
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem('session_token'); // On app load, check LocalStorage for token 
  const expiry = localStorage.getItem('token_expiry');
  const isExpired = expiry ? new Date().getTime() > parseInt(expiry) : true;

  // Check expiration during route navigation 
  if (token && isExpired) {
    authStore.logout(); // If token expired, automatically log out the user 
    return next('/login'); // Redirect user to login page
  }

  // If user is not authenticated, redirect to /login 
  if (to.meta.requiresAuth && (!token || isExpired)) {
    next('/login');
  } else {
    next();
  }
});

export default router;