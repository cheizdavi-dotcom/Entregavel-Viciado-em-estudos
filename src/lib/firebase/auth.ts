'use client';

import type { User } from 'firebase/auth';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState } from 'react';

// --- Login Artificial ---
// Para facilitar o desenvolvimento, estamos simulando um usuário logado.
// Isso pula a tela de login e vai direto para o app.
// Para reativar o login real do Firebase, comente o código abaixo
// e descomente o código original mais abaixo.

export function useAuth() {
  const [user] = useState<User | null>({
    uid: 'fake-user-uid',
    displayName: 'Usuário Convidado',
    email: 'convidado@example.com',
    isAnonymous: true,
    photoURL: null,
    emailVerified: false,
    providerId: 'fake-provider',
    // Adicione outras propriedades do tipo User que seu app possa precisar
  } as User);
  const [loading] = useState(false); // Sempre "carregado"

  const signOut = async () => {
    console.log("Logout simulado. Recarregue a página para 'logar' novamente.");
    // Em um cenário real, isso chamaria firebaseSignOut(auth)
  };

  return { user, loading, signOut };
}

// --- Código de Autenticação Original do Firebase ---
// Descomente o código abaixo e comente ou remova o `useAuth` artificial
// para reativar o sistema de login real.
/*
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { user, loading, signOut };
}
*/
