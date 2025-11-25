// ================================
// Firebase Configuration
// ================================

// Firebase configuration object
// You'll get these values from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBwwRXC0-9YSptPAIXZmIU6qrDq5LJEduk",
    authDomain: "world-conquest-vet.firebaseapp.com",
    projectId: "world-conquest-vet",
    storageBucket: "world-conquest-vet.firebasestorage.app",
    messagingSenderId: "165576690806",
    appId: "1:165576690806:web:e12d33bd78d255f032e357",
    measurementId: "G-3PC7PZJV7G"
};

// Initialize Firebase
let app;
let auth;

try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase:', error);
}

// Export auth instance for use in other files
window.firebaseAuth = auth;
window.firebaseApp = app;
