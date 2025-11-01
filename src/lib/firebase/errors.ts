// Mapeia códigos de erro de autenticação do Firebase para mensagens amigáveis em português.
export function mapFirebaseAuthError(code?: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'O formato do e-mail é inválido.';
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'E-mail ou senha incorretos. Por favor, tente novamente.';
    case 'auth/email-already-in-use':
      return 'Este e-mail já está sendo usado por outra conta.';
    case 'auth/weak-password':
      return 'A senha é muito fraca. Tente uma com pelo menos 6 caracteres.';
    case 'auth/operation-not-allowed':
      return 'A autenticação por e-mail e senha não está ativada.';
    default:
      return 'Ocorreu um erro inesperado. Tente novamente.';
  }
}
