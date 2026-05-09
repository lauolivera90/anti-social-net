import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// Importamos los modales desde la carpeta de UI de la feature
import { AccountInformation, DesactivateAccount, ChangePassword } from "@/features/Configuration/ui";

const Configuration = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [showDesactivate, setShowDesactivate] = useState(false);

  // Clase común para las tarjetas de opción para evitar repetición
  const cardStyle = "p-4 h-100 border border-dark rounded bg-dark bg-opacity-25 transition-all shadow-sm";

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
          <div 
            className={`${cardStyle} cursor-pointer border-hover-primary`} 
            onClick={() => setShowInformation(true)}
            role="button"
          >
            <i className="bi bi-person-badge fs-1 text-primary"></i>
            <h5 className="mt-3 fw-bold">Información de cuenta</h5>
            <p className="small text-secondary mb-0">
              Revisa tu nombre de usuario, dirección de correo electrónico y datos básicos.
            </p>
          </div>
        </Col>

        {/* Cambio de contraseña */}
        <Col xs={12} lg={4}>
          <div 
            className={`${cardStyle} cursor-pointer border-hover-primary`} 
            onClick={() => setShowChangePassword(true)}
            role="button"
          >
            <i className="bi bi-shield-lock fs-1 text-primary"></i>
            <h5 className="mt-3 fw-bold">Seguridad</h5>
            <p className="small text-secondary mb-0">
              Protege tu acceso actualizando tu contraseña de forma periódica.
            </p>
          </div>
        </Col>

        {/* Desactivación */}
        <Col xs={12} lg={4}>
          <div 
            className={`${cardStyle} cursor-pointer border-hover-danger`} 
            onClick={() => setShowDesactivate(true)}
            role="button"
          >
            <i className="bi bi-person-x fs-1 text-danger"></i>
            <h5 className="mt-3 fw-bold text-danger">Desactivar cuenta</h5>
            <p className="small text-secondary mb-0">
              Aprende cómo puedes suspender o eliminar tu presencia de forma permanente.
            </p>
          </div>
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