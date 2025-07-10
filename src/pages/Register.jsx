import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

export default function Register() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error al cargar usuarios:", err));
  }, []);

  const toLogin = () => navigate("/login");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError(""); // Reseteamos el estado de error al intentar un nuevo registro.

    if (!nickName || !email || !contraseña) {
      setError("Completá todos los campos.");
      return;
    }

    // Validación básica del formato del email.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    const yaExisteUsuario = usuarios.some(u => u.nickName === nickName);
    const yaExisteMail = usuarios.some(u => u.mail === email);

    if (yaExisteUsuario) {
      setError("Ese nickname ya está en uso.");
      return;
    }

    if (yaExisteMail) {
      setError("Ese email ya está en uso.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickName,
          mail: email,
          password: contraseña,
        }),
      });

      if (!res.ok) throw new Error("Error al registrar");

      const usuarioCreado = await res.json();
      console.log("Usuario creado con éxito:", usuarioCreado);
      navigate("/login");
    } catch (error) {
      console.error("Registro falló:", error);
      setError("No se pudo registrar. Intenta nuevamente.");
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Background image */}
      <div className="w-100 h-100">
        <img
          src="https://i.pinimg.com/736x/79/0e/44/790e44391a38a9589e32c846947a01bb.jpg"
          alt="Fondo visual"
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      {/* Formulario de registro */}
      <Container className="w-100 bg-light d-flex flex-column justify-content-center align-items-center gap-3 p-5">
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <Form onSubmit={handleRegister}>
            <h1 className="text-black mb-4 border-0 border-bottom border-dark p-5">Registrarse</h1>

            {/* Campo Nickname */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="Nombre de usuario"
              />
            </Form.Group>

            {/* Campo Email */}
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Group>

            {/* Campo Contraseña */}
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Contraseña"
              />
            </Form.Group>

            {/* Mensaje de error */}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Registrarse
            </Button>
          </Form>
        </Container>

        <Container className="d-flex flex-row gap-2 mt-5 justify-content-center">
          <p>¿Ya tienes una cuenta?</p>
          <a className="text-primary" onClick={toLogin}>
            Iniciar sesión
          </a>
        </Container>
      </Container>
    </div>
  );
}
