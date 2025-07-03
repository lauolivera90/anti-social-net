import { Container, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthLogin' 

export default function Login() {
  const [email, setEmail] = useState("") 
  const [contraseña, setContraseña] = useState("") 
  const { login } = useAuth() 
  const navigate = useNavigate()

  const mLogin = (e) => {
    e.preventDefault()

    if (!email || contraseña !== "123456") {
      alert("Debes completar el email y usar la contraseña correcta")
      return
    }

    login(email)
    navigate("/home")
  }

  return (
    <Container className='d-flex justify-content-center mt-5'>
      <Form onSubmit={mLogin}>
        <h2>Iniciar Sesión</h2>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su mail"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Contraseña"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>
      </Form>
    </Container>
  )
}

/*const Login = () => {
  const [valor, setValor] = useState('')
  const navigate = useNavigate()

  const mostrarValor = (evento) => {
    setValor(evento.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/home') 
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input onChange={mostrarValor} type="email" placeholder="Ingresá tu email" className="form-control"/>
      <p>{valor}</p>
      <button type="submit">Ingresar</button>
    </form>
  )
}*/

