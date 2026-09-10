/**
 * Preenche tudo que vem direto de dados.js: identidade, hero, manifesto,
 * declaração, vitrine, modalidades, unidades, planos, app e rodapé.
 */
import { comDestaque, criar, linkZap, moeda } from './util.js';

const MENSAGEM_PADRAO =
  'Oi! Vim pelo site e quero saber mais sobre os planos e as unidades.';

function aplicarIdentidade(dados) {
  const raiz = document.documentElement;
  raiz.style.setProperty('--cor-base', dados.marca.corBase);
  raiz.style.setProperty('--cor-acento', dados.marca.corAcento);

  document.title = `${dados.nome} — Academia`;

  // Campos de texto simples
  const simples = {
    nome: dados.nome,
    'hero-linha': dados.hero.linha,
    'hero-botao': dados.hero.botao,
    'manifesto-botao': dados.manifesto.botao,
    'vitrine-botao': dados.vitrineBotao,
    'modalidades-chapeu': dados.modalidades.chapeu,
    'unidades-linha': dados.unidades.linha,
    'unidades-horario': dados.unidades.horario,
    'unidades-botao': dados.unidades.botao,
    'app-texto': dados.app.texto,
    'app-chamada': dados.app.chamada,
    'app-instrucao': dados.app.instrucao,
    'rodape-tagline': dados.rodape.tagline,
    'rodape-cnpj': `CNPJ ${dados.cnpj}`,
  };
  for (const [campo, valor] of Object.entries(simples)) {
    for (const el of document.querySelectorAll(`[data-campo="${campo}"]`)) {
      el.textContent = valor;
    }
  }

  // Campos com *palavra em destaque*
  const comMarca = {
    'hero-titulo': dados.hero.titulo,
    'manifesto-titulo': dados.manifesto.titulo,
    'modalidades-titulo': dados.modalidades.titulo,
    'unidades-titulo': dados.unidades.titulo,
    'app-titulo': dados.app.titulo,
  };
  for (const [campo, valor] of Object.entries(comMarca)) {
    for (const el of document.querySelectorAll(`[data-campo="${campo}"]`)) {
      comDestaque(el, valor);
    }
  }

  const telefone = document.querySelector('[data-campo="telefone-link"]');
  if (telefone) {
    telefone.textContent = dados.telefone;
    telefone.href = `tel:+${String(dados.telefone).replace(/\D/g, '')}`;
  }

  const email = document.querySelector('[data-campo="email-link"]');
  if (email) {
    email.textContent = dados.email;
    email.href = `mailto:${dados.email}`;
  }

  for (const link of document.querySelectorAll('[data-zap-simples]')) {
    link.href = linkZap(dados.whatsapp, MENSAGEM_PADRAO);
    link.target = '_blank';
    link.rel = 'noopener';
  }
}

function desenharManifesto(dados) {
  const raiz = document.querySelector('[data-manifesto-colunas]');
  if (!raiz) return;

  for (const coluna of dados.manifesto.colunas) {
    raiz.append(
      criar('div', { classe: 'coluna' }, [
        criar('p', { classe: 'coluna__chapeu', texto: coluna.chapeu }),
        criar('h3', { classe: 'coluna__titulo', texto: coluna.titulo }),
        criar('p', { classe: 'coluna__texto', texto: coluna.texto }),
      ]),
    );
  }
}

/** A declaração tem o "&" destacado em itálico vermelho. */
function desenharDeclaracao(dados) {
  const raiz = document.querySelector('[data-declaracao]');
  if (!raiz) return;

  raiz.replaceChildren();
  const partes = String(dados.declaracao).split('&');
  partes.forEach((parte, indice) => {
    if (indice > 0) raiz.append(criar('em', { texto: '&' }));
    raiz.append(document.createTextNode(parte));
  });
}

function desenharVitrine(dados) {
  const raiz = document.querySelector('[data-vitrine]');
  if (!raiz) return;

  for (const item of dados.vitrine) {
    const figura = criar('figure', { classe: 'vitrine__item' });

    const foto = criar('img', {
      src: item.imagem,
      alt: item.alt,
      loading: 'lazy',
      decoding: 'async',
    });
    // Foto que falta some, mas o bloco continua com as etiquetas.
    foto.addEventListener('error', () => foto.remove());

    figura.append(
      foto,
      criar(
        'figcaption',
        { classe: 'vitrine__etiquetas' },
        item.etiquetas.map((texto) =>
          criar('span', { classe: 'etiqueta', texto }),
        ),
      ),
    );
    raiz.append(figura);
  }
  raiz.hidden = false;
}

