import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext) // conseguimos ter acesso a cycles através do context

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <pre>{JSON.stringify(cycles, null, 2)}</pre>
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
            <tr>
              <td>Assistir Naruto</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Assistir Naruto</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="red">Interrompido</Status>
              </td>
            </tr>
            <tr>
              <td>Assistir Naruto</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Assistir Naruto</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="yellow">Em andamento</Status>
              </td>
            </tr>
            <tr>
              <td>Assistir Naruto</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Assistir Naruto</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="red">Interrompido</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
