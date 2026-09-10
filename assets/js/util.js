/** Helpers compartilhados pelos módulos. */

/** Cria um elemento com atributos e filhos numa linha só. */
export function criar(tag, atributos = {}, filhos = []) {
  const elemento = document.createElement(tag);
  for (const [chave, valor] of Object.entries(atributos)) {
    if (valor === null || valor === undefined || valor === false) continue;
    if (chave === 'texto') elemento.textContent = valor;
    else if (chave === 'classe') elemento.className = valor;
    else elemento.setAttribute(chave, valor === true ? '' : valor);
  }
  for (const filho of [].concat(filhos)) {
    if (filho) elemento.append(filho);
  }
  return elemento;
}

/** 89.9 vira "R$ 89,90". */
export function moeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Monta o link do WhatsApp com a mensagem já escrita e escapada. */
export function linkZap(numero, mensagem) {
  const limpo = String(numero).replace(/\D/g, '');
  const base = `https://wa.me/${limpo}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

/**
 * "Treine no seu *pulso*" vira "Treine no seu <em>pulso</em>", com a
 * palavra marcada em itálico e na cor de destaque.
 *
 * Escreve nó por nó em vez de innerHTML, então texto do cliente com
 * < ou & nunca vira marcação.
 */
export function comDestaque(elemento, texto = '') {
  elemento.replaceChildren();
  const partes = String(texto).split('*');
  partes.forEach((parte, indice) => {
    if (!parte) return;
    // as partes de índice ímpar são as que estavam entre asteriscos
    if (indice % 2 === 1) {
      elemento.append(criar('em', { classe: 'destaque', texto: parte }));
    } else {
      elemento.append(document.createTextNode(parte));
    }
  });
}