function desenharModalidades(dados) {
  const raiz = document.querySelector('[data-modalidades]');
  if (!raiz) return;

  for (const card of dados.modalidades.cards) {
    raiz.append(
      criar('article', { classe: 'card' }, [
        criar('div', { classe: 'card__topo' }, [
          criar('p', { classe: 'card__codigo', texto: card.codigo }),
          criar('p', { classe: 'card__duracao', texto: card.duracao }),
        ]),
        criar('h3', { classe: 'card__nome', texto: card.nome }),
        criar('p', { classe: 'card__texto', texto: card.texto }),
      ]),
    );
  }
  raiz.hidden = false;
}

function desenharUnidades(dados) {
  const raiz = document.querySelector('[data-unidades]');
  if (!raiz) return;

  for (const unidade of dados.unidades.lista) {
    raiz.append(
      criar('li', {}, [
        criar('span', { classe: 'unidade__nome', texto: unidade.nome }),
        criar('span', { classe: 'unidade__endereco', texto: unidade.endereco }),
      ]),
    );
  }
}

function desenharPlanos(dados) {
  const raiz = document.querySelector('[data-planos]');
  if (!raiz) return;

  for (const plano of dados.planos) {
    raiz.append(
      criar('article', { classe: 'plano' }, [
        criar('h3', { classe: 'plano__nome', texto: plano.nome }),
        criar('p', { classe: 'plano__preco', texto: moeda(plano.preco) }),
        criar('p', { classe: 'plano__periodo', texto: 'por mês' }),
        criar('p', { classe: 'plano__texto', texto: plano.texto }),
        criar('a', {
          classe: 'botao botao--vazado plano__botao',
          href: linkZap(
            dados.whatsapp,
            `Oi! Quero saber mais sobre o plano ${plano.nome}.`,
          ),
          target: '_blank',
          rel: 'noopener',
          texto: 'Falar sobre esse plano',
        }),
      ]),
    );
  }
  raiz.hidden = false;
}

/**
 * Desenha um código quadrado decorativo, com os três alvos de canto e um
 * miolo gerado por uma sequência fixa — sempre igual entre recargas.
 * Não codifica nada: o aplicativo do template é fictício.
 */
function desenharCodigoFalso(caixa) {
  const NS = 'http://www.w3.org/2000/svg';
  const modulos = 25;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${modulos} ${modulos}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('aria-hidden', 'true');

  const quadrado = (x, y, l = 1, cor = 'currentColor') => {
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', x);
    r.setAttribute('y', y);
    r.setAttribute('width', l);
    r.setAttribute('height', l);
    r.setAttribute('fill', cor);
    svg.append(r);
  };

  const dentroDoAlvo = (x, y) =>
    [[0, 0], [modulos - 7, 0], [0, modulos - 7]].some(
      ([ax, ay]) => x >= ax && x < ax + 7 && y >= ay && y < ay + 7,
    );

  // miolo: sequência determinística, só para dar textura de código
  let semente = 7;
  for (let y = 0; y < modulos; y += 1) {
    for (let x = 0; x < modulos; x += 1) {
      if (dentroDoAlvo(x, y)) continue;
      semente = (semente * 1103515245 + 12345) % 2147483648;
      if (semente % 100 < 46) quadrado(x, y);
    }
  }

  // os três alvos de canto
  for (const [ax, ay] of [[0, 0], [modulos - 7, 0], [0, modulos - 7]]) {
    quadrado(ax, ay, 7);
    quadrado(ax + 1, ay + 1, 5, 'var(--claro-superficie)');
    quadrado(ax + 2, ay + 2, 3);
  }

  caixa.replaceChildren(svg);
}

function desenharApp(dados) {
  const lista = document.querySelector('[data-app-recursos]');
  if (lista) {
    lista.replaceChildren(
      ...dados.app.recursos.map((texto) => criar('li', { texto })),
    );
  }

  const caixa = document.querySelector('[data-app-codigo]');
  if (caixa) desenharCodigoFalso(caixa);
}

function desenharRodape(dados) {
  const colunas = document.querySelector('[data-rodape-colunas]');
  if (colunas) {
    for (const coluna of dados.rodape.colunas) {
      colunas.append(
        criar('div', { classe: 'rodape__coluna' }, [
          criar('h2', { texto: coluna.titulo }),
          criar(
            'ul',
            {},
            coluna.links.map((link) =>
              criar('li', {}, [criar('a', { href: '#contato', texto: link })]),
            ),
          ),
        ]),
      );
    }
  }

  const redes = document.querySelector('[data-rodape-redes]');
  if (redes) {
    redes.replaceChildren(
      ...dados.rodape.redes.map((rede) =>
        criar('li', {}, [criar('a', { href: '#contato', texto: rede })]),
      ),
    );
  }
}

export function iniciar(dados) {
  aplicarIdentidade(dados);
  desenharManifesto(dados);
  desenharDeclaracao(dados);
  desenharVitrine(dados);
  desenharModalidades(dados);
  desenharUnidades(dados);
  desenharPlanos(dados);
  desenharApp(dados);
  desenharRodape(dados);
}
