# O Fim da Procrastinação

Este é o projeto do aplicativo "O Fim da Procrastinação", construído com Next.js, Firebase e ShadCN UI.

## 🚀 Começando

Siga estas instruções para configurar e rodar o projeto localmente.

### 1. Pré-requisitos

- Node.js (versão 18 ou superior)
- `pnpm` (ou `npm`/`yarn`)
- Uma conta no Firebase

### 2. Configuração do Ambiente

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-repositorio>
    ```

2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**

    Crie um arquivo chamado `.env.local` na raiz do projeto e adicione as credenciais do seu projeto Firebase. Você pode encontrar esses valores no Console do Firebase em **Configurações do Projeto > Geral > Seus apps > App da Web**.

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
    NEXT_PUBLIC_FIREBASE_APP_ID=1:12345...
    ```

### 3. Configuração do Firebase

1.  **Ativar Métodos de Autenticação:**
    - Vá para o [Console do Firebase](https://console.firebase.google.com/).
    - Selecione seu projeto.
    - No menu lateral, vá para **Authentication > Sign-in method**.
    - Ative os seguintes provedores:
      - **E-mail/senha**
      - **Anônimo**

2.  **Adicionar Domínios Autorizados:**
    - Ainda na aba **Authentication > Settings**, vá para **Domínios autorizados**.
    - Adicione os seguintes domínios:
      - `localhost`
      - O domínio de produção do seu site (quando houver).

### 4. Rodando o Projeto

Com tudo configurado, inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o app.

## 🛠️ Como Atualizar o Conteúdo

### Trocando as Capas dos Módulos

As capas dos módulos são definidas no arquivo `src/lib/seed.ts`. Para trocá-las:

1.  Faça o upload das suas imagens (dimensão recomendada: 1080x1600 pixels) para um serviço de hospedagem de sua preferência.
2.  Abra o arquivo `src/lib/seed.ts`.
3.  Encontre o array `modules` e atualize a propriedade `coverUrl` de cada módulo com a URL da sua nova imagem.

### Atualizando os Vídeos das Aulas

Os vídeos das aulas também são definidos em `src/lib/seed.ts`.

1.  Para cada vídeo que deseja adicionar, você precisará do seu **ID do YouTube**. Por exemplo, na URL `https://www.youtube.com/watch?v=Y1_Vsyb_2eQ`, o ID é `Y1_Vsyb_2eQ`.
2.  Abra o arquivo `src/lib/seed.ts`.
3.  Encontre o array `lessons` e atualize a propriedade `youtubeId` de cada aula com o ID do vídeo correspondente.
4.  Ajuste também a `durationSec` para refletir a duração correta do vídeo em segundos. Isso é importante para o cálculo da barra de progresso.
