import { HandPalm, Play } from 'phosphor-react'
import { useForm, FormProvider } from 'react-hook-form' // vamos importar da biblioteca que lida com formulários
import { zodResolver } from '@hookform/resolvers/zod' // biblioteca que instalamos pra fazer a integração - temos uma integração específica para o zod
import * as zod from 'zod' // vamos importar tudo de zod e dar um nome pra isso 'vai ser zod' - isso porque essa biblioteca não tem um export default
import { useContext } from 'react'
// import { differenceInSeconds } from 'date-fns' // vamos importar uma função que calcula a diferença de duas datas em segundos
import { Countdown } from './Countdown'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './NewCycleForm'
import { CyclesContext } from '../../contexts/CyclesContext'

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
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext) // importando o contexto que agora está em um arquivo separado

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  }) // useForm retorna um objeto com várias funções dentro dele - por isso podemos desestruturar - quando usamos o useForm() é como se estivessemos criando um novo formulário na aplicação e a função register fala quais campos vou ter no formulário - register recebe o nome do input (é uma função que recebe parâmetros) e retorna alguns métodos que usamos pra trabalhar com input (onChange, onBlur, onFocus...) - vamos importar a função watch para observar determinado input - no objeto de configurações vamos colocar o esquema de validação (regras de validação - vamos criar um objeto para colocar essas regras) - também no objeto de configurações podemos passar a propriedade defaultValues e dizer os valores iniciais dos campos do formulário - vamos passar um generic para o useForm com a tipagem de data

  const { reset, watch, handleSubmit } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset() // podemos recuperar essa função de useForm - ela automaticamente retorna os campos para o valor inicial (que foi inserido nas configurações)
  }

  const task = watch('task') // vamos observar o input de nome 'task' (nome que colocamos dentro de register) em tempo real, com isso podemos fazer a validação em 'disabled' - transforma o nosso formulário em um controlled
  const isSubmitDisabled = !task

  return (
    //  como o button é do tipo submit, a tag 'form' tem que ficar envolvendo ele
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider
          {
            ...newCycleForm /* vamos despejar tudo que tem dentro de newCycleForm - vários métodos do formulário */
          }
        >
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? ( // o button de stop vai ser do tipo button porque não estamos querendo submeter um formulário com ele
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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
