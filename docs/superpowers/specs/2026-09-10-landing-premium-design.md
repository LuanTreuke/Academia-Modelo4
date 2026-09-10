# Landing page de academia — Modelo 4

Data: 2026-09-10

## Contexto

Quarto template genérico de landing page para academias, para portfólio
e revenda.

Este partiu de uma **referência de layout indicada pelo cliente**: o
site bioritmo.com.br. O que foi reaproveitado é a *estrutura* — a ordem
das seções, o ritmo da página e o tipo de bloco de cada uma. Nome,
marca, textos, fotos e paleta são próprios, e nenhum conteúdo do site de
referência foi copiado.

## Conceito

Site de academia premium com várias unidades. Onde os modelos 1 a 3
falam de uma academia só, este vende uma **rede**: unidades, aplicativo
próprio e planos por abrangência.

A página é conduzida por fotografia em blocos grandes e arredondados,
com títulos em serifa e uma palavra em itálico vermelho por seção. É o
modelo mais comercial dos quatro.

## Escopo

Inclui: hero fotográfico, manifesto sobre foto com cartão sobreposto,
declaração tipográfica, vitrine de fotos com etiquetas, modalidades em
cards, unidades, planos, seção de aplicativo com código para leitura e
rodapé em colunas.

**Diferenças pedidas em relação à referência:**

- O hero é uma **foto**, não um vídeo.
- A seção de modalidades vira **cards em grade**, no lugar da lista
  sanfonada da referência.
- A seção de aplicativo mantém a estrutura da referência, mas o
  aplicativo é fictício e o código de leitura é decorativo, com um aviso
  explícito na própria seção.

Não inclui: back-end, área do aluno, pagamento, CMS, agendamento, mapa
de unidades interativo.

## Stack e restrições

Iguais aos outros: HTML, CSS e JavaScript puros, módulos ES, sem build e
sem dependências.

## Estrutura de arquivos

```
Academia-Modelo4/
├── index.html
├── LEIA-ME.md
├── docs/superpowers/specs/
└── assets/
    ├── css/    base.css · layout.css · secoes.css
    ├── js/     dados.js · conteudo.js · util.js · principal.js
    └── img/    as seis fotos
```

## Modelo de dados

`assets/js/dados.js` exporta `ACADEMIA`, o único arquivo que o cliente
edita.

```js
export const ACADEMIA = {
  nome, whatsapp, telefone, email, cnpj,
  marca: { corBase, corAcento },
  hero: { titulo, linha, botao },
  manifesto: { titulo, colunas[], botao },
  declaracao,
  vitrine: [ { imagem, alt, etiquetas[] } ], vitrineBotao,
  modalidades: { chapeu, titulo, cards[] },
  unidades: { titulo, linha, botao, lista[], horario },
  app: { titulo, texto, chamada, instrucao, recursos[] },
  planos: [ { nome, preco, texto } ],
  rodape: { tagline, colunas[], redes[] },
};
```

**Sotaque tipográfico:** títulos escritos com uma palavra entre
asteriscos — `'Treine no seu *pulso*'` — saem com essa palavra em
itálico e na cor de destaque. A conversão é feita nó a nó em
`util.js`, nunca por `innerHTML`, então texto do cliente com `<` ou `&`
não vira marcação.

## Seções da página

1. **Hero** — foto em tela cheia, título com palavra destacada, linha de
   apoio e botão pílula.
2. **Manifesto** — título gigante sobre foto de fundo, com um cartão
   escuro arredondado por cima trazendo duas colunas de texto e um botão.
3. **Declaração** — uma frase em serifa gigante sobre fundo claro, com o
   `&` em itálico vermelho.
4. **Vitrine** — carrossel horizontal de fotos verticais arredondadas,
   cada uma com etiquetas sobrepostas, e um botão ao fim.
5. **Modalidades** — grade de cards com código, duração, nome e
   descrição. É a seção reformulada em relação à referência.
6. **Unidades** — foto larga com cartão escuro sobreposto listando as
   unidades e o horário.
7. **Planos** — três planos por abrangência de acesso.
8. **Aplicativo** — texto e lista de recursos à esquerda, caixa de
   download com código quadrado à direita.
9. **Rodapé** — marca e contato à esquerda, três colunas de links,
   barra inferior com redes e dados legais.

## Sistema visual

Paleta pedida: cinza escuro na maior parte, cinza claro e vermelho vivo
nos detalhes.

- `--grafite #1c1d1f` como fundo dominante, `--cinza-claro #e8e9eb` nas
  seções invertidas, `--vermelho #e6252d` só em destaque, botão e
  detalhe.
- As seções alternam entre escura e clara. Isso exige atenção: o botão
  vazado nasce para fundo escuro e precisa da tinta invertida quando
  cai numa seção clara.
- **Tipografia:** Instrument Serif nos títulos, com itálico real usado
  como sotaque, e Manrope no texto. Nenhuma das duas aparece nos outros
  três modelos.
- Formas arredondadas — botões em pílula, cartões com raio grande — que
  é o que aproxima o resultado da referência sem copiar nada dela.

## Imagens

Seis fotos geradas para este projeto, na paleta do site e com muitos
aparelhos à mostra:

| Arquivo | Papel |
|---|---|
| `hero.jpg` | fundo do hero |
| `manifesto.jpg` | fundo da seção de manifesto |
| `sala-1.jpg` · `sala-2.jpg` · `sala-3.jpg` | os três blocos da vitrine |
| `unidades.jpg` | foto da seção de unidades |

Regra aprendida na geração: pedir explicitamente **nenhuma palavra,
letreiro ou logotipo** na imagem. Sem isso o gerador inventa uma marca
na parede, o que num template revendido é defeito.

## Acessibilidade e resiliência

Contraste AA sobre foto, inclusive no celular, onde o véu lateral do
hero vira escurecimento uniforme. Foto que falta some sem quebrar o
bloco. `prefers-reduced-motion` respeitado.

Sem JavaScript: identidade, títulos, um aviso por seção interativa e o
bloco de contato completo no rodapé.

## Verificação

1. As seis fotos carregam e nenhuma requisição quebra.
2. Nenhuma foto contém texto, letreiro ou marca inventada.
3. O código quadrado da seção de aplicativo desenha e a seção avisa que é fictício.
4. Botões legíveis em todas as seções, claras e escuras.
5. Layout íntegro a 375px, 768px e 1280px, sem rolagem horizontal.
6. Trocar `nome` e as duas cores da marca em `dados.js` muda a página inteira.
7. Nenhum texto, imagem ou marca do site de referência aparece no resultado.
