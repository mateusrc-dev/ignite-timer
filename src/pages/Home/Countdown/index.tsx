import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../contexts/CyclesContext'
import { CountDownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext) // importando o CyclesContext

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // vamos transformar os minutos do ciclo inserido pelo usuário em segundos

  useEffect(() => {
    let interval: number // number porque o JS coloca uma referência nele (um number) pra podermos depois removermos ele
    if (activeCycle) {
      // se vamos fazer a redução do countdown se houver um ciclo, LÓGICO!
      interval = setInterval(() => {
        // função para fazer os segundos reduzirem, a cada 1000 milissegundos será executada novamente (porque foi o intervalo especificado) - vamos guardar ela em uma variável que será usada na função clearInterval
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate), // vamos usar o new Date para converter para Data (essa informação pode estar vindo como string do localStorage)
        ) // função que calcula a diferença de duas datas em segundos - primeiro parâmetro tem que ser a data mais atual e o segundo a que passou
        if (secondsDifference >= totalSeconds) {
          // se a diferença em segundos entre a data que o ciclo foi criado (activeCycle.startDate) pra data atual (new Date()) for igual ou maior que o total de segundos (totalSeconds) do ciclo quer dizer que o ciclo acabou
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      // esse return vai ser chamado quando um novo useEffect for ativado
      clearInterval(interval) // função para parar o setInterval
    } // podemos ter um retorno do useEffect - vamos criar uma função para deletar os intervalos anteriores que não precisamos mais (porque quando o activeCycle muda, é ativado de novo o useEffect com um novo interval)
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ]) // sempre que usamos uma variável externa no useEffect, temos que colocar ela como uma dependência

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 // vamos subtrair o total de segundos do ciclo menos o segundos que passaram
  const minutesAmount = Math.floor(currentSeconds / 60) // vamos calcular quantos minutos temos dentro dos segundos correntes - como a divisão pode ficar um número quebrado, temos que arredondar esse número para baixo
  const secondsAmount = currentSeconds % 60 // calculando o número de segundos corrente
  const minutes = String(minutesAmount).padStart(2, '0') // vamos preencher a string de minutos pra ficar com o zero na frente
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | Ignite Timer`
    } else if (!activeCycle) {
      document.title = 'Ignite Timer'
    }
  }, [activeCycle, minutes, seconds]) // toda vez que nossos minutos e segundos mudarem, será mudado o título da janela

  return (
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
  )
}
