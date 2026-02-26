// Firebase Configuration
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO SET UP:
// 1. Go to https://console.firebase.google.com
// 2. Create a project (or open an existing one)
// 3. Click ⚙️ Project Settings → "Your apps" → Add app → Web (</>)
// 4. Copy the firebaseConfig object values into .env.local
// 5. In Firebase Console → Authentication → Sign-in method → Enable Email/Password & Google
// 6. (Optional) In Firebase Console → Analytics → Enable Google Analytics
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if real credentials are present before initializing
const isConfigured =
    firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.startsWith('YOUR_');

// Initialize Firebase only when valid config is present (singleton pattern)
const app = isConfigured
    ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
    : null;

// Auth — null when not configured (login page will show a setup warning)
export const auth = app ? getAuth(app) : null;

// Firestore
export const db = app ? getFirestore(app) : null;

// Analytics — lazy-loaded on client only, skipped if not configured
export const analytics =
    app && typeof window !== 'undefined'
        ? import('firebase/analytics').then(({ getAnalytics, isSupported }) =>
            isSupported().then(yes => (yes ? getAnalytics(app) : null)).catch(() => null)
        ).catch(() => null)
        : Promise.resolve(null);

export const firebaseReady = !!isConfigured;

export default app;
