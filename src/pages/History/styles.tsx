import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1; //para ocupar o máximo de espaço possível onde estiver o elemento
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  // porque foi criado esse componente - é para ser possível fazer scroll na div, porque em table não é possível
  flex: 1; //para ocupar o máximo de espaço possível onde estiver o elemento
  overflow: auto; // quando o tamanho da tabela for maior que o tamanho do container disponível pra ela, vai ser gerado uma barra de rolagem
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse; // para tirar o espaço entre as células da tabela
    min-width: 600px; //vai forçar que quando estiver um tamanho menor seja gerado o scroll
    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        // selecionando a primeira th
        border-top-left-radius: 8px; //arredondando apenas a ponta do lado esquerdo da primeira th
        padding-left: 1.5rem;
      }
      &:last-child {
        // selecionando a última th
        border-top-right-radius: 8px; //arredondando apenas a ponta do lado direito da útima th
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        // selecionando a primeira td
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        // selecionando a última td
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  // vamos criar um objeto com as cores
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const // forma de dizer que o valor das variáveis acima não vão variar - se não colocarmos vai ficar string, e string pode ser qualquer texto

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS // as cores que temos disponíveis são as keys do meu tipo do meu STATUS_COLORS - TS só consegue ler a tipagem de um objeto JS (por isso passamos o typeof), não consegue ler objeto JS
}

// pra fazer esse componente de Status receber propriedades vamos ter que criar uma interface
export const Status = styled.span<StatusProps>`
  // colocamos a tipagem desse componente entre o sinal de maior e menor - generics
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    //vamos criar um elemento novo dentro de Status dentro do css - before é pra criar no começo do Status - after é no final
    content: ''; //temos que colocar o conteúdo, mesmo que seja em branco
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) =>
      props.theme[
        STATUS_COLORS[props.statusColor]
      ]}; //vamos pegar a nossa propriedade statusColor que está dentro de props
  }
`
