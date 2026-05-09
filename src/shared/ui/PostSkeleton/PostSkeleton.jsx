import { Container, Row, Col } from "react-bootstrap";
import { Avatar } from "@/widget/ui";

export const PostSkeleton = ({ 
  user, 
  headerExtra, // Para el "· 2h" o botones de opciones
  children,    // Aquí irá la descripción, imágenes, etc.
  onClick, 
  onProfileClick 
}) => {
  return (
    <Container
      fluid
      className="d-flex flex-row border-0 border-bottom border-dark bg-black p-3 py-3 gap-2"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      role={onClick ? "button" : "article"}
    >
      <Avatar 
        src={user?.avatar} 
        alt={user?.nickname} 
        onClick={onProfileClick} 
      />

      <Container fluid className="text-white d-flex flex-column p-0">
        <Row className="align-items-center mb-1 gx-2">
          <Col as="span" xs="auto" className="fw-bold text-capitalize" onClick={onProfileClick}>
            {user?.nickname || "Desconocido"}
          </Col>
          <Col as="span" xs="auto" className="text-secondary small" onClick={onProfileClick}>
            @{user?.nickname?.toLowerCase() || "desconocido"}
          </Col>
          {headerExtra && (
            <Col as="span" xs="auto" className="text-secondary small">
              {headerExtra}
            </Col>
          )}
        </Row>

        {/* Aquí se renderiza lo que cada uno necesite */}
        {children}
      </Container>
    </Container>
  );
};