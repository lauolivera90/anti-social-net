import { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Password from "../components/Configuration/Password";
import AcountInformation from "../components/Configuration/AcountInformation";
import Desactivate from "../components/Configuration/Desactivate";
import AsideNav from "../components/AsideNav/AsideNav";


const Configuration = () => {
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showInformation, setShowInformation] = useState(false)
  const [showDesactivate, setShowDesactivate] = useState(false)


  const handleCloseChangePassword = () => setShowChangePassword(false);
  const handleShowChangePassword = () => setShowChangePassword(true);

  const handleCloseInformation = () => setShowInformation(false);
  const handleShowInformation = () => setShowInformation(true);

  const handleCloseDesactivate = () => setShowDesactivate(false);
  const handleShowDesactivate = () => setShowDesactivate(true);


  return (
    <Container fluid className="text-white">
      <Row>
        <Col xs={0} md="auto" className="bg-black border-end border-dark">
            <AsideNav/>
        </Col>
        <Col>
          <Row>
        <Col className="mt-5"><h1>Tu cuenta</h1></Col>
      </Row>
      <Row>
        <Col><p>Mira informacion sobre tu cuenta o aprende sobre tus opciones de desactivacion de cuenta</p></Col>
      </Row>
      <Row className="pt-5">
        <Col xs="auto" md={4}>
            <Row style={{cursor:"pointer"}} onClick={handleShowInformation}>
              <i className="bi bi-person fs-1"></i>
              <h6>Informacion de cuenta</h6>
              <p>Mira informacion de tu cuenta, como tu nombre de usuario y email.</p>
            </Row>
        </Col>
        <Col xs="auto" md={4}>
            <Row style={{cursor:"pointer"}} onClick={handleShowChangePassword}>
              <i className="bi bi-key fs-1"></i>
              <h6>Cambia tu contraseña</h6>
              <p>Cambia tu contraseña en cualquier momento.</p>
            </Row>
        </Col>
        <Col xs="auto" md={4}>
            <Row style={{cursor:"pointer"}} onClick={handleShowDesactivate}>
              <i className="bi bi-heartbreak fs-1"></i>
              <h6>Desactivar tu cuenta</h6>
              <p>Mira como puedes desactivar tu cuenta.</p>
            </Row>
        </Col>
      </Row>
      <Password handleClose={handleCloseChangePassword} show={showChangePassword}></Password>
      <AcountInformation handleClose={handleCloseInformation} show={showInformation}></AcountInformation>
      <Desactivate handleClose={handleCloseDesactivate} show={showDesactivate}></Desactivate>
        </Col>
      </Row>
    </Container>
  );
};

export default Configuration;
