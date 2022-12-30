// vamos colocar tudo que o CycleContext precisa aqui
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  // vamos criar uma interface para 'data' da função que cria um novo ciclo - o contexto tem que ser desacoplado de bibliotecas externas, pois se um dia as bibliotecas mudarem, isso não afete o contexto → por isso vamos criar a tipagem de data da função ‘createNewCycle’
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  // vamos falar aqui quais informações vamos colocar dentro do contexto - as informações que Countdown, Home, History precisam
  cycles: Cycle[] // vamos passar cycles para o contexto para termos acesso em history
  activeCycle: Cycle | undefined // vai ser undefined quando o usuário não tiver iniciado nenhum ciclo
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType) // vamos criar o contexto dos ciclos - temos que colocar o 'as' para que em value em Provider sugira os valores a serem inseridos no contexto - para o Countdown Home e History conseguir acessar esse contexto, precisamos exportar ele

interface CyclesContextProviderProps {
  children: ReactNode // ReactNode nada mais é do que qualquer HTML válido, qualquer JSX válido
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // componente que visualmente não vai ter nada - vamos trazer todos os códigos da Home para não dar erro em value no Provider - também trouxemos funções que precisam dos estados que trouxemos pra cá
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }) // o useReducer recebe dois parâmetros, uma função e o estado inicial que será um objeto com cycles e activeCycleId - a função do primeiro parâmetro de useReducer (que está em outro arquivo) recebe dois parâmetros: state que é o valor atual, em tempo real, da variável de ciclos, e uma action que é qual ação o usuário quer realizar de alteração dentro da variável (action pode ser interromper o ciclo, adicionar um novo ciclo) - setCycles (que agora se chama dispatch) vai ser o método para disparar a ação (não vai ser mais o método pra alterar diretamente o valor de cycles)

  useEffect(() => {
    // salvando os dados dos ciclos no localStorage
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@', stateJSON)
  }, [cyclesState])

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) // esse estado vai armazenar a quantidade de segundos que passaram após o ciclo ter sido criado
  const { cycles, activeCycleId } = cyclesState // como vamos controlar vários estados dentro de useReducer, podemos recuperar eles aqui
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // vamos retornar o ciclo que tenha o 'id' igual ao 'id' do ciclo ativo

  function setSecondsPassed(seconds: number) {
    // vamos criar uma função para atualizar os segundos que passam que vai ser chamada do componente Countdown
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    // é melhor criar uma nova função pra enviar no contexto do que enviar uma função de useState pra atualizar o estado no contexto (essa função foi definida aqui porque usa a função setCycles) - vai ser chamada do componente Countdown
    dispatch(markCurrentCycleAsFinished())
  }

  function createNewCycle(data: CreateCycleData) {
    // vamos usar um método com um nome diferente de handleSubmit que estamos pegando em useForm - vamos colocar esse método dentro de handleSubmit - podemos receber como argumento o data (são os dados do nosso input do nosso formulário) - vai ser chamada do componente Home
    const newCycle: Cycle = {
      id: String(new Date().getTime()), // o getTime retorna o tempo em milissegundos
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(), // vamos colocar a data e horário que foi criada o ciclo
    }

    dispatch(addNewCycleAction(newCycle)) // tenho que mandar uma informação dentro de dispatch que o useReducer consiga distinguir uma action de outra - ao chamar a função dispatch a função dentro de useReducer é executada - o valor que passamos como argumento em dispatch vai ficar no lugar de action em useReducer - vamos enviar um objeto com a propriedade 'type' para identificar a ação para podermos distinguir ela em useReducer

    setAmountSecondsPassed(0) // vamos zerar os a contagem dos segundos pra quando reiniciar o ciclo eles iniciarem corretamente

    // reset() - a função reset agora vai ficar no próprio componente Home, vai ser chamada após essa função
  }

  function interruptCurrentCycle() {
    // função para parar o ciclo  - vai ser chamada do componente Home
    dispatch(interruptCurrentCycleAction())
  }

  return (
    // nessa função 'CyclesContextProvider' temos que falar aqui no return aonde que o conteúdo que é passado como filho do componente superior (onde exportamos essa função) em App vai ser acoplado - children
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
