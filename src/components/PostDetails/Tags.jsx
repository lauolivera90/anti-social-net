import { Container, Row, Col, Badge } from "react-bootstrap";

const Tags = ({ tags }) => {
  return (
    <>
      {tags && tags.length > 0 && (
        <Container className="ajustContainer autoAdjust">
          <Row>
            {tags.map((tag, index) => (
              <Col key={index} xs="auto">
                <Badge bg="primary" className="text-capitalize">
                  #{tag.name}
                </Badge>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Tags;
