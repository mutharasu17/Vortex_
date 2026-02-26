'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    UserCredential,
} from 'firebase/auth';
import { auth, firebaseReady } from '@/lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    firebaseReady: boolean;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    signInWithGoogle: () => Promise<UserCredential>;
    signInWithGithub: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only subscribe to auth changes when Firebase is configured
        if (!auth || !firebaseReady) {
            setLoading(false);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const requireAuth = () => {
        if (!auth || !firebaseReady) {
            throw new Error('Firebase is not configured. Please add your credentials to .env.local');
        }
        return auth;
    };

    const signIn = (email: string, password: string) =>
        signInWithEmailAndPassword(requireAuth(), email, password);

    const signUp = (email: string, password: string) =>
        createUserWithEmailAndPassword(requireAuth(), email, password);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(requireAuth(), provider);
    };

    const signInWithGithub = () => {
        const provider = new GithubAuthProvider();
        return signInWithPopup(requireAuth(), provider);
    };

    const logOut = () => (auth ? signOut(auth) : Promise.resolve());

    const resetPassword = (email: string) => sendPasswordResetEmail(requireAuth(), email);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            firebaseReady,
            signIn,
            signUp,
            signInWithGoogle,
            signInWithGithub,
            logOut,
            resetPassword,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
