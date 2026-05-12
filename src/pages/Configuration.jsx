import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// Importamos los modales desde la carpeta de UI de la feature
import { Card } from "@/widget/ui";
import { AccountInformation, DesactivateAccount, ChangePassword } from "@/features/Configuration/ui";

const Configuration = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [showDesactivate, setShowDesactivate] = useState(false);

  return (
    <Container className="text-white py-5 pt-3 px-3 vh-100">
      <Row className="mb-5">
        <Col>
          <h1 className="fw-bold display-5">Tu cuenta</h1>
          <p className="text-secondary">
            Administra la configuración de tu perfil y las opciones de seguridad de tu cuenta.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Información de cuenta */}
        <Col xs={12} lg={4}>
          <Card
            variant="primary"
            icon="bi bi-person-badge"
            title="Información de cuenta"
            description="Revisa tu nombre de usuario, dirección de correo electrónico y datos básicos."
            onClick={() => setShowInformation(true)}
          />
        </Col>

        {/* Cambio de contraseña */}
        <Col xs={12} lg={4}>
          <Card
            variant="primary"
            icon="bi bi-shield-lock"
            title="Seguridad"
            description="Protege tu acceso actualizando tu contraseña de forma periódica."
            onClick={() => setShowChangePassword(true)}
          />
        </Col>

        {/* Desactivación */}
        <Col xs={12} lg={4}>
          <Card
            variant="danger"
            icon="bi bi-person-x"
            title="Desactivar cuenta"
            description="Aprende cómo puedes suspender o eliminar tu presencia de forma permanente."
            onClick={() => setShowDesactivate(true)}
          />
        </Col>
      </Row>

      {/* Modales con las variantes de contraste que definimos */}
      <ChangePassword 
        show={showChangePassword} 
        handleClose={() => setShowChangePassword(false)} 
      />
      <AccountInformation 
        show={showInformation} 
        handleClose={() => setShowInformation(false)} 
      />
      <DesactivateAccount 
        show={showDesactivate} 
        handleClose={() => setShowDesactivate(false)} 
      />
    </Container>
  );
};

export default Configuration;