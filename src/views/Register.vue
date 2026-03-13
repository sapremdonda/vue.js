<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Create an Account</h2>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Name</label>
        <input v-model="name" type="text" required class="w-full border p-2 rounded" />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input v-model="email" type="email" required class="w-full border p-2 rounded" />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input v-model="password" type="password" required class="w-full border p-2 rounded" />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Confirm Password</label>
        <input v-model="confirmPassword" type="password" required class="w-full border p-2 rounded" />
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Register
      </button>
    </form>
    
    <p class="mt-4 text-center text-sm">
      Already have an account? <router-link to="/login" class="text-blue-600">Log in here</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const router = useRouter();
const authStore = useAuthStore();

const handleRegister = async () => {
  errorMessage.value = '';

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Please enter a valid email format.';
    return;
  }

  // Minimum password length: 8 characters
  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

  try {
    await authStore.register(name.value, email.value, password.value);
    alert('Registration successful! Please log in.');
    router.push('/login'); // Redirect to login after successful registration
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>