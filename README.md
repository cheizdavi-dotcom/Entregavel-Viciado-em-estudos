# O Fim da Procrastinação

Este é o projeto do aplicativo "O Fim da Procrastinação", construído com Next.js e Tailwind CSS, com o progresso salvo localmente no navegador do usuário.

## 🚀 Começando

Siga estas instruções para configurar e rodar o projeto localmente.

### 1. Pré-requisitos

- Node.js (versão 18 ou superior)
- `pnpm` (ou `npm`/`yarn`)

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

### 3. Rodando o Projeto

Com tudo configurado, inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

Abra [http://localhost:9002](http://localhost:9002) no seu navegador para ver o app.

---

## 🌐 Deploy: Publicando seu Site com Vercel e GitHub

Para que o mundo possa ver seu site, você precisa publicá-lo. Usaremos o GitHub para guardar o código e a Vercel para hospedar o site gratuitamente.

### Passo 1: Criar um Repositório no GitHub

1.  Acesse [**github.com**](https://github.com) e faça login.
2.  No canto superior direito, clique no ícone **`+`** e em **`New repository`**.
3.  **Nome do repositório:** Escolha um nome, como `meu-curso-online`.
4.  **Visibilidade:** Marque como **`Private`** (Privado) para que só você veja o código.
5.  **Importante:** Não marque nenhuma caixinha (README, .gitignore, license). Crie um repositório vazio.
6.  Clique em **`Create repository`**.

O GitHub mostrará uma página com comandos. Vamos usar a seção **`…or push an existing repository from the command line`**.

### Passo 2: Enviar o Código para o GitHub (A Conexão Inicial)

Abra a **aba de comando/terminal** aqui neste ambiente de desenvolvimento.

Copie e cole os seguintes comandos, um de cada vez, pressionando Enter após cada um.

1.  **Inicia o controle de versão:**
    ```bash
    git init -b main
    ```

2.  **Adiciona todos os arquivos do projeto:**
    ```bash
    git add .
    ```

3.  **Cria um "save point" inicial:**
    ```bash
    git commit -m "Versão inicial do projeto"
    ```

4.  **Conecta esta pasta ao seu repositório do GitHub.** Copie a linha exata que o GitHub te deu. Será algo assim (**use a sua URL!**):
    ```bash
    git remote add origin https://github.com/seu-usuario/meu-curso-online.git
    ```

5.  **Envia os arquivos para o GitHub:**
    ```bash
    git push -u origin main
    ```

Se tudo deu certo, seus arquivos agora estão no GitHub!

### Passo 3: Publicar na Vercel

1.  Acesse [**vercel.com**](https://vercel.com) e crie uma conta (você pode usar sua conta do GitHub para facilitar).
2.  No painel da Vercel, clique em **`Add New...`** -> **`Project`**.
3.  A Vercel vai se conectar ao seu GitHub e mostrar seus repositórios. Encontre o repositório que você acabou de criar (`meu-curso-online`) e clique em **`Import`**.
4.  A Vercel já sabe que é um projeto Next.js e preenche tudo para você. Você não precisa mudar nada.
5.  Clique em **`Deploy`**.

Aguarde alguns minutos e... pronto! A Vercel te dará um link público (ex: `meu-curso-online.vercel.app`) onde seu site estará no ar.

### Como Atualizar o Site Depois

Toda vez que eu fizer uma mudança para você, basta abrir o terminal aqui e rodar os seguintes comandos:

1.  **Adiciona as novas mudanças:**
    ```bash
    git add .
    ```
2.  **Cria um novo "save point" com uma descrição:**
    ```bash
    git commit -m "Atualização do site"
    ```
3.  **Envia a atualização para o GitHub (e a Vercel publica automaticamente):**
    ```bash
    git push
    ```
