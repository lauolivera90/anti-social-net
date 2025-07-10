import { useEffect, useState } from "react";
import PostPreview from "../Home/postPreview";
import { Container, Row, Col } from "react-bootstrap";

const UserPosts = ({ setPostLength, user }) => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/post?userId=${user._id}`);
      console.log("mostrando lo que user tiene en el componente userPosts: ", user)
      if (!response.ok) {       
        throw new Error("Error de red al cargar los posts del usuario");
      }
      const data = await response.json();
      setPosts(data);
      setPostLength(data.length);
      console.log("mostrando lo que user tiene en el componente userPosts: ", user)
    } catch (error) {
      console.error("Error al cargar los posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Container fluid>
      {posts && posts.length > 0 ? (
        <Row>
          {posts.map((post) => (
            <Col xs={12} key={post._id}>
              <PostPreview
                user={post.user || "Desconocido"}
                images={post.image}
                description={post.description}
                date={post.upload_date}
                postId={post._id}
                tags={post.tag || []}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <Container className="bg-black p-5 text-white text-center rounded">
              <span>No hay publicaciones disponibles</span>
            </Container>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UserPosts;
