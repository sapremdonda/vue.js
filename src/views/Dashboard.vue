<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-3xl font-bold mb-4">Welcome to your Dashboard</h2>
    <p class="text-gray-600 text-lg">
      Hello, <span class="font-semibold text-blue-600">{{ authStore.user?.name }}</span>! You have successfully logged in.
    </p>
    <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
      <h3 class="font-semibold mb-2">Session Info:</h3>
      <p class="text-sm text-gray-700 break-all"><strong>Active Token:</strong> {{ authStore.token }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
</script>