import styled from 'styled-components'

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
  -moz-appearance: textfield;
  text-align: center;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const ButtonIncrement = styled.button`
  position: absolute;
  color: ${(props) => props.theme['gray-500']};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  left: 46px;
  top: 12px;
  line-height: 15px;
  &:not(:disabled):hover {
    filter: brightness(0.7);
  }
  &:disabled {
    filter: brightness(0.5);
    cursor: not-allowed;
  }
`

export const ButtonDecrement = styled.button`
  position: absolute;
  color: ${(props) => props.theme['gray-500']};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  left: 6px;
  top: 16px;
  line-height: 5px;
  &:not(:disabled):hover {
    filter: brightness(0.7);
  }
  &:disabled {
    filter: brightness(0.5);
    cursor: not-allowed;
  }
`
