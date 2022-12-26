import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      display: flex; //centralizando o ícone dentro do tamanho de 3rem altura e largura...
      justify-content: center;
      align-items: center;
      color: ${(props) => props.theme['gray-100']};
      border-top: 3px solid transparent; // vamos colocar essa borda para o ícone ficar centralizado, pois tem uma borda abaixo dele
      border-bottom: 3px solid transparent; // adicionando borda sem efeito visual porque vamos colocar um hover nas bordas -  vamos colocar essa borda transparente para o ícone não ser jogado pra cima no hover

      &:hover {
        // quando estiver hover nesse link
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }
      &.active {
        // essa class é adicionada pelo NavLink quando clicamos no link - podemos estilizar ela
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`
