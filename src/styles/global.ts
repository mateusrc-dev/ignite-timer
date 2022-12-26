import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle` //vamos colocar aqui todo o CSS que vai ser global na aplicação 
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0; //por padrão o focus é definido pelo outline no navegador, estamos tirando isso
    box-shadow: 0 0 0 2px ${(props) =>
      props.theme['gray-500']} //o tamanho vai ser 2px, tiramos o blur
  }

  body {
    background: ${(props) =>
      props.theme[
        'gray-900'
      ]}; //vamos usar as cores que estão definidas no nosso tema - ao colocar 'theme.' aparece todas as propriedades que podemos utilizar - devido o traço na variável a sintaxe tem que ser com cochetes
    color: ${(props) => props.theme['gray-300']};  
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`
