/**
 * @fileoverview Configuração de conteúdo bônus e códigos de desbloqueio.
 * 
 * IMPORTANTE:
 * 1. Edite a lista `bonusCodes` para definir seus próprios códigos secretos.
 *    - CADA BÔNUS TEM SEU PRÓPRIO CÓDIGO.
 *    - Você enviará o código específico para o cliente que comprou o bônus correspondente.
 * 2. Edite a lista `bonusContent` para definir seus materiais.
 *    - Atualize a `coverUrl` com a imagem de capa de cada bônus.
 *    - Se for um bônus com múltiplas aulas (formato de módulo), defina o `moduleId`.
 *    - Se for um bônus de vídeo único, defina o `youtubeId`.
 *    - Adicione uma `releaseDate` no formato 'YYYY-MM-DD' para bônus futuros.
 */

// 1. Defina aqui os nomes e os CÓDIGOS SECRETOS de cada bônus.
// Estes são os códigos que você vai enviar para os seus clientes.
export const bonusCodes = [
    { name: "Memória de Ouro", code: "MEMORIA-OURO" },
    { name: "Método Pomodoro Avançado", code: "POMODORO-PRO" },
    { name: "O Sono do Estudante", code: "SONO-ESTUDANTE" },
];

export interface BonusItem {
    id: string;
    title: string;
    description: string;
    coverUrl: string; // Capa do bônus
    youtubeId?: string; // ID do vídeo do YouTube (para bônus de vídeo único)
    moduleId?: string; // ID do módulo (para bônus com múltiplas aulas)
    requiredCode?: string;
    releaseDate?: string; // Data de lançamento no formato 'YYYY-MM-DD'
}


// 2. Defina aqui os materiais bônus.
export const bonusContent: BonusItem[] = [
    {
        id: "memoria-de-ouro", 
        title: "Memória de Ouro", 
        description: "Técnicas avançadas para memorização e retenção de conteúdo.", 
        coverUrl: "https://imgur.com/t85LaHE.png",
        moduleId: "bonus-memoria-de-ouro", // <- Link para o módulo bônus em seed.ts
        requiredCode: "MEMORIA-OURO",
    },
    {
        id: "metodo-pomodoro-avancado", 
        title: "Método Pomodoro Avançado", 
        description: "Turbine sua produtividade com blocos de estudo perfeitos.", 
        coverUrl: "https://imgur.com/jQdXVqz.png",
        youtubeId: "WKnaT07qaJ0",
        requiredCode: "POMODORO-PRO"
    },
    {
        id: "o-sono-do-estudante", 
        title: "O Sono do Estudante", 
        description: "Durma menos e memorize mais com técnicas de neurosono avançadas.", 
        coverUrl: "https://imgur.com/L9KNFom.png",
        youtubeId: "E1I0hAx2wSo",
        requiredCode: "SONO-ESTUDANTE",
    },
    // Itens gratuitos (sem requiredCode) aparecerão na página "Mais"
    {
        id: "planner-semanal",
        title: "Planner Semanal",
        description: "Organize suas tarefas e horários de estudo com este planner exclusivo.",
        coverUrl: "https://i.imgur.com/InRd8Er.png", // Este campo não será usado na pág "Mais"
    },
    {
        id: "mapa-mental",
        title: "Mapa Mental de Estudos",
        description: "Um modelo de mapa mental para organizar ideias e acelerar o aprendizado.",
        coverUrl: "https://i.imgur.com/ILDypkd.png", // Este campo não será usado na pág "Mais"
    },
    {
        id: "checklist-foco",
        title: "Checklist de Foco",
        description: "Prepare seu ambiente antes de estudar e elimine as distrações.",
        coverUrl: "https://i.imgur.com/reNazVp.png", // Este campo não será usado na pág "Mais"
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
        href: "https://files.catbox.moe/imsckt.pdf", 
    }
]
