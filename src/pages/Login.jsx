import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const nagivate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

     // Validaciones básicas:
    if (!username.trim()) {
      setError("El nombre de usuario es obligatorio");
      return
    }
    if (!password) {
      setError("La contraseña es obligatoria");
      return
    }

    const isLogin = await login(username, password)

    if (isLogin) {
      setUsername("")
      setPassword("")
      nagivate("/")
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <Layout>
      <section className="form-section">
        <div className="form-container">
          <h1 className="text-center mb-4">Iniciar Sesión</h1>
          <h2 className="text-center mb-3">Hola, bienvenido de nuevo</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="form-error">{error}</div>}
            <button type="submit" className="btn mt-3 w-100">
              Ingresar
            </button>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export { Login }