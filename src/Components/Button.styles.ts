import styled, { css } from "styled-components"; //vamos importar o css para as cores ficarem legais na interpolação dentro de ButtonContainer

export type ButtonVariant = "primary" | "secondary" | "danger" | "success"; //vamos criar uma variável de tipagem - vamos exportar para usar em Button.tsx

//como o ButtonContainer é um componente, precisamos criar uma interface falando quais propriedades ele vai receber
interface ButtonContainerProps {
  variant: ButtonVariant; //aqui não precisa deixar opcional porque sempre vai vim alguma cor pra cá, nem que seja a primary
}

const buttonVariants = {
  //vamos criar uma constante com um objeto que tem nossas cores
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  //isso aqui também é um componente no react (de estilização), por isso inicia com letra maiúscula - estamos criando componentes react com abstrações de css - vamos usar o literals
  width: 100px;
  height: 40px;
  border-radius: 5px;
  border: 0;
  margin: 8px;

  background-color: ${props => props.theme.primary}; //o styled component vai colocar dentro de props o 'theme' - conseguimos acessar o tema dentro de props - podemos pegar as cores do nosso tema
  color: ${props => props.theme.white};

  /*${(props) =>
    css`
      background-color: ${buttonVariants[props.variant]};
    `}*///interpolação para incluir código JS - SC vai executar esse código como uma função que recebe todas as propriedades de ButtonContainer - podemos colocar o background de acordo com o que tem em variant dentro de props (propriedade que foi passada para ButtonContainer)
`;