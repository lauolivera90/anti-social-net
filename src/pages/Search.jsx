import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Col, Row } from "react-bootstrap";
import { PostPreview } from "@/entities/post/ui/PostPreview";
import { getPostsByTagId } from '@/entities/post'; // Asumimos que crearemos esta función
import TagSearchBar from '../components/SearchBar';

const Search = () => {
  const [busqueda, setBusqueda] = useState([]);
  const [tag, setTag] = useState(null);
  const location = useLocation();

  const getPostsByTag = async () => {
    try {
      const tagId = location.pathname.split("/").pop();
      if (!tagId) return;
      
      // Usamos la función de la API centralizada
      const posts = await getPostsByTagId(tagId);
      setBusqueda(posts);
      // Para mostrar el nombre del tag, podríamos necesitar otra llamada o que el endpoint de posts lo incluya
      if (posts.length > 0) setTag(posts[0].tag.find(t => t._id === tagId));
    } catch (error) {
      console.error("Error al obtener los posts por tag:", error);
    }
  };

  useEffect(() => {
    getPostsByTag();
  }, [location.pathname]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Container fluid>
            <TagSearchBar />
            <Row className="m-0 p-0">
              <Col className="m-0 p-0 mt-3">
                <h4>
                  {tag ? `Resultados para el tag: #${tag?.name}` : "Selecciona un tag para ver los resultados"}
                </h4>

                {busqueda.length > 0 ? (
                  <Container fluid className="m-0 p-0">
                    {busqueda.map((post) => (
                      <PostPreview
                        key={post._id}
                        user={post.user || "Desconocido"}
                        images={post.image}
                        description={post.description}
                        date={post.upload_date}
                        postId={post._id}
                        tags={post.tag || []}
                      />
                    ))}
                  </Container>
                ) : (
                  <p>
                    {tag?.name ? `Lo sentimos, no tenemos posts con el tag: #${tag.name}` : ""}
                  </p>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
