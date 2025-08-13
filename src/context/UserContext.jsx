import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const UserProvider = (props) => {
  const [user, setUser] = useState(null)

  const login = async (username, password) => {
    // realizar una petición al backend 
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    if (response.ok) {
      const token = await response.json()
      setUser(true)
      return token
    } else {
      return false
    }
  }

  const register = async (userData) => {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      })

      if (!response.ok) throw new Error("Error al registrar usuario")

      const data = await response.json()
      console.log("Usuario registrado:", data)

      // Simular inicio de sesión
      setUser(true)
      return data
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ login, logout, register,user }}>
      {props.children}
    </UserContext.Provider>
  )
}

const useAuth = () => useContext(UserContext)

export { UserProvider, useAuth }