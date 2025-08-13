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
      <h1 className="mb-4">Registrate</h1>

      <section  className="w-50 mx-auto">
        <h2 className="mb-3">Hola, bienvenido</h2>
        <form onSubmit={handleSubmit} className={validated ? "was-validated" : ""}noValidate>
          <div className="mb-3">
            <label  className="form-label">Username:</label>
            <input
              type="text" className="form-control" value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico:</label>
            <input
              type="email" className="form-control" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password" className="form-control" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">Registrarse</button>
        </form>

        {
          error && (<div className="alert alert-danger mt-3" role="alert">{error}
          </div>
        )}
        {
          success && (
          <div className="alert alert-success mt-3" role="alert">{success}
          </div>
        )}
      </section>
    </Layout>
  )
}

export { Register }