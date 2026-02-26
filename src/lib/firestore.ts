'use client';

import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface Robot {
    id?: string;
    name: string;
    model: string;
    status: 'active' | 'idle' | 'maintenance';
    battery: number;
    lastUpdate: Timestamp | any;
    userId: string;
}

const COLLECTION_NAME = 'robots';

export const robotService = {
    // CREATE (Add)
    async addRobot(userId: string, robotData: Omit<Robot, 'id' | 'userId' | 'lastUpdate'>) {
        if (!db) throw new Error('Firestore not initialized');

        return addDoc(collection(db, COLLECTION_NAME), {
            ...robotData,
            userId,
            lastUpdate: serverTimestamp(),
        });
    },

    // UPDATE (Put)
    async updateRobot(robotId: string, updates: Partial<Robot>) {
        if (!db) throw new Error('Firestore not initialized');

        const robotRef = doc(db, COLLECTION_NAME, robotId);
        return updateDoc(robotRef, {
            ...updates,
            lastUpdate: serverTimestamp(),
        });
    },

    // READ (Get all for user)
    async getUserRobots(userId: string) {
        if (!db) throw new Error('Firestore not initialized');

        const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Robot[];
    },

    // DELETE
    async deleteRobot(robotId: string) {
        if (!db) throw new Error('Firestore not initialized');
        const robotRef = doc(db, COLLECTION_NAME, robotId);
        return deleteDoc(robotRef);
    }
};
