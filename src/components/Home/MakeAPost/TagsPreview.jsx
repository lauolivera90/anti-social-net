import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, Row, Col } from "react-bootstrap";

const TagsPreviews = ({ selectedTags, setSelectedTags, setAvailableTags }) => {
  const [showAddTag, setShowAddTag] = useState(false);
  const [tags, setTags] = useState([]);
  const popupRef = useRef(null);

  const getTags = async () => {
    try {
      const response = await fetch("http://localhost:3000/tag");
      if (!response.ok) throw new Error("Error al obtener las etiquetas");
      const data = await response.json();
      setTags(data);
      setAvailableTags(data); // <--- exportás las tags al padre
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowAddTag(false);
      }
    };
    if (showAddTag) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleClickOutside);
    };
  }, [showAddTag]);

  const isChecked = (tagId) => selectedTags.includes(tagId);

  const toggleTag = (tag) => {
    if (isChecked(tag._id)) {
      setSelectedTags(selectedTags.filter(id => id !== tag._id));
    } else {
      setSelectedTags([...selectedTags, tag._id]);
    }
  };

  return (
    <>
      <i
        className="bi bi-tag-fill fs-5"
        onClick={() => setShowAddTag(!showAddTag)}
        style={{ cursor: 'pointer' }}
      ></i>

      {showAddTag && (
        <Container
          ref={popupRef}
          className="position-absolute z-2 mt-2 bg-white p-3 border rounded-3"
          style={{ top: "100%", left: 0, minWidth: '300px' }}
        >
          <Row className="gx-3 gy-2">
            {tags.map((tag) => (
              <Col xs="auto" key={tag._id} className="d-flex align-items-center gap-2">
                <Form.Check
                  type="checkbox"
                  id={`tag-checkbox-${tag._id}`}
                  checked={isChecked(tag._id)}
                  onChange={() => toggleTag(tag)}
                  label={`#${tag.name}`}
                  className="text-primary text-capitalize"
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default TagsPreviews;
