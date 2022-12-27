import { Play } from 'phosphor-react'
// import { useState } from 'react'
import { useForm } from 'react-hook-form' // vamos importar da biblioteca que lida com formulários
import { zodResolver } from '@hookform/resolvers/zod' // biblioteca que instalamos pra fazer a integração - temos uma integração específica para o zod
import * as zod from 'zod' // vamos importar tudo de zod e dar um nome pra isso 'vai ser zod' - isso porque essa biblioteca não tem um export default
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
  // vamos criar um esquema para validar os dados do nosso formulário - vamos usar object porque vamos validar um objeto
  task: zod.string().min(1, 'Informe a tarefa!'), // vamos colocar o tipo de dado, o mínimo de caracteres e a mensagem de validação
  MinutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos!')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos!'),
})

export function Home() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  }) // useForm retorna um objeto com várias funções dentro dele - por isso podemos desestruturar - quando usamos o useForm() é como se estivessemos criando um novo formulário na aplicação e a função register fala quais campos vou ter no formulário - register recebe o nome do input (é uma função que recebe parâmetros) e retorna alguns métodos que usamos pra trabalhar com input (onChange, onBlur, onFocus...) - vamos importar a função watch para observar determinado input - no objeto de configurações vamos colocar o esquema de validação (regras de validação - vamos criar um objeto para colocar essas regras)

  function handleCreateNewCycle(data: any) {
    // vamos usar um método com um nome diferente de handleSubmit que estamos pegando acima de useForm - vamos colocar esse método dentro de handleSubmit abaixo - podemos receber como argumento o data (são os dados do nosso input do nosso formulário)
    console.log(data)
  }

  // console.log(formState.errors) // no formState tem nossas mensagens de erro, podemos importar formState do useForm()

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
