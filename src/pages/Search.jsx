import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import TypeOfFeed from '../components/Home/TypeOfFeed';
import PostPreview from '../components/Home/postPreview';
import { Container, Col, Row } from "react-bootstrap";
import TagSearchBar from '../components/SearchBar';

const Search = () => {
  const [busqueda, setBusqueda] = useState([]);
  const [tag, setTag] = useState(null); // Inicializa como null para evitar errores

  const getPostsByTag = async () => {
    try {
      // Obtener el valor del tag desde la URL
      const value = window.location.pathname.split("/").pop();

      // Obtener el tag del backend
      const tagResponse = await fetch(`http://localhost:3000/tag/${value}`);
      if (!tagResponse.ok) throw new Error("No se pudo obtener el tag");
      const tagData = await tagResponse.json();
      setTag(tagData); // Guardar tag en estado para mostrarlo

      // Obtener todos los posts
      const postsResponse = await fetch("http://localhost:3000/post");
      if (!postsResponse.ok) throw new Error("No se pudo obtener los posts");
      const postsData = await postsResponse.json();

      // Filtrar los posts que tengan ese tag (comparando por ID)
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
    <Container fluid className="ajustContainer">
      <Row className='p-5'>
        <TagSearchBar />
      </Row>
      <Row>
        <Col xs={12} md={9} lg={10} xxl={11} className="ajustContainer">
          <TypeOfFeed />
          <h3>
            Resultados para el tag: #{tag?.name || "Cargando..."}
          </h3>

          {busqueda.length > 0 ? (
            <Container className="ajustContainer">
              {busqueda.map((post) => (
                <PostPreview
                  key={post._id}
                  user={post.user?.nickname || "Desconocido"}
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
              {tag?.name
                ? `Lo sentimos, no tenemos posts con el tag: #${tag.name}`
                : "Cargando resultados..."}
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
