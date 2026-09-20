// Firebase project configuration.
// Create a free Firebase project at https://console.firebase.google.com,
// then paste your own config values below (Project Settings > General > Your apps > SDK setup).
// See README.md "Setting up Firebase" for the full step-by-step.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDma6PXVC7vbmN4jRrMAR7QSSic2wfM7Q8',
  authDomain: 'toolshub-pakistan.firebaseapp.com',
  projectId: 'toolshub-pakistan',
  storageBucket: 'toolshub-pakistan.firebasestorage.app',
  messagingSenderId: '90435287161',
  appId: '1:90435287161:web:a63ee3134057d711047ca8',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
