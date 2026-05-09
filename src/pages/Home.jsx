import { PostForm } from "@/features/CreatePost/ui";
import { Container, Col, Row } from "react-bootstrap";
import {Feed} from "@/shared/ui";

function Home() {
  return (
    <Container fluid className="bg-black min-vh-100 p-0">
      <Row className="m-0">
        <Col className="p-0">
          <PostForm />

          <Feed />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
