import { Outlet } from "react-router-dom"
type Props = {}

function Layout({}: Props) {
  return (
    <>
        <main>
            <Outlet></Outlet>
        </main>
    </>
  )
}

export default Layout