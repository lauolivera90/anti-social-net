import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup, ListGroup, Container, Row, Col } from 'react-bootstrap';

const TagSearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('http://localhost:3000/tag'); // Ajusta esta URL según tu API
        if (!res.ok) throw new Error('No se pudieron obtener las etiquetas');
        const data = await res.json();
        setTags(data);
      } catch (err) {
        console.error('Error al obtener tags:', err);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const filtro = tags.filter(tag =>
      tag.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTags(filtro);
  }, [searchText, tags]);

  const handleSelectTag = (tagId) => {
    // Navega a /search/<tagId>
    navigate(`/search/${tagId}`);
    window.location.reload();
  };

  return (
    <Container fluid className="position-sticky top-0 bg-black text-white pt-3 pb-3 border-bottom border-dark">
      <Row className="align-items-center justify-content-between">
        <Col xs="auto" md="auto">
          <i
            className="bi bi-arrow-left fs-5"
            onClick={goBack}
            style={{ cursor: 'pointer' }}
          ></i>
        </Col>
        <Col xs={3} md={3}>
            <InputGroup>
        <Form.Control
          type="text"
          placeholder="Buscar etiquetas..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>

      {searchText && filteredTags.length > 0 && (
        <ListGroup className="mt-2">
          {filteredTags.map((tag) => (
            <ListGroup.Item
              key={tag._id}
              action
              onClick={() => handleSelectTag(tag._id)}
            >
              #{tag.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    
        </Col>
      </Row>
    </Container>
  );
};

export default TagSearchBar;
