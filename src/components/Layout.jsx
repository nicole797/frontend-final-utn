import { Footer } from "./Footer"
import { Header } from "./Header"
import { Navbar } from "./Navbar"

const Layout = (props) => {
  return (
    <div className={props.background}>
      <Header />
      <Navbar />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export { Layout }