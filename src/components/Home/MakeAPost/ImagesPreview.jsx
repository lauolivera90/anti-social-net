import React, { useEffect, useRef, useState } from 'react';
import { Container, Button, Form } from "react-bootstrap";

const ImagesPreview = ({ images, setImages }) => {
  const [showAddImage, setShowAddImage] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const popupRef = useRef(null);

  // Regex para validar URL de imagen
  const isValidImageUrl = (url) => {
    return /^https?:\/\/.+(\.(jpg|jpeg|png|gif)(\?.*)?$|[?&]format=(jpg|jpeg|png|gif))/.test(url);
  };

  const addImage = () => {
    if (!isValidImageUrl(inputUrl)) {
      alert("Debes ingresar una URL válida de imagen");
      return;
    }

    // Evitar URLs duplicadas
    if (images.some(img => img.url === inputUrl)) {
      alert("Esta imagen ya ha sido añadida");
      return;
    }

    setImages(prev => [...prev, { url: inputUrl }]);
    setInputUrl('');
    setShowAddImage(false);
  };

  const removeImage = (urlToRemove) => {
    setImages(prev => prev.filter(img => img.url !== urlToRemove));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowAddImage(false);
      }
    };
    if (showAddImage) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleClickOutside);
    };
  }, [showAddImage]);

  return (
    <>
      <i
        className="bi bi-card-image fs-5"
        style={{ cursor: images.length < 4 ? 'pointer' : 'not-allowed' }}
        onClick={() => {
          if (images.length < 4) setShowAddImage(!showAddImage);
          else alert("Solo puedes agregar hasta 4 imágenes");
        }}
      ></i>

      {showAddImage && (
        <Container
          ref={popupRef}
          className="position-absolute z-2 mt-2 d-flex flex-column gap-3 bg-white pt-3 pb-3 p-3 border rounded-3"
          style={{ top: "100%", left: 0, minWidth: '300px' }}
        >
          <Form.Control
            type="url"
            placeholder="URL de la imagen"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            autoFocus
          />
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => setInputUrl('')}>
              Limpiar
            </Button>
            <Button variant="primary" onClick={addImage} disabled={!inputUrl.trim()}>
              Añadir
            </Button>
          </div>
        </Container>
      )}

      <Container
        id="contain-images"
        className="d-grid gap-2 mt-3"
        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        {images.map((img) => (
          <div key={img.url} className="position-relative container">
            <img
              src={img.url}
              alt="preview"
              className="img-thumbnail"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
            <i
              className="bi bi-x-square-fill btn fs-3 text-white position-absolute top-0 end-0"
              style={{ cursor: 'pointer' }}
              onClick={() => removeImage(img.url)}
            ></i>
          </div>
        ))}
      </Container>
    </>
  );
};

export default ImagesPreview;
