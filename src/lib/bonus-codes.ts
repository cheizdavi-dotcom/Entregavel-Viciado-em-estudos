/**
 * @fileoverview Configuração de conteúdo bônus e códigos de desbloqueio.
 * 
 * IMPORTANTE:
 * 1. Edite a lista `bonusCodes` para definir seus próprios códigos secretos.
 * 2. Edite a lista `bonusContent` para definir seus materiais.
 * 3. Use o `requiredCode` em um item de `bonusContent` para vinculá-lo a um código.
 */

// 1. Defina aqui os nomes e os códigos de cada order bump/bônus
export const bonusCodes = [
    { name: "Planner de Produtividade", code: "PRODUTIVIDADE-2024" },
    { name: "Guia de Ferramentas", code: "FOCO-TOTAL" },
    { name: "Checklist Anti-Procrastinação", code: "COMECE-AGORA" },
];

// 2. Defina aqui os materiais bônus.
export const bonusContent = [
    {
        id: 1, 
        title: "Planner de Produtividade", 
        description: "Organize sua semana.", 
        type: "PDF", 
        href: "https://files.catbox.moe/a4s10n.pdf",
        requiredCode: "PRODUTIVIDADE-2024" // Este bônus precisa do código para ser desbloqueado
    },
    {
        id: 2, 
        title: "Guia de Ferramentas", 
        description: "Apps para manter o foco.", 
        type: "PDF", 
        href: "https://files.catbox.moe/b1c2d3.pdf", // <-- TROCAR O LINK REAL AQUI
        requiredCode: "FOCO-TOTAL" // E este precisa do outro código
    },
    {
        id: 3, 
        title: "Checklist Anti-Procrastinação", 
        description: "Passos para começar agora.", 
        type: "PDF", 
        href: "https://files.catbox.moe/e4f5g6.pdf", // <-- TROCAR O LINK REAL AQUI
        requiredCode: "COMECE-AGORA"
    },
    {
        id: 4,
        title: "Aula Extra: Lidando com a Ansiedade",
        description: "Uma aula exclusiva sobre como a ansiedade afeta a produtividade.",
        type: "Link",
        href: "/module/1", // Exemplo: link para uma página interna
        // Sem `requiredCode`, então este item estará sempre desbloqueado/visível para todos.
    }
]
