import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

export default function Register() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error al cargar usuarios:", err));
  }, []);

  const toLogin = () => {
    navigate("/login")
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nickName || !email || !contraseña) {
      alert("Completá todos los campos.");
      return;
    }

    const yaExisteUsuario = usuarios.some(u => u.nickName === nickName);
    const yaExisteMail = usuarios.some(u => u.mail === email);

    if (yaExisteUsuario) {
      alert("Ese nickName ya está en uso.");
      return;
    }
    if (yaExisteMail) {
      alert("Ese mail ya está en uso.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickName,
          mail: email,
          password: "123456"
        })
      });

      if (!res.ok) throw new Error("Error al registrar");

      const usuarioCreado = await res.json();
      console.log('Usuario creado con exito: ', usuarioCreado)
      navigate("/login");

    } catch (error) {
      console.error("Registro falló:", error);
      alert("No se pudo registrar.");
    }
  };

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
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <Form onSubmit={handleRegister}>
            <h1 className="'text-black mb-4 border-0 border-bottom border-dark p-5">Registrarse</h1>

            <Form.Group className="mb-3">
              <Form.Control
                type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} 
                placeholder="Nombre de usuario"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"/>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Control type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)}
                placeholder="Contraseña"/> 
            </Form.Group>

            <button className="btn btn-primary">Registrarse</button>
          </Form>
        </Container>
        <div className='d-flex flex-row gap-2 mt-5'>
          <p>No tienes una cuenta?</p>
          <a className='text-primary' onClick={toLogin}>Loguearse</a>
        </div>
      </div>
    </div>
  );
}