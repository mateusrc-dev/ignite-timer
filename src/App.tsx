import { ThemeProvider } from 'styled-components' // o tema só vai ser aplicado para os elementos que estiverem dentro do ThemeProvider - ThemeProvider é um componente e ele recebe uma propriedade chamada 'theme'
import { Button } from './Components/Button'
import { GlobalStyle } from './styles/global' // é importante que o GlobalStyle esteja dentro do ThemeProvider, se não ele não vai ter acesso as variáveis do nosso tema - colocando o GlobalStyle abaixo ele é aplicado no projeto
import { defaultTheme } from './styles/themes/default' // importando o nosso tema

export function App() {
  return (
    // agora vamos ter acesso aos temas dentro do componente ButtonContainer que está em 'defaultTheme' - podemos criar dois temas e ficar alternando eles usando um estado do react (ex. esse estado muda em um click e toda a aplicação fica responsiva)
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello World</h1>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="success" />
      <Button variant="danger" />
      <Button />
      <GlobalStyle />
    </ThemeProvider>
  )
}
