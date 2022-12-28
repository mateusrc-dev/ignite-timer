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
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap; // é para quando a tela for menor, o texto quebrar para não atravessar o container
`
const BaseInput = styled.input`
  // vamos criar um input base que vai ser usado para criar os outros inputs (um componente que vai ser base pra criar outros componentes)
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: inherit; //o input não herda o font-size do FormContainer - inherit herda o font-size do Container
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  ::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }
`
export const TaskInput = styled(BaseInput)`
  // vamos colocar o BaseInput como um parâmetro aqui
  flex: 1; // se colocar width 100% a linha vai quebrar (é como se colocasse display block) - podemos usar flex-1 porque no Container tem dipsplay flex - flex 1 é pro elemento ocupar o máximo de espaço onde ele estiver
  &::-webkit-calendar-picker-indicator {
    // o & comercial é para referenciar esse mesmo input
    display: none !important; //esse comando é para tirar a setinha do datalist que fica no input
  }
`
export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
export const CountDownContainer = styled.div`
  font-family: 'Roboto Mono', monospace; // font mono é uma fonte na qual todos os caracteres tem uma mesma largura
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 1rem;
  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`
export const Separator = styled.div`
  // vamos criar um componente estilizado para o separador dos minutos e horas
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  overflow: hiden;
  display: flex;
  justify-content: center;
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
