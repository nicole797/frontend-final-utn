import { useState } from "react"
import { Layout } from "../components/Layout"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [validated, setValidated] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setValidated(false);

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

    console.log(newUser)
    setSuccess("Usuario registrado con éxito")

    setUsername("")
    setEmail("")
    setPassword("")
  }

  return (
    <Layout>
      <h1 className="mb-4">Registrate</h1>

      <section  className="w-50 mx-auto">
        <h2 className="mb-3">Hola, bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label  className="form-label">Username:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">Ingresar</button>
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