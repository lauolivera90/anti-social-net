import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Comment, getComments } from "@/entities/comment";
import { CommentActions } from '@/features/Comment-Management/ui';

export const UserComments = ({ user }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      if (!user?._id) return;

      setLoading(true);
      try {
        const userComments = await getComments({ userId: user._id });
        // Validamos que sea un array para evitar errores en el renderizado
        const commentsData = Array.isArray(userComments) ? userComments : [];
        
        setComments(commentsData);
        
      } catch (error) {
        console.error("Error al cargar los comentarios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [user?._id]);

  if (loading) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" variant="primary" size="sm" />
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
      {comments.length > 0 ? (
        <Row className="g-0">
          {comments.map((comment) => (
            <Col key={comment._id} xs={12} className="border-bottom border-dark">
              <Comment
                commentId={comment._id}
                user={comment.user}
                text={comment.description || comment.text}
                date={comment.upload_date}
                actions={<CommentActions comment={comment} />}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Container className="py-5 text-center">
          <p className="text-secondary fs-5">Este usuario no tiene comentarios aún.</p>
        </Container>
      )}
    </Container>
  );
};