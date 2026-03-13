<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Set New Password</h2>
    
    <form @submit.prevent="handleReset" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input v-model="email" type="email" required disabled class="w-full border p-2 rounded bg-gray-100" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Reset Token</label>
        <input v-model="token" type="text" required class="w-full border p-2 rounded" placeholder="Paste token here" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">New Password (Min 8 chars)</label>
        <input v-model="newPassword" type="password" required class="w-full border p-2 rounded" />
      </div>

      <p v-if="message" :class="isError ? 'text-red-500' : 'text-green-500'" class="text-sm">{{ message }}</p>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Save New Password
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const token = ref('');
const newPassword = ref('');
const message = ref('');
const isError = ref(false);

// Auto-fill the email from the URL query parameter if it exists
onMounted(() => {
  if (route.query.email) {
    email.value = route.query.email;
  }
});

const handleReset = async () => {
  message.value = '';
  isError.value = false;
m 
  if (newPassword.value.length < 8) {
    isError.value = true;
    message.value = 'Password must be at least 8 characters long.';
    return;
  }

  try {
    await authStore.resetPassword(email.value, token.value, newPassword.value);
    alert('Password reset successfully! You can now log in.');
    router.push('/login');
  } catch (error) {
    isError.value = true;
    message.value = error.message;
  }
};
</script>