import { Header } from '../Components/Header'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    // em 'Outlet' vai ficar o conteúdo que é flexível - Outlet nada mais é que um espaço para ser inserido um conteúdo
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
