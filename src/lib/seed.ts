
export const modules = [
  {
    id: '1',
    title: 'Módulo 1: A Raiz',
    subtitle: 'Entendendo a Procrastinação',
    coverUrl: 'https://i.imgur.com/IR5nhss.png',
    description: 'Neste módulo, vamos desvendar as causas profundas da procrastinação e como ela afeta seu cérebro.',
    order: 1,
    summaryPdfUrl: 'https://drive.google.com/drive/folders/1ig1O6wDOQ75vk32jnlL8joRxboFwC0Ib?usp=drive_link',
  },
  {
    id: '2',
    title: 'Módulo 2: O Gatilho',
    subtitle: 'Identificando Suas Barreiras',
    coverUrl: 'https://i.imgur.com/reNazVp.png',
    description: 'Aprenda a identificar os gatilhos que te levam a procrastinar e a criar um ambiente à prova de distrações.',
    order: 2,
    summaryPdfUrl: 'https://drive.google.com/drive/folders/1Ry44GXyrgi2ZqlVf8d7rLHSAql1VBfUu?usp=sharing',
  },
  {
    id: '3',
    title: 'Módulo 3: A Ação',
    subtitle: 'Em breve: lançamento em 06/07',
    coverUrl: 'https://i.imgur.com/8RrvCgR.png',
    description: 'Descubra técnicas práticas e eficazes para iniciar e concluir tarefas, mesmo quando a motivação está baixa.',
    order: 3,
    summaryPdfUrl: 'https://drive.google.com/drive/folders/1ig1O6wDOQ75vk32jnlL8joRxboFwC0Ib?usp=drive_link',
  },
  {
    id: '4',
    title: 'Módulo 4: O Controle',
    subtitle: 'Em breve: lançamento em 08/07',
    coverUrl: 'https://i.imgur.com/InRd8Er.png',
    description: 'Transforme a ação em um hábito duradouro. Crie sistemas que trabalham a seu favor para manter o foco no longo prazo.',
    order: 4,
    summaryPdfUrl: 'https://drive.google.com/drive/folders/1ig1O6wDOQ75vk32jnlL8joRxboFwC0Ib?usp=drive_link',
  },
  {
    id: '5',
    title: 'Módulo 5: A Constância',
    subtitle: 'Em breve: lançamento em 10/07',
    coverUrl: 'https://i.imgur.com/ILDypkd.png',
    description: 'Fortaleça sua mentalidade, aprenda a lidar com recaídas e domine a arte de ser uma pessoa de ação.',
    order: 5,
    summaryPdfUrl: 'https://drive.google.com/drive/folders/1ig1O6wDOQ75vk32jnlL8joRxboFwC0Ib?usp=drive_link',
  },
  // Módulo Bônus
  {
    id: 'bonus-memoria-de-ouro',
    isBonus: true,
    title: 'Bônus: Memória de Ouro',
    subtitle: 'Técnicas avançadas para memorização',
    coverUrl: 'https://i.imgur.com/P6JFT67.png',
    description: 'Técnicas avançadas para memorização e retenção de conteúdo.',
    order: 99, // Ordem alta para não interferir na lógica de desbloqueio
    summaryPdfUrl: 'https://drive.google.com/drive/folders/1yPeEhalBmzdc7NYp5kgnmAkWJ_Tlc_oE?usp=sharing',
  }
];

