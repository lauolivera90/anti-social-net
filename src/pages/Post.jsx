import { Container, Row, Col } from 'react-bootstrap';
import { PostView } from '@/features/Post/ui';

const PostPage = () => {
  const postId = window.location.pathname.split('/').pop();

  return (
    <Container fluid className="p-0 bg-black min-vh-100">
      <Row className="m-0">
        <Col className="p-0">
          <PostView postId={postId} />
        </Col>
      </Row>
    </Container>
  );
};

export default PostPage;