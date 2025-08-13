import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Dashboard }  from "../pages/Dashboard"
import { Login }  from "../pages/Login"
import { Register } from "../pages/Register"
import { NotFound }  from "../pages/NotFound"
import { PrivateRoute} from "../components/PrivateRoute"
import { About } from "../pages/About"

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrate" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }