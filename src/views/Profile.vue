<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Update Profile</h2>
    
    <form @submit.prevent="handleUpdate" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Name </label>
        <input v-model="name" type="text" class="w-full border p-2 rounded" />
      </div>
      
      <hr class="my-4" />
      <h3 class="text-lg font-semibold">Change Password </h3>
      
      <div>
        <label class="block text-sm font-medium mb-1">Current Password </label>
        <input v-model="oldPassword" type="password" class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">New Password</label>
        <input v-model="newPassword" type="password" class="w-full border p-2 rounded" />
      </div>

      <p v-if="message" :class="isError ? 'text-red-500' : 'text-green-500'" class="text-sm">{{ message }}</p>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Save Changes
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const name = ref('');
const oldPassword = ref('');
const newPassword = ref('');
const message = ref('');
const isError = ref(false);

onMounted(() => {
  if (authStore.user) {
    name.value = authStore.user.name;
  }
});

const handleUpdate = async () => {
  message.value = '';
  isError.value = false;

  try {
    await authStore.updateUser({ 
      name: name.value, 
      oldPassword: oldPassword.value, 
      newPassword: newPassword.value 
    });
    
    message.value = 'Profile updated successfully!';
    oldPassword.value = '';
    newPassword.value = '';
  } catch (error) {
    isError.value = true;
    message.value = error.message || 'Failed to update profile.';
  }
};
</script>