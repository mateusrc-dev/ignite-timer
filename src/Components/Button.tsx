import { ButtonContainer, ButtonVariant } from "./Button.styles"

interface ButtonProps { //vamos criar uma interface para dizer o que o button vai receber e o tipo desses dados
  variant?: ButtonVariant; //vamos colocar uma propriedade que não existe na tag button nativo do html - vamos definir quais cores esse dado pode receber - interrogação é porque o dado é opcional - não precisa ser necessariamente passado como propriedade
}

//abaixo se a cor não for passada para o componente Button o padrão vai ser 'primary'
export function Button( {variant = 'primary'}: ButtonProps) { //poderiamos passar uma className para o ButtonContainer - vamos passar uma propriedade para o componente de estilização - como variant não existe como propriedade, temos que criar uma interface para definir ela em ButtonContainer
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}