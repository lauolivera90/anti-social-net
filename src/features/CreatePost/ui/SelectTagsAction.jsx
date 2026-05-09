import { useEffect, useRef, useState } from 'react';
import { Container, Form, Row, Col } from "react-bootstrap";
import { useClickOutside } from '@/shared/hook';
import { TagBadge, fetchTags } from '@/entities/tag'; // Importación limpia desde la entidad

export const SelectTagsAction = ({ selectedTags, setSelectedTags }) => {
  const [showAddTag, setShowAddTag] = useState(false);
  const [tags, setTags] = useState([]);
  const popupRef = useRef(null);

  useClickOutside(popupRef, () => setShowAddTag(false));

  // Lógica de carga de datos delegada a la entidad
  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchTags();
        setTags(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadTags();
  }, []);

  const toggleTag = (tagId) => {
    const isSelected = selectedTags.some(t => t._id === tagId);
    
    if (isSelected) {
      setSelectedTags(selectedTags.filter(t => t._id !== tagId));
    } else {
      const fullTag = tags.find(t => t._id === tagId);
      if (fullTag) {
        setSelectedTags([...selectedTags, fullTag]);
      }
    }
  };

  return (
    <div className="position-relative d-inline-block">
      <i
        className="bi bi-tag-fill fs-5"
        onClick={() => setShowAddTag(!showAddTag)}
        style={{ cursor: 'pointer' }}
        role="button"
        title="Agregar etiquetas"
      ></i>

      {showAddTag && (
        <Container
          ref={popupRef}
          className="position-absolute z-3 mt-2 bg-white p-3 border rounded shadow-lg"
          style={{ top: "100%", left: 0, minWidth: '250px' }}
        >
          <Row className="gx-2 gy-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {tags.length === 0 ? (
              <Col className="text-muted small">Cargando etiquetas...</Col>
            ) : (
              tags.map((tag) => (
                <Col xs={12} key={tag._id}>
                  <Form.Check
                    type="checkbox"
                    id={`tag-${tag._id}`}
                    checked={selectedTags.some(t => t._id === tag._id)}
                    onChange={() => toggleTag(tag._id)}
                    label={<TagBadge name={tag.name} />}
                    className="d-flex align-items-center"
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      )}
    </div>
  );
};