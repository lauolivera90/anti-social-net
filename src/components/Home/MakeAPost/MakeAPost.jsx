import React, { useEffect, useRef, useState } from 'react';
import Emoji from './Emoji';
import ImagesPreview from './ImagesPreview';
import TagsPreview from './TagsPreview';
import { useAuth } from '../../../context/AuthContext';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const MakeAPost = () => {
  const [focus, setFocus] = useState(false)
  const [inputText, setInputText] = useState("");
  const [images, setImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const textareaRef = useRef(null);
  const { usuario } = useAuth();

  const cleanInputs = () => {
    setInputText("");
    setImages([]);
    setSelectedTags([]);
    document.querySelector('#contain-images').innerHTML = '';
    document.querySelector('#tags').innerHTML = '';
  }

  const post = async () => {
    try {
      const response = await fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: usuario._id,
          description: inputText,
          image: images,
          tag: selectedTags,
        }),
      });
      if (!response.ok) throw new Error("Error al publicar el post");
      cleanInputs()
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  const handleChange = (e) => {
    const el = textareaRef.current;
    el.style.height = 'auto';
    if (el.scrollHeight > 200) {
      el.style.overflowY = 'scroll';
      el.style.height = '200px';
    } else {
      el.style.height = `${el.scrollHeight}px`;
    }
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (!focus) return
    const counter = document.querySelector('#counter');
    if (inputText.length > 0) {
      counter.textContent = `${inputText.length}`;
      if (inputText.length > 2200) {
        counter.style.color = 'red';
        counter.textContent = `-${inputText.length}`;
        return;
      }
      counter.style.color = 'white';
    } else {
      counter.textContent = '';
    }
  }, [inputText]);

  return (
    <Container fluid className="bg-black border-bottom border-dark text-white p-4">
      {focus && (
        <>
          <Row className="align-items-center px-3 position-relative mb-3">
            <Col xs="auto"><ImagesPreview images={images} setImages={setImages} /></Col>
            <Col xs="auto"><Emoji setInputText={setInputText} /></Col>
            <Col xs="auto"><TagsPreview setSelectedTags={setSelectedTags} selectedTags={selectedTags} /></Col>
            <Col className="text-end">
              <span id="counter" className="me-2"></span>
              <Button
                id="post"
                variant="primary"
                onClick={post}
                disabled={inputText.trim().length === 0 || inputText.length > 2200}
              >
                Publicar
              </Button>
            </Col>
          </Row>
        </>
      )}

      {/* Entrada de texto + tags + imágenes */}
      <Row className={`fs-5 bg-black pt-3 mt-3 ${focus ? "border-top border-dark" : "border-0"}`}>
        <Col>
          <Form.Control
            as="textarea"
            ref={textareaRef}
            onFocus={() => setFocus(true)}
            rows={1}
            className="fs-5 bg-black text-white border-0 mb-3"
            placeholder="¿En qué estás pensando?"
            style={{ resize: "none", overflow: "hidden", height: "auto" }}
            value={inputText}
            onChange={handleChange}
          />

          <Row id="tags" className="gx-2"></Row>

          <Row id="contain-images" className="mt-2 g-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
            {/* Las imágenes se insertan dinámicamente */}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeAPost;
    