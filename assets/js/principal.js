/**
 * Único lugar que amarra os módulos.
 * Para remover uma seção do template, apague a linha dela aqui e o
 * bloco correspondente no index.html.
 */
import { ACADEMIA } from './dados.js';
import * as conteudo from './conteudo.js';

conteudo.iniciar(ACADEMIA);
