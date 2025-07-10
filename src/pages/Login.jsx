import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [nickname, setNickName] = useState('');
  const [contraseña, setContraseña] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const mLogin = async (e) => {
    e.preventDefault();
    const isValidUser = await validateUser();
    if (!isValidUser || contraseña !== '1234') {
      alert('El usuario o la contraseña son incorrectos');
      return;
    }
    login(isValidUser);
    navigate('/home');
  };

  const validateUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/user');
      if (!response.ok) throw new Error('No se pudo obtener los usuarios');

      const data = await response.json();
      return data.find(user => user?.nickname?.toLowerCase() === nickname.toLowerCase()) || false;
    } catch (error) {
      console.error({ error: error.message });
      return false;
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="w-100 h-100">
        <img
          src="https://i.pinimg.com/736x/79/0e/44/790e44391a38a9589e32c846947a01bb.jpg"
          alt="Fondo visual"
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="w-100 d-flex flex-column justify-content-center align-items-center gap-3 p-5 bg-light">
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <Form onSubmit={mLogin} className="w-100" style={{ maxWidth: 400 }}>
            <h1 className="text-black mb-4 border-bottom border-dark pb-2 text-center">Iniciar Sesión</h1>

            <Form.Group className="mb-3" controlId="formNickname">
              <Form.Label className="visually-hidden">Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                value={nickname}
                required
                onChange={(e) => setNickName(e.target.value)}
                placeholder="Nombre de usuario"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="visually-hidden">Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={contraseña}
                required
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Contraseña"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Iniciar sesión
            </Button>
          </Form>
        </Container>

        <div className="d-flex flex-row gap-2 mt-4">
          <p className="m-0">¿No tienes una cuenta?</p>
          <button type="button" className="btn btn-link p-0 m-0" onClick={() => navigate('/register')}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
