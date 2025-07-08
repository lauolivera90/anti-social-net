import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

const UserInformation = ({ user, postsCount, commentsCount }) => {
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate(`/user/${user._id}/edit`);
  };

  return (
    <Container fluid className="bg-black p-5 text-white">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md="auto" className="text-center mb-4 mb-md-0">
          <Image
            alt="user icon"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            roundedCircle
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </Col>

        <Col xs={12} md={8}>
          <Row className="align-items-center mb-3">
            <Col xs={12} md={6}>
              <h5 className="mb-1 text-capitalize">{user.nickname}</h5>
              <span className="text-secondary">@{user.nickname}</span>
            </Col>
            <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
              <Button onClick={goToEdit} variant="primary">
                Actualizar perfil
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              <span className="text-white">{postsCount}</span>{' '}
              <span className="text-secondary">Publicaciones</span>
            </Col>
            <Col xs={6} md={4}>
              <span className="text-white">{commentsCount}</span>{' '}
              <span className="text-secondary">Comentarios</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInformation;
