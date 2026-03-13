<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
    
    <form @submit.prevent="handleRequestReset" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Enter your Email</label>
        <input v-model="email" type="email" required class="w-full border p-2 rounded" />
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Get Reset Token
      </button>
    </form>

    <div v-if="generatedToken" class="mt-6 p-4 bg-green-50 border border-green-200 rounded text-sm break-all">
      <p class="font-bold text-green-800 mb-2">Simulation Email Received!</p>
      <p>Your reset token is: <strong>{{ generatedToken }}</strong></p>
      <router-link :to="`/reset-password?email=${email}`" class="text-blue-600 underline mt-2 inline-block">
        Click here to reset your password
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const email = ref('');
const errorMessage = ref('');
const generatedToken = ref('');
const authStore = useAuthStore();

const handleRequestReset = async () => {
  errorMessage.value = '';
  generatedToken.value = '';
  
  try {
    const token = await authStore.generatePasswordReset(email.value);
    generatedToken.value = token;
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>