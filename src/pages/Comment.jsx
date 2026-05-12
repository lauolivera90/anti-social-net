import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { CommentView } from '@/features/Comment/ui/CommentView';

const CommentPage = () => {
  const { id } = useParams();

  return (
    <Container fluid className="p-0 bg-black min-vh-100">
      <Row className="m-0">
        <Col className="p-0">
          <CommentView commentId={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default CommentPage;