import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Public = () => {
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");

  return (
    <div fluid className="d-flex flex-row vh-100">
      {/* Background image */}
      <div className="w-100 h-100">
        <img
          src="https://i.pinimg.com/736x/79/0e/44/790e44391a38a9589e32c846947a01bb.jpg"
          alt="Fondo visual"
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      {/* Contenido principal */}
      <Row className="justify-content-center align-items-center w-100 h-100 bg-light">
        <Col xs={12} md={6} lg={4} className="text-center">
          <h1 className="fw-bold text-black">Interacción en todo momento</h1>
          <h3 className="fw-normal text-black">Únete a Antisocial.</h3>

          <Button
            variant="primary"
            className="w-75 mt-4"
            onClick={goToLogin}
            aria-label="Iniciar sesión en Antisocial"
          >
            Iniciar sesión
          </Button>

          <Button
            variant="outline-secondary"
            className="text-black w-75 mt-2"
            onClick={goToRegister}
            aria-label="Registrarse en Antisocial"
          >
            Registrarse
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Public;
