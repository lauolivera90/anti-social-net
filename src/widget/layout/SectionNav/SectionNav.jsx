import { Container, Row, Col } from 'react-bootstrap';
import { useLocate } from "@/shared/hook/useLocate"; // Tu nuevo hook

export const SectionNav = ({ title, to, extraAction }) => {
  const locate = useLocate();

  const handleBack = () => {
    // Si pasas una ruta específica (ej: "/home"), va ahí. 
    // Si no, vuelve uno atrás en el historial.
    if (to) {
      locate(to);
    } else {
      locate(-1);
    }
  };

  return (
    <Container 
      fluid 
      className="position-sticky top-0 bg-black text-white z-3 p-3"
    >
      <Row className="align-items-center">
        <Col xs="auto">
          <i
            className="bi bi-arrow-left fs-5 p-2 ps-1 rounded-circle hover-effect"
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