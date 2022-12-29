import { HandPalm, Play } from 'phosphor-react'
import { useForm, FormProvider } from 'react-hook-form' // vamos importar da biblioteca que lida com formulários
import { zodResolver } from '@hookform/resolvers/zod' // biblioteca que instalamos pra fazer a integração - temos uma integração específica para o zod
import * as zod from 'zod' // vamos importar tudo de zod e dar um nome pra isso 'vai ser zod' - isso porque essa biblioteca não tem um export default
import { createContext, useState } from 'react'
// import { differenceInSeconds } from 'date-fns' // vamos importar uma função que calcula a diferença de duas datas em segundos
import { Countdown } from './Countdown'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './NewCycleForm'

interface Cycle {
  // vamos criar a interface para definir o formato de cada ciclo que adicionarmos na aplicação
  id: string // vamos ter vários ciclos registrados (lista de ciclos), por isso vai ser importante termos um id
  task: String
  minutesAmount: number
  startDate: Date // esse Date é do JS - é tanto data como horário - para ter como base para saber quanto tempo passou
  interruptedDate?: Date // essa data é opcional porque só vai existir se a pessoa interromper o ciclo
  finishedDate?: Date // essa data é opcional porque só vai existir se o ciclo finalizar
}

interface CyclesContextType {
  // vamos falar aqui quais informações vamos colocar dentro do contexto - as informações que Countdown precisa
  activeCycle: Cycle | undefined // vai ser undefined quando o usuário não tiver iniciado nenhum ciclo
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType) // vamos criar o contexto dos ciclos - temos que colocar o 'as' para que em value em Provider sugira os valores a serem inseridos no contexto - para o Countdown conseguir acessar esse contexto, precisamos exportar ele

const newCycleFormValidationSchema = zod.object({
  // vamos criar um esquema para validar os dados do nosso formulário - vamos usar object porque vamos validar um objeto (os dados do formulário vem em um objeto)
  task: zod.string().min(1, 'Informe a tarefa!'), // vamos colocar o tipo de dado, o mínimo de caracteres e a mensagem de validação
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos!')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos!'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // vamos usar o zod para inferir (definir automaticamente) os dados e tipos de dados do formulário do esquema de validação - infer é do TS - TS não consegue entender uma variável JS, é preciso converter essa variável em uma tipagem, por isso usamos o typeof

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]) // vamos dizer para o estado que ele vai armazenar uma lista de ciclos com o generics (um array de ciclos)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null) // estado que vai armazenar o 'id' do ciclo ativo - generics para fazer a tipagem do dado do estado em generics - vai inicializar como nulo porque o valor inicial do ciclo é nulo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) // esse estado vai armazenar a quantidade de segundos que passaram após o ciclo ter sido criado

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  }) // useForm retorna um objeto com várias funções dentro dele - por isso podemos desestruturar - quando usamos o useForm() é como se estivessemos criando um novo formulário na aplicação e a função register fala quais campos vou ter no formulário - register recebe o nome do input (é uma função que recebe parâmetros) e retorna alguns métodos que usamos pra trabalhar com input (onChange, onBlur, onFocus...) - vamos importar a função watch para observar determinado input - no objeto de configurações vamos colocar o esquema de validação (regras de validação - vamos criar um objeto para colocar essas regras) - também no objeto de configurações podemos passar a propriedade defaultValues e dizer os valores iniciais dos campos do formulário - vamos passar um generic para o useForm com a tipagem de data

  const { reset, watch, handleSubmit } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // vamos retornar o ciclo que tenha o 'id' igual ao 'id' do ciclo ativo

  function setSecondsPassed(seconds: number) {
    // vamos criar uma função para atualizar os segundos que passam que vai ser chamada do componente Countdown
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    // é melhor criar uma nova função pra enviar no contexto do que enviar uma função de useState pra atualizar o estado no contexto (essa função foi definida aqui porque usa a função setCycles que só exite dentro de Home)
    setCycles((state) =>
      state.map((cycle) => {
        // map vai percorrer cada ciclo dentro de 'cycles' e vai retornar cada ciclo alterado ou não - estamos seguindo os princípios da imutabilidade
        if (cycle.id === activeCycleId) {
          // se o id do cycle corrente for igual ao id do ciclo ativo então...
          return { ...cycle, finishedDate: new Date() } // vamos retornar os dados que já estão do ciclo mais a nova informação com a data atual
        } else {
          return cycle // ciclo não alterado
        }
      }),
    )
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    // vamos usar um método com um nome diferente de handleSubmit que estamos pegando acima em useForm - vamos colocar esse método dentro de handleSubmit abaixo - podemos receber como argumento o data (são os dados do nosso input do nosso formulário)
    const newCycle: Cycle = {
      id: String(new Date().getTime()), // o getTime retorna o tempo em milissegundos
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(), // vamos colocar a data e horário que foi criada o ciclo
    }

    setCycles((state) => [...state, newCycle]) // adicionando o novo ciclo na listagem de ciclos
    setActiveCycleId(newCycle.id) // vamos armazenar o 'id' do ciclo ativo nesse estado
    setAmountSecondsPassed(0) // vamos zerar os a contagem dos segundos pra quando reiniciar o ciclo eles iniciarem corretamente

    reset() // podemos recuperar essa função de useForm - ela automaticamente retorna os campos para o valor inicial (que foi inserido nas configurações)
  }

  function handleInterruptCycle() {
    // função para parar o ciclo
    setCycles((state) =>
      state.map((cycle) => {
        // map vai percorrer cada ciclo dentro de 'cycles' e vai retornar cada ciclo alterado ou não - estamos seguindo os princípios da imutabilidade
        if (cycle.id === activeCycleId) {
          // se o id do cycle corrente for igual ao id do ciclo ativo então...
          return { ...cycle, interruptedDate: new Date() } // vamos retornar os dados que já estão do ciclo mais a nova informação com a data atual
        } else {
          return cycle // ciclo não alterado
        }
      }),
    )
    setActiveCycleId(null) // vamos atualizar o ciclo ativo para nulo
  }

  const task = watch('task') // vamos observar o input de nome 'task' (nome que colocamos dentro de register) em tempo real, com isso podemos fazer a validação em 'disabled' - transforma o nosso formulário em um controlled
  const isSubmitDisabled = !task

  return (
    //  como o button é do tipo submit, a tag 'form' tem que ficar envolvendo ele
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider
            {
              ...newCycleForm /* vamos despejar tudo que tem dentro de newCycleForm - vários métodos do formulário */
            }
          >
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? ( // o button de stop vai ser do tipo button porque não estamos querendo submeter um formulário com ele
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
