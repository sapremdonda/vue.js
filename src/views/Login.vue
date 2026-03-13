<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Log In</h2>
    
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input v-model="email" type="email" required class="w-full border p-2 rounded" />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input v-model="password" type="password" required class="w-full border p-2 rounded" />
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

      <button type="submit" class="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Log In
      </button>
    </form>

    <p class="mt-4 text-center text-sm">
      Don't have an account? <router-link to="/register" class="text-blue-600">Register here</router-link>
    </p>
    <p class="mt-4 text-center text-sm">
      Forgot your password? <router-link to="/forgot-password" class="text-blue-600">Reset it here</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  errorMessage.value = '';

  try {
    await authStore.login(email.value, password.value);
    router.push('/dashboard'); // Redirect to protected route on success
  } catch (error) {
    errorMessage.value = error.message || 'Invalid login credentials.';
  }
};
</script>