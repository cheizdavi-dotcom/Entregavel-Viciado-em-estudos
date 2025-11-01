import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redireciona o usuário da raiz para a página principal do aplicativo.
  redirect('/app');
}
