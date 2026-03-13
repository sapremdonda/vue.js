<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <nav class="bg-white shadow-md p-4">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-600">Vue Auth SaaS</h1>
        
        <div class="space-x-4">
          <template v-if="!authStore.token">
            <router-link to="/login" class="text-gray-600 hover:text-blue-600">Login</router-link>
            <router-link to="/register" class="text-gray-600 hover:text-blue-600">Register</router-link>
          </template>
          
          <template v-else>
            <router-link to="/dashboard" class="text-gray-600 hover:text-blue-600">Dashboard</router-link>
            <router-link to="/profile" class="text-gray-600 hover:text-blue-600">Profile</router-link>
            <button @click="handleLogout" class="text-red-600 hover:text-red-800">Logout</button>
          </template>
        </div>
      </div>
    </nav>

    <main class="p-6">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout(); // Removes token and clears store 
  router.push('/login'); // Redirects to login page 
};
</script>