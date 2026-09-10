# Landing page de academia — Modelo 4

Site de uma página só, em HTML, CSS e JavaScript puros. Sem build, sem
dependências, sem framework.

**Para quem serve:** academia premium com mais de uma unidade, que tem
aplicativo próprio e vende plano por abrangência de acesso. É o modelo
mais comercial dos quatro.

**Sobre a referência:** o layout foi construído a partir da estrutura de
um site indicado pelo cliente — a ordem das seções e o tipo de bloco de
cada uma. Nome, textos, fotos, paleta e código são originais. Nada do
site de referência foi copiado, e o template pode ser revendido.

## Como rodar na sua máquina

```bash
npx --yes serve .
```

Ou, com Python:

```bash
py -m http.server 5176
```

Em hospedagem é só subir a pasta — não tem passo de build.

## Como trocar de cliente

Tudo está em **`assets/js/dados.js`**:

| Campo | O que é |
|---|---|
| `nome` | Topo, rodapé e título da aba |
| `whatsapp` | Só números, com país e DDD |
| `telefone`, `email`, `cnpj` | Rodapé |
| `marca.corBase` e `marca.corAcento` | As duas cores mudam o site inteiro |
| `hero` | Título, linha de apoio e texto do botão |
| `manifesto` | Título e as duas colunas do cartão |
| `declaracao` | A frase gigante do meio da página |
| `vitrine` | As três fotos e suas etiquetas |
| `modalidades` | Os cards de aula |
| `unidades` | Lista de endereços e horário |
| `planos` | Nome, preço e descrição |
| `app` | Textos da seção de aplicativo |
| `rodape` | Tagline, colunas de links e redes |

O único conteúdo fora daí é o bloco `<noscript>` no rodapé do
`index.html`. Atualize os contatos dele junto com o `dados.js`.

### A palavra em destaque

Os títulos aceitam uma palavra entre asteriscos, que sai em itálico e na
cor da marca:

```js
titulo: 'Treine no seu *pulso*'
```

É o sotaque tipográfico do site. Use uma palavra por título — duas
poluem.

### O aplicativo é fictício

A seção de aplicativo existe para o cliente que tem um. O código
quadrado é **desenhado em SVG e não codifica nada**, e a própria seção
avisa isso em letra miúda.

Quando o cliente tiver app de verdade:

1. Gere o código real apontando para a loja e salve em `assets/img/`.
2. Em `assets/js/conteudo.js`, troque a chamada de `desenharCodigoFalso`
   por uma `<img>` com esse arquivo.
3. Apague o parágrafo `.app__ficticio` do `index.html`.

Enquanto isso não acontecer, **deixe o aviso**. Código falso sem aviso
numa página publicada é o tipo de detalhe que queima a confiança do
visitante.

### Trocando as fotos

| Arquivo | Onde aparece |
|---|---|
| `hero.jpg` | Fundo do topo |
| `manifesto.jpg` | Fundo da seção de manifesto |
| `sala-1.jpg`, `sala-2.jpg`, `sala-3.jpg` | Os três blocos da vitrine |
| `unidades.jpg` | Foto da seção de unidades |

Se for gerar fotos por IA, **peça explicitamente que não haja nenhuma
palavra, letreiro ou logotipo na imagem**. Sem isso o gerador inventa
uma marca na parede — aconteceu duas vezes aqui e as duas imagens
tiveram que ser refeitas.

## Estrutura

```
index.html
assets/
  css/
    base.css      cores, tipografia, reset
    layout.css    cabeçalho, botões, rodapé
    secoes.css    estilo de cada seção
  js/
    dados.js      ← o arquivo do cliente
    conteudo.js   preenche todas as seções
    util.js       funções compartilhadas e a palavra em destaque
    principal.js  amarra tudo
  img/            as seis fotos
```

## Cuidado ao editar o CSS

As seções alternam entre **fundo escuro e fundo claro**. Um botão ou
texto que fica bom numa some na outra — foi exatamente o que aconteceu
com o botão da vitrine durante a construção.

Se você adicionar um elemento numa seção clara (`.secao--vitrine`,
`.secao--modalidades`, `.secao--app`, `.rodape`), confira a cor dele
antes de dar por pronto. As variáveis `--claro-texto`,
`--claro-texto-suave` e `--claro-linha` existem para isso.

## Os quatro modelos, lado a lado

| | Modelo 1 | Modelo 2 | Modelo 3 | Modelo 4 |
|---|---|---|---|---|
| Academia | Completa, de bairro | Só musculação | Completa, de bairro | Rede premium |
| Proposta | A recepção | A ficha técnica | O ensaio fotográfico | A rede |
| Recurso âncora | Quiz e mapa de lotação | Planta baixa e inventário | Ampliação de foto | Vitrine, cards e app |
| Visual | Escuro, condensado, latão | Claro, técnico, laranja | Escuro, serifa leve, bronze | Grafite e vermelho, serifa com itálico |
