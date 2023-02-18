import styled from 'styled-components'

// não vamos usar main como tag do componente porque main é para colocar conteúdo principal, no caso vamos usar esse componente pra abraçar todo o conteúdo
export const LayoutContainer = styled.div`
  max-width: 74rem; // vamos deixar a largura um pouco menor pra poder colocar o padding
  height: calc(
    100vh - 10rem
  ); // vamos usar o 'calc' para poder fazer esse cálculo - vamos fazer a subtração para colocarmos margin em cima e em baixo
  margin: 5rem auto;
  padding: 1.5rem 2.5rem; //colocar padding em todos os lados
  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px; //nessa propriedade geralmente usamos unidade fixa
  display: flex;
  flex-direction: column; //porque o Header vai ficar em cima e o conteúdo em baixo
  overflow: auto;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme['gray-100']};
    border-radius: 10px;
    width: 0px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme['gray-400']};
    border-radius: 0px;
    width: 0px;
    border-radius: 10px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`