export const lessons = [
  // Módulo 1
  { id: '101', moduleId: '1', title: 'Aula 1: O que é procrastinação?', youtubeId: 'BpYYVSFZYfs', order: 1, durationSec: 300, summaryPdfUrl: '' },
  { id: '102', moduleId: '1', title: 'Aula 2: O ciclo vicioso', youtubeId: 'ImZ2abenGkw', order: 2, durationSec: 320, summaryPdfUrl: '' },
  { id: '103', moduleId: '1', title: 'Aula 3: Mitos e verdades', youtubeId: '3EwH4EghGqw', order: 3, durationSec: 280, summaryPdfUrl: '' },
  { id: '104', moduleId: '1', title: 'Aula 4: O custo da inação', youtubeId: 'JKSfDyAYKuc', order: 4, durationSec: 350, summaryPdfUrl: '' },
  { id: '105', moduleId: '1', title: 'Aula 5: Seu tipo de procrastinador', youtubeId: 'o-YBDTqX_ZU', order: 5, durationSec: 290, summaryPdfUrl: '' },

  // Módulo 2
  { id: '201', moduleId: '2', title: 'Aula 1: Encontrando seus gatilhos', youtubeId: 'JKSfDyAYKuc', order: 1, durationSec: 310, summaryPdfUrl: '' },
  { id: '202', moduleId: '2', title: ' Aula 2: Ambiente produtivo', youtubeId: 'TGyS50xIbw4', order: 2, durationSec: 330, summaryPdfUrl: '' },
  { id: '203', moduleId: '2', title: 'Aula 3: Ferramentas e distrações', youtubeId: 'CxBoGEZzir4', order: 3, durationSec: 290, summaryPdfUrl: '' },
  { id: '204', moduleId: '2', title: 'Aula 4: O poder do "não"', youtubeId: 'pPJ5WX2VPRc', order: 4, durationSec: 360, summaryPdfUrl: '' },
  { id: '205', moduleId: '2', title: 'Aula 5: Planejando seu dia', youtubeId: 'QAU_8iRzcI4', order: 5, durationSec: 300, summaryPdfUrl: '' },

  // Módulo 3
  { id: '301', moduleId: '3', title: 'Aula 1: A regra dos 2 minutos', youtubeId: 'JnJv42N4DWo', order: 1, durationSec: 280, summaryPdfUrl: '' },
  { id: '302', moduleId: '3', title: 'Aula 2: Técnica Pomodoro na prática', youtubeId: 'WKnaT07qaJ0', order: 2, durationSec: 340, summaryPdfUrl: '' },
  { id: '303', moduleId: '3', title: 'Aula 3: "Coma o sapo"', youtubeId: 'dtP8OQ1993k', order: 3, durationSec: 300, summaryPdfUrl: '' },
  { id: '304', moduleId: '3', title: 'Aula 4: Dividir para conquistar', youtubeId: '_FQOvA1t1Mw', order: 4, durationSec: 320, summaryPdfUrl: '' },
  { id: '305', moduleId: '3', title: 'Aula 5: Recompensas inteligentes', youtubeId: 'K-1I4sVUInY', order: 5, durationSec: 310, summaryPdfUrl: '' },

  // Módulo 4
  { id: '401', moduleId: '4', title: 'Aula 1: Como hábitos funcionam', youtubeId: 'dtrYk5IuVvI', order: 1, durationSec: 330, summaryPdfUrl: '' },
  { id: '402', moduleId: '4', title: 'Aula 2: Empilhamento de hábitos', youtubeId: 'fzeHAfhp39Y', order: 2, durationSec: 290, summaryPdfUrl: '' },
  { id: '403', moduleId: '4', title: 'Aula 3: O diário de progresso', youtubeId: 'KzZy35_k_wI', order: 3, durationSec: 310, summaryPdfUrl: '' },
  { id: '404', moduleId: '4', title: 'Aula 4: Lidando com falhas', youtubeId: 'X7gh_A3locY', order: 4, durationSec: 340, summaryPdfUrl: '' },
  { id: '405', moduleId: '4', title: 'Aula 5: A identidade de quem faz', youtubeId: 'PZ7lDrwYdZc', order: 5, durationSec: 300, summaryPdfUrl: '' },

  // Módulo 5
  { id: '501', moduleId: '5', title: 'Aula 1: Mentalidade de crescimento', youtubeId: 'ICj_ohyI_g4', order: 1, durationSec: 320, summaryPdfUrl: '' },
  { id: '502', moduleId: '5', title: 'Aula 2: Autocompaixão produtiva', youtubeId: 'E1I0hAx2wSo', order: 2, durationSec: 350, summaryPdfUrl: '' },
  { id: '503', moduleId: '5', title: 'Aula 3: Visualização e futuro', youtubeId: '6vuetK362wE', order: 3, durationSec: 310, summaryPdfUrl: '' },
  { id: '504', moduleId: '5', title: 'Aula 4: O poder do tédio', youtubeId: 'TWTB4a6A-wY', order: 4, durationSec: 290, summaryPdfUrl: '' },
  { id: '505', moduleId: '5', title: 'Aula 5: Próximos passos', youtubeId: 'Lp9M4soP-Y', order: 5, durationSec: 330, summaryPdfUrl: '' },

  // Aulas Bônus: Memória de Ouro
  { id: 'bonus-101', moduleId: 'bonus-memoria-de-ouro', title: 'Aula 1: A Fundação da Memória de Ouro', youtubeId: '8wVNtEvoDWg', order: 1, durationSec: 300, summaryPdfUrl: '' },
  { id: 'bonus-102', moduleId: 'bonus-memoria-de-ouro', title: 'Aula 2: O Palácio Mental (Técnica de Loci)', youtubeId: '6vxiOOmgyAw', order: 2, durationSec: 320, summaryPdfUrl: '' },
  { id: 'bonus-103', moduleId: 'bonus-memoria-de-ouro', title: 'Aula 3: Repetição Espaçada Inteligente', youtubeId: 'fi5QvSlZvrI', order: 3, durationSec: 280, summaryPdfUrl: '' },
  { id: 'bonus-104', moduleId: 'bonus-memoria-de-ouro', title: 'Aula 4: Associações Criativas e Mnemônicos', youtubeId: 'mkCxuIJS44o', order: 4, durationSec: 350, summaryPdfUrl: '' },
  { id: 'bonus-105', moduleId: 'bonus-memoria-de-ouro', title: 'Aula 5: Integrando Tudo na Sua Rotina', youtubeId: 'SQKWZy-eBAg', order: 5, durationSec: 290, summaryPdfUrl: '' },
];
