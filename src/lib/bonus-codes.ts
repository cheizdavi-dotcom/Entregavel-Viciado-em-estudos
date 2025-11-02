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
    { name: "Memória de Ouro", code: "MEMORIA-OURO" },
    { name: "Rotina de Estudos", code: "ROTINA-ESTUDOS" },
    { name: "Caminho para Aprovação", code: "APROVACAO-2024" },
];

// 2. Defina aqui os materiais bônus.
export const bonusContent = [
    {
        id: 1, 
        title: "Memória de Ouro", 
        description: "Técnicas avançadas para memorização e retenção de conteúdo.", 
        type: "PDF", 
        href: "https://files.catbox.moe/a4s10n.pdf", // <-- TROCAR O LINK REAL AQUI
        requiredCode: "MEMORIA-OURO" // Este bônus precisa do código para ser desbloqueado
    },
    {
        id: 2, 
        title: "Como Manter uma Rotina de Estudos", 
        description: "Um guia prático para construir e manter a disciplina nos estudos.", 
        type: "PDF", 
        href: "https://files.catbox.moe/b1c2d3.pdf", // <-- TROCAR O LINK REAL AQUI
        requiredCode: "ROTINA-ESTUDOS" // E este precisa do outro código
    },
    {
        id: 3, 
        title: "Caminho para Aprovação", 
        description: "O passo a passo estratégico para garantir sua vaga.", 
        type: "PDF", 
        href: "https://files.catbox.moe/e4f5g6.pdf", // <-- TROCAR O LINK REAL AQUI
        requiredCode: "APROVACAO-2024"
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
