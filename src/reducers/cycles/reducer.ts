import { ActionTypes } from './actions'

export interface Cycle {
  // vamos criar a interface para definir o formato de cada ciclo que adicionarmos na aplicação
  id: string // vamos ter vários ciclos registrados (lista de ciclos), por isso vai ser importante termos um id
  task: String
  minutesAmount: number
  startDate: Date // esse Date é do JS - é tanto data como horário - para ter como base para saber quanto tempo passou
  interruptedDate?: Date // essa data é opcional porque só vai existir se a pessoa interromper o ciclo
  finishedDate?: Date // essa data é opcional porque só vai existir se o ciclo finalizar
}

interface CyclesState {
  // vamos colocar aqui as informações que vão ser salvas dentro de reducer - vão ser controladas dentro do useReducer
  cycles: Cycle[] // estado que vai armazenar todos os ciclos em um array
  activeCycleId: string | null // estado que vai armazenar o 'id' do ciclo ativo - generics para fazer a tipagem do dado do estado em generics - vai inicializar como nulo porque o valor inicial do ciclo é nulo
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // função para criar um novo cycle - action vai ter os dados do que foi colocado como argumento da função dispatch()
      return {
        // vamos retornar um objeto porque a tipagem de state é um objeto
        ...state, // copiando todos os dados que já tenho no estado pra não mudar o valor de activeCycleId ao adicionar um novo ciclo
        cycles: [...state.cycles, action.payload.newCycle], // vai ser retornado um novo valor sempre que uma action for disparada - adicionando o novo ciclo na listagem de ciclos
        activeCycleId: action.payload.newCycle.id, // vamos armazenar o 'id' do ciclo ativo nesse estado
      }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          // map vai percorrer cada ciclo dentro de 'cycles' e vai retornar cada ciclo alterado ou não - estamos seguindo os princípios da imutabilidade
          if (cycle.id === state.activeCycleId) {
            // se o id do cycle corrente for igual ao id do ciclo ativo então...
            return { ...cycle, interruptedDate: new Date() } // vamos retornar os dados que já estão do ciclo mais a nova informação com a data atual
          } else {
            return cycle // ciclo não alterado
          }
        }),
        activeCycleId: null, // vamos atualizar o ciclo ativo para nulo
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          // map vai percorrer cada ciclo dentro de 'cycles' e vai retornar cada ciclo alterado ou não - estamos seguindo os princípios da imutabilidade
          if (cycle.id === state.activeCycleId) {
            // se o id do cycle corrente for igual ao id do ciclo ativo então...
            return { ...cycle, finishedDate: new Date() } // vamos retornar os dados que já estão do ciclo mais a nova informação com a data atual
          } else {
            return cycle // ciclo não alterado
          }
        }),
        activeCycleId: null, // vamos atualizar o ciclo ativo para nulo
      }
    default:
      return state
  }
}
