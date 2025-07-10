import Nav from 'react-bootstrap/Nav';
import Logo from '../Logo/Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import UserIcon from '../UserIcon/UserIcon';
import { Container, Col, Row, Button } from "react-bootstrap";

function AsideNav() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  const goToExplore = () => {
    navigate("/search");
  };

  const goToProfile = () => {
    navigate("/user");
  };

  return (
    <Container fluid className='position-sticky top-0 w-100 d-none d-md-block'>
      <Row className="mb-4">
        <Logo />
      </Row>

      <Row className="text-white mb-2 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={goToHome}>
        <Col md="auto"><i className="bi bi-house-door-fill fs-3" /></Col>
        <Col md="auto"><span className="fs-5">Inicio</span></Col>
      </Row>

      <Row className="text-white mb-2 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={goToProfile}>
        <Col md="auto"><i className="bi bi-person-fill fs-3" /></Col>
        <Col md="auto"><span className="fs-5">Perfil</span></Col>
      </Row>

      <Row className="text-white mb-2 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={goToExplore}>
        <Col md="auto"><i className="bi bi-search fs-3" /></Col>
        <Col md="auto"><span className="fs-5">Explorar</span></Col>
      </Row>

      <Row className="text-white mb-2 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={goToExplore}>
        <Col md="auto"><i className="bi bi-gem fs-3" /></Col>
        <Col md="auto"><span className="fs-5">Destacados</span></Col>
      </Row>

      <Row className="text-white mb-2 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={goToHome}>
        <Col md="auto"><i className="bi bi-dice-5-fill fs-3" /></Col>
        <Col md="auto"><span className="fs-5">Aleatorio</span></Col>
      </Row>

      <Row className="text-black bg-white rounded-5 mt-3 m-1 p-2 d-flex justify-content-center align-items-center">
        <Col md="auto"><i className="bi bi-feather fs-3" id="pluma" /></Col>
        <Col md="auto"><span className="fs-5">Postear</span></Col>
      </Row>

      <Row>
        <UserIcon />
      </Row>
    </Container>
  );
}

export default AsideNav;
