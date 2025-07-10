import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

const ProfileNav = ({user, }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <Container fluid className="position-sticky top-0 bg-black text-white pt-3 pb-3">
      <Row className="align-items-center">
        <Col xs="auto" md="auto">
          <i
            className="bi bi-arrow-left fs-5"
            onClick={goBack}
            style={{ cursor: 'pointer' }}
          ></i>
        </Col>
        <Col xs={3} md={3}>
          <h4 className="m-0 text-capitalize">{user.nickname}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileNav;
