
export const modules = [
  {
    id: '1',
    title: 'Módulo 1: A Raiz',
    subtitle: 'Entendendo a Procrastinação',
    coverUrl: 'https://i.imgur.com/IR5nhss.png',
    description: 'Neste módulo, vamos desvendar as causas profundas da procrastinação e como ela afeta seu cérebro.',
    order: 1,
  },
  {
    id: '2',
    title: 'Módulo 2: O Gatilho',
    subtitle: 'Identificando Seus Padrões',
    coverUrl: 'https://i.imgur.com/reNazVp.png',
    description: 'Aprenda a identificar os gatilhos que te levam a procrastinar e a criar um ambiente à prova de distrações.',
    order: 2,
  },
  {
    id: '3',
    title: 'Módulo 3: A Ação',
    subtitle: 'Técnicas de Produtividade',
    coverUrl: 'https://i.imgur.com/8RrvCgR.png',
    description: 'Descubra técnicas práticas e eficazes para iniciar e concluir tarefas, mesmo quando a motivação está baixa.',
    order: 3,
  },
  {
    id: '4',
    title: 'Módulo 4: O Controle',
    subtitle: 'Dominando Seu Tempo',
    coverUrl: 'https://i.imgur.com/InRd8Er.png',
    description: 'Transforme a ação em um hábito duradouro. Crie sistemas que trabalham a seu favor para manter o foco no longo prazo.',
    order: 4,
  },
  {
    id: '5',
    title: 'Módulo 5: A Constância',
    subtitle: 'Mantendo o Ritmo',
    coverUrl: 'https://i.imgur.com/ILDypkd.png',
    description: 'Fortaleça sua mentalidade, aprenda a lidar com recaídas e domine a arte de ser uma pessoa de ação.',
    order: 5,
  },
];

export const lessons = [
  // Módulo 1
  { id: '101', moduleId: '1', title: 'Aula 1: O que é procrastinação?', youtubeId: 'BpYYVSFZYfs', order: 1, durationSec: 300 },
  { id: '102', moduleId: '1', title: 'Aula 2: O ciclo vicioso', youtubeId: 'ImZ2abenGkw', order: 2, durationSec: 320 },
  { id: '103', moduleId: '1', title: 'Aula 3: Mitos e verdades', youtubeId: 'rpaxG2t2p_g', order: 3, durationSec: 280 },
  { id: '104', moduleId: '1', title: 'Aula 4: O custo da inação', youtubeId: 'zJJBkLtEVZM', order: 4, durationSec: 350 },
  { id: '105', moduleId: '1', title: 'Aula 5: Seu tipo de procrastinador', youtubeId: 'uybbsidj8XQ', order: 5, durationSec: 290 },

  // Módulo 2
  { id: '201', moduleId: '2', title: 'Aula 1: Encontrando seus gatilhos', youtubeId: 'OFd_3h_G6_c', order: 1, durationSec: 310 },
  { id: '202', moduleId: '2', title: 'Aula 2: Ambiente produtivo', youtubeId: 'vB6t5gD1p2k', order: 2, durationSec: 330 },
  { id: '203', moduleId: '2', title: 'Aula 3: Ferramentas e distrações', youtubeId: 'V1sE_V3Wb1M', order: 3, durationSec: 290 },
  { id: '204', moduleId: '2', title: 'Aula 4: O poder do "não"', youtubeId: 'Hj_13-v0i1A', order: 4, durationSec: 360 },
  { id: '205', moduleId: '2', title: 'Aula 5: Planejando seu dia', youtubeId: 'l21eB4B1aEw', order: 5, durationSec: 300 },

  // Módulo 3
  { id: '301', moduleId: '3', title: 'Aula 1: A regra dos 2 minutos', youtubeId: 'w8j_h-g4_A', order: 1, durationSec: 280 },
  { id: '302', moduleId: '3', title: 'Aula 2: Técnica Pomodoro na prática', youtubeId: 'CTsD6v_F5wA', order: 2, durationSec: 340 },
  { id: '303', moduleId: '3', title: 'Aula 3: "Coma o sapo"', youtubeId: '0o7d_F6s4pQ', order: 3, durationSec: 300 },
  { id: '304', moduleId: '3', title: 'Aula 4: Dividir para conquistar', youtubeId: 't3_d_w-mXk', order: 4, durationSec: 320 },
  { id: '305', moduleId: '3', title: 'Aula 5: Recompensas inteligentes', youtubeId: 'P_s3gB4yFJo', order: 5, durationSec: 310 },

  // Módulo 4
  { id: '401', moduleId: '4', title: 'Aula 1: Como hábitos funcionam', youtubeId: 'c_jY0p_q2w', order: 1, durationSec: 330 },
  { id: '402', moduleId: '4', title: 'Aula 2: Empilhamento de hábitos', youtubeId: 'Q2y_xY3t_Fk', order: 2, durationSec: 290 },
  { id: '403', moduleId: '4', title: 'Aula 3: O diário de progresso', youtubeId: 'qpl7m_h_cI', order: 3, durationSec: 310 },
  { id: '404', moduleId: '4', title: 'Aula 4: Lidando com falhas', youtubeId: '8f_0_5_b4tA', order: 4, durationSec: 340 },
  { id: '405', moduleId: '4', title: 'Aula 5: A identidade de quem faz', youtubeId: 'I_b4t5gD1p2k', order: 5, durationSec: 300 },

  // Módulo 5
  { id: '501', moduleId: '5', title: 'Aula 1: Mentalidade de crescimento', youtubeId: 'V1sE_V3Wb1M', order: 1, durationSec: 320 },
  { id: '502', moduleId: '5', title: 'Aula 2: Autocompaixão produtiva', youtubeId: 'Hj_13-v0i1A', order: 2, durationSec: 350 },
  { id: '503', moduleId: '5', title: 'Aula 3: Visualização e futuro', youtubeId: 'l21eB4B1aEw', order: 3, durationSec: 310 },
  { id: '504', moduleId: '5', title: 'Aula 4: O poder do tédio', youtubeId: 'w8j_h-g4_A', order: 4, durationSec: 290 },
  { id: '505', moduleId: '5', title: 'Aula 5: Próximos passos', youtubeId: 'CTsD6v_F5wA', order: 5, durationSec: 330 },
];
