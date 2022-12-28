import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form' // vamos importar da biblioteca que lida com formulários
import { zodResolver } from '@hookform/resolvers/zod' // biblioteca que instalamos pra fazer a integração - temos uma integração específica para o zod
import * as zod from 'zod' // vamos importar tudo de zod e dar um nome pra isso 'vai ser zod' - isso porque essa biblioteca não tem um export default
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns' // vamos importar uma função que calcula a diferença de duas datas em segundos
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  // vamos criar um esquema para validar os dados do nosso formulário - vamos usar object porque vamos validar um objeto (os dados do formulário vem em um objeto)
  task: zod.string().min(1, 'Informe a tarefa!'), // vamos colocar o tipo de dado, o mínimo de caracteres e a mensagem de validação
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos!')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos!'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // vamos usar o zod para inferir (definir automaticamente) os dados e tipos de dados do formulário do esquema de validação - infer é do TS - TS não consegue entender uma variável JS, é preciso converter essa variável em uma tipagem, por isso usamos o typeof

interface Cycle {
  // vamos criar a interface para definir o formato de cada ciclo que adicionarmos na aplicação
  id: string // vamos ter vários ciclos registrados (lista de ciclos), por isso vai ser importante termos um id
  task: String
  minutesAmount: number
  startDate: Date // esse Date é do JS - é tanto data como horário - para ter como base para saber quanto tempo passou
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]) // vamos dizer para o estado que ele vai armazenar uma lista de ciclos com o generics (um array de ciclos)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null) // estado que vai armazenar o 'id' do ciclo ativo - generics para fazer a tipagem do dado do estado em generics - vai inicializar como nulo porque o valor inicial do ciclo é nulo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) // esse estado vai armazenar a quantidade de segundos que passaram após o ciclo ter sido criado

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  }) // useForm retorna um objeto com várias funções dentro dele - por isso podemos desestruturar - quando usamos o useForm() é como se estivessemos criando um novo formulário na aplicação e a função register fala quais campos vou ter no formulário - register recebe o nome do input (é uma função que recebe parâmetros) e retorna alguns métodos que usamos pra trabalhar com input (onChange, onBlur, onFocus...) - vamos importar a função watch para observar determinado input - no objeto de configurações vamos colocar o esquema de validação (regras de validação - vamos criar um objeto para colocar essas regras) - também no objeto de configurações podemos passar a propriedade defaultValues e dizer os valores iniciais dos campos do formulário - vamos passar um generic para o useForm com a tipagem de data

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // vamos retornar o ciclo que tenha o 'id' igual ao 'id' do ciclo ativo

  useEffect(() => {
    if (activeCycle) {
      // se vamos fazer a redução do countdown se houver um ciclo, LÓGICO!
      setInterval(() => {
        // função para fazer os segundos reduzirem, a cada 1000 milissegundos será executada novamente
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate), // função que calcula a diferença de duas datas em segundos - primeiro parâmetro tem que ser a data mais atual e o segundo a que passou
        )
      }, 1000)
    }
  }, [activeCycle]) // sempre que usamos uma variável externa no useEffect, temos que colocar ela como uma dependência

  function handleCreateNewCycle(data: NewCycleFormData) {
    // vamos usar um método com um nome diferente de handleSubmit que estamos pegando acima em useForm - vamos colocar esse método dentro de handleSubmit abaixo - podemos receber como argumento o data (são os dados do nosso input do nosso formulário)
    const newCycle: Cycle = {
      id: String(new Date().getTime()), // o getTime retorna o tempo em milissegundos
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle]) // adicionando o novo ciclo na listagem de ciclos
    setActiveCycleId(newCycle.id) // vamos armazenar o 'id' do ciclo ativo aqui

    reset() // podemos recuperar essa função de useForm - ela automaticamente retorna os campos para o valor inicial (que foi inserido nas configurações)
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // vamos transformar os minutos do ciclo inserido pelo usuário em segundos
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 // vamos subtrair o total de segundos do ciclo menos o segundos que passaram
  const minutesAmount = Math.floor(currentSeconds / 60) // vamos calcular quantos minutos temos dentro dos segundos correntes - como a divisão pode ficar um número quebrado, temos que arredondar esse número para baixo
  const secondsAmount = currentSeconds % 60 // calculando o número de segundos corrente
  const minutes = String(minutesAmount).padStart(2, '0') // vamos preencher a string de minutos pra ficar com o zero na frente
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task') // vamos observar o input de nome 'task' (nome que colocamos dentro de register) em tempo real, com isso podemos fazer a validação em 'disabled' - transforma o nosso formulário em um controlled
  const isSubmitDisabled = !task

  return (
    // vamos usar label para quando a pessoa clicar no label dê foco no input - como o button é do tipo submit, a tag 'form' tem que ficar envolvendo ele
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions" // vamos colocar o id do data lista para conectar esse input com o datalist
            {...register('task')} // estamos dando o nome para o nosso input passando ele como parâmetro da função register - não precisamos mais colocar o name - o '...' está pegando o que a função register retorna (os métodos) e acoplando no nosso input como propriedades
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="Banana" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5} // no react podemos colocar o valor númerico entre chaves em um atributo - no html nativo colocamos entre aspas - step diz o intervalo que o número vai pular no input
            min={5} // podemos estabelecer o valor mínimo e o valor máximo
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })} // depois do nome do input vamos passar como parâmetro um objeto de configurações - vamos configurar para que o valor do número retorne do tipo number
          />
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>
            {
              minutes[0] /* vamos pegar o primeiro caractere de minutes (que é uma string) */
            }
          </span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
