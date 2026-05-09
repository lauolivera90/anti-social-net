import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

export const SectionNav = ({ title, to, extraAction }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Si pasas una ruta específica (ej: "/home"), va ahí. 
    // Si no, vuelve uno atrás en el historial.
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Container 
      fluid 
      className="position-sticky top-0 bg-black text-white px-0 py-3 z-3"
    >
      <Row className="align-items-center">
        <Col xs="auto">
          <i
            className="bi bi-arrow-left fs-5 p-2 rounded-circle hover-effect"
            onClick={handleBack}
            style={{ cursor: 'pointer' }}
            role="button"
          ></i>
        </Col>
        <Col>
          <h5 className="mb-0 fw-bold">{title}</h5>
        </Col>
        {extraAction && (
          <Col xs="auto">
            {extraAction}
          </Col>
        )}
      </Row>
    </Container>
  );
};