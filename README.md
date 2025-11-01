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

### Passo 2: Enviar o Código do seu Computador para o GitHub

Abra o **Terminal** (no Mac) ou **Prompt de Comando / PowerShell** (no Windows) e navegue até a pasta onde o seu projeto está salvo.

**Exemplo:** Se a pasta do projeto está em `C:\Users\SeuNome\Documentos\o-fim-da-procrastinacao`, você usará o comando:
```bash
cd C:\Users\SeuNome\Documentos\o-fim-da-procrastinacao
```

Depois de estar na pasta correta, execute os seguintes comandos, um de cada vez:

1.  **Inicia o controle de versão:**
    ```bash
    git init -b main
    ```

2.  **Adiciona todos os arquivos:**
    ```bash
    git add .
    ```

3.  **Cria um "save point" inicial:**
    ```bash
    git commit -m "Versão inicial do projeto"
    ```

4.  **Conecta sua pasta local ao repositório do GitHub.** Copie a linha exata que o GitHub te deu. Será algo assim (**use a sua URL!**):
    ```bash
    git remote add origin https://github.com/seu-usuario/meu-curso-online.git
    ```

5.  **Envia os arquivos para o GitHub:**
    ```bash
    git push -u origin main
    ```

### Passo 3: Publicar na Vercel

1.  Acesse [**vercel.com**](https://vercel.com) e crie uma conta (você pode usar sua conta do GitHub para facilitar).
2.  No painel da Vercel, clique em **`Add New...`** -> **`Project`**.
3.  A Vercel vai se conectar ao seu GitHub e mostrar seus repositórios. Encontre o repositório que você acabou de criar (`meu-curso-online`) e clique em **`Import`**.
4.  A Vercel já sabe que é um projeto Next.js e preenche tudo para você. Você não precisa mudar nada.
5.  Clique em **`Deploy`**.

Aguarde alguns minutos e... pronto! A Vercel te dará um link público (ex: `meu-curso-online.vercel.app`) onde seu site estará no ar.