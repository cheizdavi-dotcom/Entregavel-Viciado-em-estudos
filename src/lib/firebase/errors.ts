
const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
    'auth/invalid-api-key': 'Sua chave de API do Firebase está inválida ou ausente. Verifique o arquivo .env.local.',
    'auth/invalid-email': 'O formato do e-mail é inválido.',
    'auth/user-not-found': 'E-mail ou senha incorretos.',
    'auth/wrong-password': 'E-mail ou senha incorretos.',
    'auth/email-already-in-use': 'Este e-mail já está em uso por outra conta.',
    'auth/too-many-requests': 'Muitas tentativas de login. Tente novamente em alguns minutos.',
    'auth/weak-password': 'A senha é muito fraca. Tente uma mais forte.',
    'auth/network-request-failed': 'Falha na conexão. Verifique sua internet e tente novamente.',
};

export function getFirebaseAuthErrorMessage(errorCode: string): string {
    return FIREBASE_ERROR_MESSAGES[errorCode] || 'Não foi possível autenticar. Tente novamente.';
}
