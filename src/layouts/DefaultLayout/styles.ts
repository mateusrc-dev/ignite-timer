import styled from 'styled-components'

// não vamos usar main como tag do componente porque main é para colocar conteúdo principal, no caso vamos usar esse componente pra abraçar todo o conteúdo
export const LayoutContainer = styled.div`
  max-width: 74rem; // vamos deixar a largura um pouco menor pra poder colocar o padding
  height: calc(
    100vh - 10rem
  ); // vamos usar o 'calc' para poder fazer esse cálculo - vamos fazer a subtração para colocarmos margin em cima e em baixo
  margin: 5rem auto;
  padding: 2.5rem; //colocar padding em todos os lados
  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px; //nessa propriedade geralmente usamos unidade fixa
  display: flex;
  flex-direction: column; //porque o Header vai ficar em cima e o conteúdo em baixo
`
