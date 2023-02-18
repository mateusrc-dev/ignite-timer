import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import {
  HistoryContainer,
  HistoryList,
  Status,
  WarningContainer,
} from './styles'
import { formatDistanceToNow } from 'date-fns' // vamos usar esse método para calcular a distância de uma determinada data para a data atual
import ptBR from 'date-fns/locale/pt-BR'
import { Warning } from 'phosphor-react'

export function History() {
  const { cycles } = useContext(CyclesContext) // conseguimos ter acesso a cycles através do context

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles &&
              cycles.map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} minutos</td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.startDate), {
                        addSuffix: true, // para ficar um 'há' na frente
                        locale: ptBR, // para ficar no idioma português
                      })}
                    </td>
                    <td>
                      {
                        cycle.finishedDate && (
                          <Status statusColor="green">Concluído</Status>
                        ) /* o && significa então... se for verdadeiro então... só executa se for verdadeiro, não tem else */
                      }
                      {
                        cycle.interruptedDate && (
                          <Status statusColor="red">Interrompido</Status>
                        ) /* o && significa então... se for verdadeiro então... só executa se for verdadeiro, não tem else */
                      }
                      {
                        !cycle.interruptedDate && !cycle.finishedDate && (
                          <Status statusColor="yellow">Em andamento</Status>
                        ) /* o && significa então... se for verdadeiro então... só executa se for verdadeiro, não tem else */
                      }
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        {cycles.length === 0 ? (
          <WarningContainer>
            <p>
              <Warning />
              Ainda não foi criado nenhum ciclo!
            </p>
          </WarningContainer>
        ) : null}
      </HistoryList>
    </HistoryContainer>
  )
}
