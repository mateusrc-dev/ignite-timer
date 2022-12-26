// nesse arquivo vamos definir as nossas rotas

import { Routes, Route } from 'react-router-dom' // vamos importar as rotas
import { DefaultLayout } from './layouts/DefaultLayout'
import { History } from './pages/History'
import { Home } from './pages/Home'

export function Router() {
  return (
    // dentro de Route vamos colocar a rota e o elemento que será renderizado nessa rota - vamos envolver todas as rotas dentro da rota que tem o nosso DefaultLayout - se o path de Route que abraça as outras rotas começa com 'admin', ela vai se somar com o path das que estão dentro (ex. '/admin/products') - por isso é legal colocar um nome do path que tenha haver com o contexto - com isso o layout de DefaultLayout vai ser compartilhado com as rotas que estão dentro
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
