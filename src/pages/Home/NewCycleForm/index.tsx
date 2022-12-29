import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '..'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext) // importando o activeCycle porque usamos ele aqui
  const { register } = useFormContext() // vamos usar o próprio contexto de react-hook-form - esse contexto só funciona se tiver um Provider por volta do componente que está usando o useFormContext

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
