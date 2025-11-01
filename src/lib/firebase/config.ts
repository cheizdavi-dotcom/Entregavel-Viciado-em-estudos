import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validação das variáveis de ambiente
if (typeof window !== 'undefined') {
  const missingEnvVars = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => `NEXT_PUBLIC_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`);

  if (missingEnvVars.length > 0) {
    const errorMessage = `Sua configuração do Firebase está incompleta. Verifique seu arquivo .env.local e adicione as seguintes chaves: ${missingEnvVars.join(", ")}`;
    console.error(errorMessage);
    alert(errorMessage);
    throw new Error(errorMessage);
  }
}


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// Configura a persistência para manter o usuário logado
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence);
}

export { app, auth, db, analytics };
