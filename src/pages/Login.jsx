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

  const toRegister = () =>{
    navigate("/register")
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
    <div className="d-flex vh-100">
      <div className="w-100 h-100">
        <img
          src="https://i.pinimg.com/736x/79/0e/44/790e44391a38a9589e32c846947a01bb.jpg"
          alt="backGround"
          className="w-100 h-100 object-fit-cover"
          style={{ display: "block" }}
        />
      </div>
      <div className='w-100 d-flex flex-column justify-content-center align-items-center gap-3 p-5'>
        <Container className='d-flex flex-column justify-content-center align-items-center'>
          <Form onSubmit={mLogin}>
            <h1 className='text-black mb-4 border-0 border-bottom border-dark p-5'>Iniciar Sesión</h1>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control className='mb-3' 
                type="text" 
                value={nickname}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="Nombre de usuario"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
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
        <div className='d-flex flex-row gap-2 mt-5'>
          <p>No tienes una cuenta?</p>
          <a className='text-primary' onClick={toRegister}>Registrarse</a>
        </div>
      </div>
    </div>
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

