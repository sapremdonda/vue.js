// src/services/db.js
import { openDB } from 'idb';

const DB_NAME = 'VueAuthApp';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Users table 
      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { keyPath: 'email' });
        userStore.createIndex('email', 'email', { unique: true });
      }
      // Sessions table 
      if (!db.objectStoreNames.contains('sessions')) {
        db.createObjectStore('sessions', { keyPath: 'token' });
      }
    },
  });
};

export const addUser = async (user) => {
  const db = await initDB();
  return db.put('users', user);
};

export const getUser = async (email) => {
  const db = await initDB();
  return db.get('users', email);
};