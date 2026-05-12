import { Container, Row, Col } from "react-bootstrap";
import { Avatar } from "@/widget/ui";

export const PostSkeleton = ({ 
  user, 
  headerExtra, // Para el "· 2h" o botones de opciones
  actions,     // Slot para renderizar componentes de acción
  children,    // Aquí irá la descripción, imágenes, etc.
  onClick, 
  onProfileClick 
}) => {
  const handleContainerClick = (e) => {
    // Previene la navegación si el clic se originó dentro de un menú de acciones o un modal.
    if (e.target.closest('.dropdown') || e.target.closest('.modal')) {
      return;
    }
    if (onClick) onClick(e);
  };

  return (
    <Container
      fluid
      className="d-flex flex-row border-0 border-bottom border-dark bg-black p-3 py-3 gap-2"
      onClick={handleContainerClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      role={onClick ? "button" : "article"}
    >
      <Avatar 
        src={user?.avatar} 
        alt={user?.nickname} 
        onClick={onProfileClick} 
      />

      <Container fluid className="text-white d-flex flex-column p-0">
        {/* Se agrega position-relative y padding-end (pe-4) para reservar el espacio del botón */}
        <Row className="align-items-center mb-1 gx-2 pe-4 position-relative">
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
          {/* Slot posicionado de forma absoluta para evitar alterar la altura del Row */}
          {actions && (
            <div className="position-absolute top-50 translate-middle-y end-0 p-0" style={{ width: 'auto' }}>
              {actions}
            </div>
          )}
        </Row>

        {/* Aquí se renderiza lo que cada uno necesite */}
        {children}
      </Container>
    </Container>
  );
};