// arquivo que vai ter únicamente código de tipagem de dados (código TS)

import 'styled-components' // vamos importar o styled-components para sobrescrever sobre ele a tipagem em vez de criar tudo do zero (que seria o caso caso não estivessemos importando)
import { defaultTheme } from '../styles/themes/default' // importando o nosso tema

type ThemeType = typeof defaultTheme // o TS fez a tipagem do nosso tema de forma automática, podemos colocar essa tipagem em uma variável - typeof mostra o tipo de um dado

declare module 'styled-components' {
  // criando uma tipagem para o módulo styled-components do npm - isso vai fazer com que toda vez que o styled-component seja importado em um arquivo ele vai puxar essa tipagem
  export interface DefaultTheme extends ThemeType {} // DefaultTheme é uma interface que está vazia na tipagem do styled components - vamos usar ela para dizer qual a tipagem do nosso tema - com isso o nosso editor vai segerir os dados do nosso tema quando estivermos trabalhando com ele
}
