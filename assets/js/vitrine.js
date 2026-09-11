/**
 * Vitrine em carrossel 3D: a foto atual fica no centro e maior, as
 * vizinhas giram para os lados e o fundo do palco troca junto, desfocado.
 * A foto do centro inclina seguindo o mouse.
 *
 * Funciona com qualquer quantidade de fotos em dados.js. A troca é pelas
 * setas, pelas setas do teclado ou deslizando o dedo — não há barra de
 * rolagem.
 *
 * Efeito adaptado do Voyage Slider (github.com/devloop01/voyage-slider).
 */
import { criar } from './util.js';

const ESTADOS = ['data-atual', 'data-proximo', 'data-anterior', 'data-oculto'];

// Distância mínima, em pixels, para um toque virar troca de foto.
const DESLIZE_MINIMO = 40;

const circular = (n, total) => ((n % total) + total) % total;

function seta(caminho) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const traco = document.createElementNS(NS, 'path');
  traco.setAttribute('d', caminho);
  svg.append(traco);
  return svg;
}

/**
 * Inclina a foto seguindo o mouse, com atraso suave. O laço de animação
 * só roda enquanto há movimento; parado, não gasta quadro nenhum.
 * Devolve uma função que zera a inclinação.
 */
function inclinar(slide, alvos) {
  const atual = { x: 0, y: 0, fotoX: 0, fotoY: 0 };
  const destino = { x: 0, y: 0, fotoX: 0, fotoY: 0 };
  let suavidade = 0.06;
  let quadro = 0;

  const passo = () => {
    let parado = true;
    for (const chave of Object.keys(atual)) {
      atual[chave] += (destino[chave] - atual[chave]) * suavidade;
      if (Math.abs(destino[chave] - atual[chave]) < 0.01) atual[chave] = destino[chave];
      else parado = false;
    }
    for (const el of alvos) {
      el.style.setProperty('--inclina-x', `${atual.x.toFixed(2)}deg`);
      el.style.setProperty('--inclina-y', `${atual.y.toFixed(2)}deg`);
      el.style.setProperty('--foto-x', `${atual.fotoX.toFixed(2)}%`);
      el.style.setProperty('--foto-y', `${atual.fotoY.toFixed(2)}%`);
    }
    quadro = parado ? 0 : requestAnimationFrame(passo);
  };

  const animar = () => {
    if (!quadro) quadro = requestAnimationFrame(passo);
  };

  const soltar = () => {
    suavidade = 0.06;
    Object.assign(destino, { x: 0, y: 0, fotoX: 0, fotoY: 0 });
    animar();
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return soltar;
  }

  slide.addEventListener('pointermove', (evento) => {
    if (evento.pointerType !== 'mouse') return;
    const caixa = slide.getBoundingClientRect();
    const dx = (evento.clientX - caixa.left - caixa.width / 2) / (Math.PI * 3);
    const dy = -(evento.clientY - caixa.top - caixa.height / 2) / (Math.PI * 4);

    suavidade = 0.1;
    Object.assign(destino, { x: dy, y: dx, fotoX: -dx * 0.3, fotoY: dy * 0.3 });
    animar();
  });
  slide.addEventListener('pointerleave', soltar);

  return soltar;
}

function linhaDeTexto(classe, texto) {
  if (!texto) return null;
  return criar('p', { classe: `vitrine__texto ${classe}` }, [
    criar('span', { texto }),
  ]);
}

