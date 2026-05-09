import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Comment, getCommentsByUserId } from "@/entities/comment";

export const UserComments = ({ setCommentsLength, user }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      if (!user?._id) return;

      setLoading(true);
      try {
        const userComments = await getCommentsByUserId(user._id);
        // Validamos que sea un array para evitar errores en el renderizado
        const commentsData = Array.isArray(userComments) ? userComments : [];
        
        setComments(commentsData);
        
        // Actualizamos el contador global del perfil
        if (setCommentsLength) {
          setCommentsLength(commentsData.length);
        }
      } catch (error) {
        console.error("Error al cargar los comentarios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [user?._id, setCommentsLength]);

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
                user={comment.user}
                text={comment.text}
                date={comment.upload_date}
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