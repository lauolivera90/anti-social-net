import { useState, useEffect } from 'react';
import TypeOfFeed from '../components/Home/TypeOfFeed';
import PostPreview from '../components/Home/postPreview';
import AsideNav from '../components/AsideNav/AsideNav';
import { Container, Col, Row } from "react-bootstrap";
import TagSearchBar from '../components/SearchBar';

const Search = () => {
  const [busqueda, setBusqueda] = useState([]);
  const [tag, setTag] = useState(null);

  const getPostsByTag = async () => {
    try {
      const value = window.location.pathname.split("/").pop();

      const tagResponse = await fetch(`http://localhost:3000/tag/${value}`);
      if (!tagResponse.ok) throw new Error("No se pudo obtener el tag");
      const tagData = await tagResponse.json();
      setTag(tagData);
      const postsResponse = await fetch("http://localhost:3000/post");
      if (!postsResponse.ok) throw new Error("No se pudo obtener los posts");
      const postsData = await postsResponse.json();

      const filteredPosts = postsData.filter(post =>
        post.tag.some(t => t._id === tagData._id)
      );

      setBusqueda(filteredPosts);
    } catch (error) {
      console.error("Error al obtener los posts por tag:", error);
    }
  };

  useEffect(() => {
    getPostsByTag();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md="auto" className="bg-black border-end border-dark">
          <AsideNav />
        </Col>
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
