import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup, ListGroup, Container } from 'react-bootstrap';

const TagSearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);

  const navigate = useNavigate();

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
    <Container className="mb-4">
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

      {searchText && filteredTags.length === 0 && (
        <p className="mt-2 text-muted">No se encontraron etiquetas.</p>
      )}
    </Container>
  );
};

export default TagSearchBar;
