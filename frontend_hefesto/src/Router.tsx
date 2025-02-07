import { BrowserRouter,Route,Routes } from "react-router-dom"
import ViewMain from "./views/ViewMain"
import Layout from "./layouts/Layout"
import Chat from "./views/Chat"
type Props = {}

function Router({}: Props) {
  return (
   <BrowserRouter>
    <Routes>
        <Route index path="/" element={<ViewMain></ViewMain>}></Route>
        <Route element={<Layout></Layout>}>
            {/*aqui van mas rutas normales con las que se les agregaran los parametros normales de una ruta pero compartiran el layout*/}
            <Route path="/messenger" element={<Chat></Chat>}></Route>
        </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default Router