// src/stores/authStore.js            
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { addUser, getUser } from '../services/db';
import bcrypt from 'bcryptjs';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('session_token') || null);

  // Feature 1: User Registration 
  const register = async (name, email, password) => {
    const existingUser = await getUser(email);
    if (existingUser) throw new Error('Email already registered'); // Prevent duplicate emails 

    // Hash passwords using bcryptjs before storing 
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = { name, email, password: hashedPassword }; //   
    await addUser(newUser);
    return true;
  };

  // Feature 2: Login System 
  const login = async (email, password) => {
    const existingUser = await getUser(email); // Retrieve user from IndexedDB 
    if (!existingUser) throw new Error('Invalid credentials');

    // Compare password using bcrypt 
    const isMatch = bcrypt.compareSync(password, existingUser.password);
    if (!isMatch) throw new Error('Invalid credentials');

    // Generate an authentication token 
    const sessionToken = 'token_' + Math.random().toString(36).substr(2) + Date.now();
    
    // Store session token in LocalStorage
    localStorage.setItem('session_token', sessionToken);
    
    // Set token expiration for 1 hour
    const expiry = new Date().getTime() + (60 * 60 * 1000); 
    localStorage.setItem('token_expiry', expiry);

    token.value = sessionToken;
    user.value = { name: existingUser.name, email: existingUser.email };
  };

  // Feature 5: Logout 
  const logout = () => {
    localStorage.removeItem('session_token'); // Remove authentication token
    localStorage.removeItem('token_expiry');
    token.value = null;
    user.value = null; // Clear Pinia store 
  };

  const updateUser = async ({ name, oldPassword, newPassword }) => {
    if (!user.value) throw new Error('Not authenticated');

    const existingUser = await getUser(user.value.email);
    if (!existingUser) throw new Error('User not found');

    // Update name
    let updatedUser = { ...existingUser, name };

    // Handle password update
    if (newPassword) {
      if (!oldPassword) {
        throw new Error('You must enter your old password to set a new one.');
      }
      
      // Verify old password
      const isMatch = bcrypt.compareSync(oldPassword, existingUser.password);
      if (!isMatch) throw new Error('Incorrect old password.');

      // Hash new password
      const salt = bcrypt.genSaltSync(10);
      updatedUser.password = bcrypt.hashSync(newPassword, salt);
    }

    // Save back to IndexedDB
    await addUser(updatedUser); 
    
    // Update local Pinia state
    user.value.name = name; 
  };

  return { user, token, register, login, logout, updateUser };
});