import { Container, Form, Button } from 'react-bootstrap'
import {useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' 

export default function Login() {
  const [nickname, setNickName] = useState("")
  const [contraseña, setContraseña] = useState("") 
  const { login } = useAuth() 
  const navigate = useNavigate()

  const mLogin = async (e) => {
    e.preventDefault()
    const isValidUser = await validateUser()
    if (!isValidUser || contraseña !== "1234") {
      alert("El usuario o la contraseña son incorrectos")
      return
    }
    login(isValidUser)
    navigate("/home")
  }

  const validateUser = async () => {
    try {
      const response =  await fetch("http://localhost:3000/user");
      if (!response.ok) {
        throw new Error("No se pudo obtener los usuarios");
      }
      const data = await response.json();
      const user = data.find(
      user => user?.nickname?.toLowerCase() === nickname.toLowerCase()
    );

    return user || false;
    }
    catch (error){
      console.error({error: error.message})
    }
  }

  return (
    <Container className='d-flex justify-content-center mt-5'>
      <Form onSubmit={mLogin}>
        <h2>Iniciar Sesión</h2>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control 
            type="text" 
            value={nickname}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="Ingrese su nombre de usuario"
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

