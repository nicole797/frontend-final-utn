import { Footer } from "./Footer"
import { Header } from "./Header"

const Layout = (props) => {
  return (
    <div className={`layout-container ${props.background || ""}`}>
      <Header />
      <main className="layout-main">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export { Layout }
