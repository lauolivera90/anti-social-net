import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error al cargar usuarios:", err));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nickName || !email || !contraseña) {
      alert("Completá todos los campos.");
      return;
    }

    const yaExiste = usuarios.some(u => u.nickName === nickName);
    if (yaExiste) {
      alert("Ese nickName ya está en uso.");
      return;
    }

    const nuevoUsuario = { nickName, email };

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario)
      });

      if (!res.ok) throw new Error("Error al registrar");

      const usuarioCreado = await res.json();
      login(usuarioCreado);
      navigate("/");

    } catch (error) {
      console.error("Registro falló:", error);
      alert("No se pudo registrar.");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Form onSubmit={handleRegister}>
        <h2>Registrarse</h2>

        <Form.Group className="mb-3">
          <Form.Label>NickName</Form.Label>
          <Form.Control
            type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} 
            placeholder="Ingrese un NickName"/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su email"/>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)}
            placeholder="Ingrese una contraseña"/> 
        </Form.Group>

        <Button variant="success" type="submit">
          Registrarse
        </Button>
      </Form>
    </Container>
  );
}