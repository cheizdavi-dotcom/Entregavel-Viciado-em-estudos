/**
 * @fileoverview Configuração de conteúdo bônus e códigos de desbloqueio.
 * 
 * IMPORTANTE:
 * 1. Edite a lista `bonusCodes` para definir seus próprios códigos secretos.
 *    - CADA BÔNUS TEM SEU PRÓPRIO CÓDIGO.
 *    - Você enviará o código específico para o cliente que comprou o bônus correspondente.
 * 2. Edite a lista `bonusContent` para definir seus materiais.
 *    - Atualize a `coverUrl` com a imagem de capa de cada bônus.
 *    - Atualize a `youtubeId` com o ID do vídeo do YouTube para cada bônus.
 * 3. Use o `requiredCode` em um item de `bonusContent` para vinculá-lo a um código.
 */

// 1. Defina aqui os nomes e os CÓDIGOS SECRETOS de cada bônus.
// Estes são os códigos que você vai enviar para os seus clientes.
export const bonusCodes = [
    { name: "Memória de Ouro", code: "MEMORIA-OURO" },
    { name: "Rotina de Estudos", code: "ROTINA-ESTUDOS" },
    { name: "Caminho para Aprovação", code: "APROVACAO-2024" },
];

export interface BonusItem {
    id: string;
    title: string;
    description: string;
    coverUrl: string; // Capa do bônus
    youtubeId: string; // ID do vídeo do YouTube
    requiredCode?: string;
}


// 2. Defina aqui os materiais bônus.
export const bonusContent: BonusItem[] = [
    {
        id: "memoria-de-ouro", 
        title: "Memória de Ouro", 
        description: "Técnicas avançadas para memorização e retenção de conteúdo.", 
        coverUrl: "https://i.imgur.com/P6JFT67.png",
        youtubeId: "BpYYVSFZYfs", // <- TROCAR ID DO VÍDEO REAL
        requiredCode: "MEMORIA-OURO" 
    },
    {
        id: "rotina-de-estudos", 
        title: "Rotina de Estudos", 
        description: "Um guia prático para construir e manter a disciplina nos estudos.", 
        coverUrl: "https://i.imgur.com/z6nLauv.png",
        youtubeId: "ImZ2abenGkw", // <- TROCAR ID DO VÍDEO REAL
        requiredCode: "ROTINA-ESTUDOS"
    },
    {
        id: "caminho-para-aprovacao", 
        title: "Caminho para Aprovação", 
        description: "O passo a passo estratégico para garantir sua vaga.", 
        coverUrl: "https://i.imgur.com/vPHn8Xu.png",
        youtubeId: "3EwH4EghGqw", // <- TROCAR ID DO VÍDEO REAL
        requiredCode: "APROVACAO-2024"
    },
    // Itens gratuitos (sem requiredCode) aparecerão na página "Mais"
    {
        id: "planner-semanal",
        title: "Planner Semanal",
        description: "Organize suas tarefas e horários de estudo com este planner exclusivo.",
        coverUrl: "https://i.imgur.com/InRd8Er.png", // Este campo não será usado na pág "Mais"
        youtubeId: "p1a2n3", // Este campo não será usado na pág "Mais"
        // Sem `requiredCode`, conteúdo gratuito.
    },
    {
        id: "mapa-mental",
        title: "Mapa Mental de Estudos",
        description: "Um modelo de mapa mental para organizar ideias e acelerar o aprendizado.",
        coverUrl: "https://i.imgur.com/ILDypkd.png", // Este campo não será usado na pág "Mais"
        youtubeId: "m4p1m3", // Este campo não será usado na pág "Mais"
        // Sem `requiredCode`, conteúdo gratuito.
    },
    {
        id: "checklist-foco",
        title: "Checklist de Foco",
        description: "Prepare seu ambiente antes de estudar e elimine as distrações.",
        coverUrl: "https://i.imgur.com/reNazVp.png", // Este campo não será usado na pág "Mais"
        youtubeId: "f0c4s5", // Este campo não será usado na pág "Mais"
        // Sem `requiredCode`, conteúdo gratuito.
    }
];

// Re-exportando `bonusContent` como `moreContent` para a página 'Mais',
// mas com a estrutura antiga para não quebrar a página.
// Isso é um passo intermediário.
export const moreContent = [
     {
        id: 5,
        title: "Planner Semanal",
        description: "Organize suas tarefas e horários de estudo com este planner exclusivo.",
        type: "PDF",
        href: "https://files.catbox.moe/a4s10n.pdf", 
    },
    {
        id: 6,
        title: "Mapa Mental de Estudos",
        description: "Um modelo de mapa mental para organizar ideias e acelerar o aprendizado.",
        type: "PDF",
        href: "https://files.catbox.moe/cina3t.pdf", 
    },
    {
        id: 7,
        title: "Checklist de Foco",
        description: "Prepare seu ambiente antes de estudar e elimine as distrações.",
        type: "PDF",
        href: "https://files.catbox.moe/f0c4s5.pdf", // <-- TROCAR O LINK REAL AQUI
    }
]
