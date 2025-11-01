import { getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Inicializa o Firebase de forma segura
const app = getApps().length === 0 ? getApp() : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
