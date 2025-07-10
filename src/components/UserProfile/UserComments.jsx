import { useEffect, useState } from "react";
import Comment from "../PostDetails/Comment";
import { Container, Row, Col, Alert } from "react-bootstrap";

const UserComments = ({ setCommentsLength, user }) => {
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/comment`);
      if (!response.ok) {
        throw new Error("Error de red al cargar los comentarios del usuario");
      }
      const data = await response.json();
      const userComments = data.filter(
        (comment) => comment.user && comment.user._id === user._id
      );
      setComments(userComments);
      setCommentsLength(userComments.length);
    } catch (error) {
      console.error("Error al cargar los comentarios:", error);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <Container fluid>
      {comments && comments.length > 0 ? (
        <Row>
          {comments.map((comment, index) => (
            <Col key={index} xs={12}>
              <Comment
                user={comment.user || "Desconocido"}
                text={comment.text}
                date={comment.upload_date}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <Container className="bg-black text-white text-center rounded p-5">
              <span>No hay comentarios disponibles.</span>
            </Container>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UserComments;
