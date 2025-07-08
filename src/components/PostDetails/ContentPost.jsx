import Images from './Images';
import UploadDate from './uploadDate';
import PostNav from './PostNav';
import Tags from './Tags';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

const ContentPost = ({ description, user, date, image, tag }) => {
  const navigate = useNavigate();

  const goToProfile = (e) => {
    e.stopPropagation();
    if (user && user._id) {
      navigate(`/user/${user._id}`);
    } else {
      console.log('User no válido');
    }
  };

  return (
    <Container
      fluid
      className="border-0 border-bottom border-dark p-4 shadow-sm bg-black text-white"
    >
      <PostNav />

      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user icon"
            onClick={goToProfile}
            roundedCircle
            style={{ width: '48px', height: '48px', objectFit: 'cover', cursor: 'pointer' }}
          />
        </Col>
        <Col>
          <p className="text-capitalize fw-bold m-0" onClick={goToProfile} style={{ cursor: 'pointer' }}>
            {user.nickname}
          </p>
          <p className="text-secondary m-0" onClick={goToProfile} style={{ cursor: 'pointer' }}>
            @{user.nickname}
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <p className="text-start m-0">{description}</p>
          <Tags tags={tag || []} />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Images images={image} />
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <UploadDate date={date} />
        </Col>
      </Row>
    </Container>
  );
};

export default ContentPost;
