import { Container, Image, Col, Row } from "react-bootstrap";

const PostImages = ({ images }) => {
  const total = images.length;

  if (total === 0) return null;

  return (
  <Container className="m-0 p-0 mt-3" style={{ overflowX: 'hidden' }}>
    {total === 1 && (
      <Row className="g-1">
        <Col xs={12}>
          <Image src={images[0].url} alt="Imagen 1" className="img-fluid rounded" />
        </Col>
      </Row>
    )}

    {total === 2 && (
      <Row className="g-1">
        {images.map((img, i) => (
          <Col xs={12} md={6} key={i}>
            <Image
              src={img.url}
              alt={`Imagen ${i + 1}`}
              className="img-fluid rounded"
            />
          </Col>
        ))}
      </Row>
    )}

    {total === 3 && (
      <Container>
        <Row className="mb-2">
          <Col xs={12}>
            <Image src={images[0].url} alt="Imagen 1" className="img-fluid rounded" />
          </Col>
        </Row>
        <Row className="g-2">
          <Col xs={12} md={6}>
            <Image
              src={images[1].url}
              alt="Imagen 2"
              className="img-fluid rounded"
            />
          </Col>
          <Col xs={12} md={6}>
            <Image
              src={images[2].url}
              alt="Imagen 3"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    )}

    {total === 4 && (
      <Row className="g-1">
        {images.map((img, i) => (
          <Col xs={12} md={6} key={i}>
            <Image
              src={img.url}
              alt={`Imagen ${i + 1}`}
              className="img-fluid rounded"
              style={{ objectFit: 'cover' }}
            />
          </Col>
        ))}
      </Row>
    )}
  </Container>
);
};

export default PostImages;