import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
// Importaciones ajustadas a FSD
import { PostPreview, getPostsByUserId } from "@/entities/post";

export const UserPosts = ({ setPostLength, user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      if (!user?._id) return;
      
      setLoading(true);
      try {
        const data = await getPostsByUserId(user._id);
        // Aseguramos que data sea un array para evitar errores de .map
        const postsData = Array.isArray(data) ? data : [];
        
        setPosts(postsData);
        // Actualizamos el contador en UserInformation
        if (setPostLength) setPostLength(postsData.length);
      } catch (error) {
        console.error("Error al cargar los posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [user?._id, setPostLength]);

  if (loading) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" variant="primary" size="sm" />
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
      {posts.length > 0 ? (
        <Row className="g-0"> {/* g-0 elimina espaciados laterales si prefieres estilo "Timeline" */}
          {posts.map((post) => (
            <Col xs={12} key={post._id} className="border-bottom border-dark">
              <PostPreview
                user={post.user}
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
        <Container className="py-5 text-center">
          <p className="text-secondary fs-5">Este usuario aún no ha realizado publicaciones.</p>
        </Container>
      )}
    </Container>
  );
};