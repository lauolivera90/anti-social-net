import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
// Importaciones ajustadas a FSD
import { PostPreview, getPostsByNickname } from "@/entities/post";
import { PostActions } from "@/features/Post-Management/ui/PostActions";

export const UserPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      if (!user?.nickname) return;
      
      setLoading(true);
      try {
        const data = await getPostsByNickname(user.nickname);
        // Aseguramos que data sea un array para evitar errores de .map
        const postsData = Array.isArray(data) ? data : [];
        
        setPosts(postsData);
      } catch (error) {
        console.error("Error al cargar los posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [user?.nickname]);

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
          {posts.map((post) => {
            // Si el backend no trae el post.user poblado (o es solo un ID string),
            // usamos el objeto 'user' completo que ya tenemos del perfil.
            const postOwner = post.user?._id ? post.user : user;

            return (
              <Col xs={12} key={post._id} className="border-bottom border-dark">
                <PostPreview
                  user={postOwner}
                  images={post.image}
                  description={post.description}
                  date={post.upload_date}
                  postId={post._id}
                  tags={post.tag || []}
                  actions={<PostActions post={{ ...post, user: postOwner }} />}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <Container className="py-5 text-center">
          <p className="text-secondary fs-5">Este usuario aún no ha realizado publicaciones.</p>
        </Container>
      )}
    </Container>
  );
};