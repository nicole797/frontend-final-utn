import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"

const Register = () => {
  const {register} = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [validated, setValidated] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setValidated(false)

    if (!username || !email || !password) {
      setError("Debes completar todos los campos")
      return
    }
    if (username.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("El correo electrónico no es válido");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setValidated(true);

    const newUser = {
      username,
      email,
      password
    }

    try {
      const result = await register(newUser);
      if (result) {
        setSuccess("Usuario registrado con éxito")
        setUsername("")
        setEmail("")
        setPassword("")
      } else {
        setError("Error al registrar el usuario")
      }
    } catch (err) {
      setError("Error al registrar el usuario");
    }
  }
  return (
    <Layout>
      <section className="form-section">
        <div className="form-container">
          <h1 className="mb-4 text-center">Registrate</h1>
          <h2 className="mb-3 text-center">Hola, bienvenido</h2>
          <form onSubmit={handleSubmit} className={validated ? "was-validated" : ""} noValidate>
            <div className="mb-3">
              <label className="form-label">Nombre de usuario:</label>
              <input
                type="text"
                className="form-control search-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de usuario"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo electrónico:</label>
              <input
                type="email"
                className="form-control search-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control search-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <button type="submit" className="btn btn-primary w-100 mt-2">
              Registrarse
            </button>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export { Register }