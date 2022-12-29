import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import * as zod from 'zod' // vamos importar tudo de zod e dar um nome pra isso 'vai ser zod' - isso porque essa biblioteca não tem um export default
import { useForm } from 'react-hook-form/dist/useForm' // vamos importar da biblioteca que lida com formulários
import { zodResolver } from '@hookform/resolvers/zod' // biblioteca que instalamos pra fazer a integração - temos uma integração específica para o zod

const newCycleFormValidationSchema = zod.object({
  // vamos criar um esquema para validar os dados do nosso formulário - vamos usar object porque vamos validar um objeto (os dados do formulário vem em um objeto)
  task: zod.string().min(1, 'Informe a tarefa!'), // vamos colocar o tipo de dado, o mínimo de caracteres e a mensagem de validação
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos!')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos!'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // vamos usar o zod para inferir (definir automaticamente) os dados e tipos de dados do formulário do esquema de validação - infer é do TS - TS não consegue entender uma variável JS, é preciso converter essa variável em uma tipagem, por isso usamos o typeof

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  }) // useForm retorna um objeto com várias funções dentro dele - por isso podemos desestruturar - quando usamos o useForm() é como se estivessemos criando um novo formulário na aplicação e a função register fala quais campos vou ter no formulário - register recebe o nome do input (é uma função que recebe parâmetros) e retorna alguns métodos que usamos pra trabalhar com input (onChange, onBlur, onFocus...) - vamos importar a função watch para observar determinado input - no objeto de configurações vamos colocar o esquema de validação (regras de validação - vamos criar um objeto para colocar essas regras) - também no objeto de configurações podemos passar a propriedade defaultValues e dizer os valores iniciais dos campos do formulário - vamos passar um generic para o useForm com a tipagem de data
  return (
    // vamos usar label para quando a pessoa clicar no label dê foco no input
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions" // vamos colocar o id do data lista para conectar esse input com o datalist
        {...register('task')} // estamos dando o nome para o nosso input passando ele como parâmetro da função register - não precisamos mais colocar o name - o '...' está pegando o que a função register retorna (os métodos) e acoplando no nosso input como propriedades
        disabled={!!activeCycle} // vamos desabilitar o input caso tiver um ciclo ativo - as duas exclamações é pra transformar em boolean - caso houver um ciclo vai ser true, caso contrário, false
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
        disabled={!!activeCycle}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