export function desenharVitrine(dados) {
  const raiz = document.querySelector('[data-vitrine]');
  const fotos = dados.vitrine || [];
  if (!raiz || !fotos.length) return;

  const total = fotos.length;
  const fundos = criar('div', { classe: 'vitrine__fundos', 'aria-hidden': 'true' });
  const slides = criar('div', { classe: 'vitrine__slides' });
  const infos = criar('div', { classe: 'vitrine__infos' });
  const status = criar('p', { classe: 'vitrine__status', 'aria-live': 'polite' });

  const itens = fotos.map((item) => {
    const foto = criar('img', {
      classe: 'vitrine__foto',
      src: item.imagem,
      alt: item.alt,
      loading: 'lazy',
      decoding: 'async',
      draggable: 'false',
    });
    // Foto que falta some, mas o bloco continua com os textos.
    foto.addEventListener('error', () => foto.remove());

    // A imagem vai direto no style, e não numa variável CSS: url() relativa
    // dentro de variável é resolvida a partir da pasta do CSS, não da página.
    const fundo = criar('div', { classe: 'vitrine__fundo' });
    fundo.style.backgroundImage = `url(${JSON.stringify(item.imagem)})`;

    const slideInterno = criar('div', { classe: 'vitrine__slide-interno' }, [
      criar('div', { classe: 'vitrine__moldura' }, [foto]),
    ]);
    const slide = criar('div', { classe: 'vitrine__slide' }, [slideInterno]);

    const infoInterno = criar('div', { classe: 'vitrine__info-interno' }, [
      criar('div', { classe: 'vitrine__textos' }, [
        linhaDeTexto('vitrine__titulo', item.titulo),
        linhaDeTexto('vitrine__subtitulo', item.subtitulo),
        linhaDeTexto('vitrine__descricao', item.descricao),
      ]),
    ]);
    const info = criar('div', { classe: 'vitrine__info' }, [infoInterno]);

    fundos.append(fundo);
    slides.append(slide);
    infos.append(info);

    return { slide, info, fundo, soltar: inclinar(slide, [slideInterno, infoInterno]) };
  });

  let indice = 0;

  function mostrar(novo, direcao = 0) {
    const antigo = indice;
    indice = circular(novo, total);

    itens.forEach((item, i) => {
      const distancia = circular(i - indice, total);
      let estado = 'data-oculto';
      if (distancia === 0) estado = 'data-atual';
      else if (distancia === 1) estado = 'data-proximo';
      else if (distancia === total - 1) estado = 'data-anterior';

      for (const el of [item.slide, item.info, item.fundo]) {
        for (const nome of ESTADOS) el.removeAttribute(nome);
        el.setAttribute(estado, '');
      }
      item.slide.setAttribute('aria-hidden', String(distancia !== 0));
      item.info.setAttribute('aria-hidden', String(distancia !== 0));

      // A foto que sai do centro passa por cima das outras; a que cruza o
      // palco de um lado ao outro passa por baixo.
      if (direcao && i === antigo) item.slide.style.zIndex = '30';
      else item.slide.style.zIndex = distancia === 0 ? '20' : '10';
    });

    if (!direcao) return;
    itens[antigo].soltar();
    const atual = fotos[indice];
    status.textContent = `${atual.titulo || atual.alt}, foto ${indice + 1} de ${total}`;
  }

  const voltar = () => mostrar(indice - 1, -1);
  const avancar = () => mostrar(indice + 1, 1);

  raiz.setAttribute('role', 'region');
  raiz.setAttribute('aria-roledescription', 'carrossel');
  raiz.setAttribute('aria-label', 'Fotos da estrutura');
  raiz.append(fundos, slides, infos, status);

  if (total > 1) {
    const anterior = criar(
      'button',
      { classe: 'vitrine__seta vitrine__seta--anterior', type: 'button', 'aria-label': 'Foto anterior' },
      [seta('m15 18-6-6 6-6')],
    );
    const proxima = criar(
      'button',
      { classe: 'vitrine__seta vitrine__seta--proxima', type: 'button', 'aria-label': 'Próxima foto' },
      [seta('m9 18 6-6-6-6')],
    );
    anterior.addEventListener('click', voltar);
    proxima.addEventListener('click', avancar);
    raiz.append(anterior, proxima);

    raiz.addEventListener('keydown', (evento) => {
      if (evento.key === 'ArrowLeft') voltar();
      else if (evento.key === 'ArrowRight') avancar();
      else return;
      evento.preventDefault();
    });

    let inicioX = null;
    raiz.addEventListener('pointerdown', (evento) => {
      if (evento.pointerType !== 'mouse') inicioX = evento.clientX;
    });
    raiz.addEventListener('pointerup', (evento) => {
      if (inicioX === null) return;
      const deslize = evento.clientX - inicioX;
      inicioX = null;
      if (deslize <= -DESLIZE_MINIMO) avancar();
      else if (deslize >= DESLIZE_MINIMO) voltar();
    });
    raiz.addEventListener('pointercancel', () => {
      inicioX = null;
    });
  }

  mostrar(0);
  raiz.hidden = false;
}
