import styled from 'styled-components' // vamos criar um componente para cada parte da Home

export const HomeContainer = styled.main`
  flex: 1; // para ocupar o máximo de espaço possível - vamos centralizar tudo no centro
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    // uma das coisas legais do styled-components é que podemos fazer a estilização em cascata - selecionar o form dentro de main...
    // vamos colocar os elementos em coluna e dar um espaçamento entre eles
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`
export const BaseCountdownButton = styled.button`
  //vamos usar esse component como base para os outros buttons
  //vamos criar um componente estilizado para o button - é bom evitar colocar muitas cascatas de seleção
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme['gray-100']};
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['green-500']};
  &:not(:disabled):hover {
    // vamos aplicar esse hover somente se o botão não estiver desabilitado
    background: ${(props) => props.theme['green-700']};
  }
`
export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['red-500']};
  &:not(:disabled):hover {
    // vamos aplicar esse hover somente se o botão não estiver desabilitado
    background: ${(props) => props.theme['red-700']};
  }
`
