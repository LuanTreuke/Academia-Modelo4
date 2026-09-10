/**
 * ÚNICO ARQUIVO QUE PRECISA SER EDITADO PARA TROCAR DE CLIENTE.
 * Identidade, textos, modalidades, unidades, app e contatos saem daqui.
 * Não é preciso mexer no HTML nem no CSS.
 */
export const ACADEMIA = {
  nome: 'Pulso',

  whatsapp: '5511999999999',
  telefone: '(11) 3333-4444',
  email: 'contato@academiapulso.com.br',
  cnpj: '00.000.000/0001-00',

  // As duas cores da marca. Todo o resto do site se ajusta a elas.
  marca: {
    corBase: '#1c1d1f',
    corAcento: '#e6252d',
  },

  hero: {
    // A palavra entre asteriscos sai em itálico e na cor de destaque.
    titulo: 'Treine no seu *pulso*',
    linha: 'Musculação, estúdios e recuperação em um só lugar.',
    botao: 'Matricule-se',
  },

  manifesto: {
    titulo: 'Mais que uma *série*',
    colunas: [
      {
        chapeu: 'Seu espaço',
        titulo: 'Para evoluir',
        texto:
          'Aqui o treino faz parte de uma estrutura inteira: musculação, estúdios de aula, área de recuperação e avaliação física. Cada detalhe existe para você não perder tempo entre uma coisa e outra.',
      },
      {
        chapeu: 'Experiência',
        titulo: 'No seu ritmo',
        texto:
          'Ambiente amplo, equipamento revisado e gente por perto quando você precisar. Treinar aqui não é encaixar mais um compromisso: é ter um lugar que funciona quando você chega.',
      },
    ],
    botao: 'Matricule-se',
  },

  declaracao: 'Musculação & performance',

  // As etiquetas aparecem sobre cada foto do carrossel.
  vitrine: [
    {
      imagem: 'assets/img/sala-1.jpg',
      alt: 'Corredor central entre fileiras de aparelhos de musculação',
      etiquetas: ['Equipamento de linha', 'Manutenção mensal'],
    },
    {
      imagem: 'assets/img/sala-2.jpg',
      alt: 'Área de peso livre com racks de agachamento e halteres',
      etiquetas: ['Peso livre', 'Oito racks'],
    },
    {
      imagem: 'assets/img/sala-3.jpg',
      alt: 'Estúdio de aulas coletivas com bikes de spinning',
      etiquetas: ['Estúdios exclusivos', 'Turma com vaga marcada'],
    },
  ],
  vitrineBotao: 'Conhecer as unidades',

  modalidades: {
    chapeu: 'Coletivas',
    titulo: 'Uma aula para cada *objetivo*',
    cards: [
      {
        codigo: 'P.OWER',
        nome: 'Força e condicionamento',
        texto: 'Circuito de força em turma pequena, com carga ajustada por aluno.',
        duracao: '50 min',
      },
      {
        codigo: 'P.EDAL',
        nome: 'Bike indoor',
        texto: 'Aula de bike com música e medição de potência na tela.',
        duracao: '45 min',
      },
      {
        codigo: 'P.AUSA',
        nome: 'Alongamento e mobilidade',
        texto: 'Trabalho de amplitude e relaxamento muscular no fim do dia.',
        duracao: '30 min',
      },
      {
        codigo: 'P.ILATES',
        nome: 'Pilates em aparelho',
        texto: 'Reformer e cadillac, com no máximo seis alunos por horário.',
        duracao: '50 min',
      },
      {
        codigo: 'P.ACE',
        nome: 'Corrida e esteira',
        texto: 'Treino intervalado guiado, do iniciante ao corredor de rua.',
        duracao: '40 min',
      },
      {
        codigo: 'P.OSTURA',
        nome: 'Yoga',
        texto: 'Respiração, equilíbrio e força isométrica em sala fechada.',
        duracao: '60 min',
      },
    ],
  },

  unidades: {
    titulo: 'Encontre a sua *Pulso*',
    linha:
      'Quatro unidades em São Paulo, todas com a mesma estrutura e o mesmo horário.',
    botao: 'Matricule-se',
    lista: [
      { nome: 'Paulista', endereco: 'Av. Paulista, 1200 — Bela Vista' },
      { nome: 'Pinheiros', endereco: 'R. dos Pinheiros, 480 — Pinheiros' },
      { nome: 'Moema', endereco: 'Av. Ibirapuera, 2100 — Moema' },
      { nome: 'Tatuapé', endereco: 'R. Tuiuti, 900 — Tatuapé' },
    ],
    horario: 'Todas as unidades abrem das 6h às 23h nos dias úteis.',
  },

  app: {
    titulo: 'Seu treino no *bolso*',
    texto:
      'O aplicativo Pulso guarda sua ficha, marca sua vaga nas aulas, registra a evolução de carga e mostra a lotação da unidade em tempo real. Tudo em um lugar só.',
    chamada: 'Baixe o app',
    instrucao: 'Aponte a câmera do celular para o código',
    recursos: [
      'Ficha de treino sempre atualizada',
      'Reserva de vaga nas aulas',
      'Histórico de carga e frequência',
      'Lotação da unidade agora',
    ],
  },

  planos: [
    {
      nome: 'Uma unidade',
      preco: 129.9,
      texto: 'Acesso livre à unidade que você escolher, em qualquer horário.',
    },
    {
      nome: 'Todas as unidades',
      preco: 179.9,
      texto: 'Entra em qualquer uma das quatro, com as aulas coletivas inclusas.',
    },
    {
      nome: 'Infinity',
      preco: 289.9,
      texto: 'Tudo do anterior, mais personal semanal, pilates e avaliação mensal.',
    },
  ],

  rodape: {
    tagline: 'Academia com estrutura completa, das 6h às 23h.',
    colunas: [
      {
        titulo: 'Treinos',
        links: ['Musculação', 'Aulas coletivas', 'Pilates', 'Avaliação física'],
      },
      {
        titulo: 'Institucional',
        links: ['Sobre a Pulso', 'Trabalhe conosco', 'Política de privacidade', 'Termos de uso'],
      },
      {
        titulo: 'Ajuda',
        links: ['Contratos', 'Cancelamento', 'Imprensa', 'Fale com a gente'],
      },
    ],
    redes: ['Instagram', 'YouTube', 'LinkedIn'],
  },
};
