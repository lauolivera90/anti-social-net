import { useState, useRef } from 'react';
import { Container } from "react-bootstrap";
import { Input, Button } from '@/Widget/ui';
import { useClickOutside } from '@/shared/hook';

export const AddImageAction = ({ images, setImages }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [url, setUrl] = useState('');
  const popupRef = useRef(null);

  useClickOutside(popupRef, () => setShowPopup(false));

  const handleAdd = () => {
    if (images.length >= 4) return alert("Máximo 4 imágenes");
    if (!url.startsWith('http')) return alert("URL inválida");
    
    setImages(prev => [...prev, { url }]);
    setUrl('');
    setShowPopup(false);
  };

  return (
    <div className="position-relative d-inline-block">
      <i
        className="bi bi-card-image fs-5"
        style={{ cursor: images.length < 4 ? 'pointer' : 'not-allowed' }}
        onClick={() => images.length < 4 && setShowPopup(!showPopup)}
      ></i>

      {showPopup && (
        <Container
          ref={popupRef}
          className="position-absolute z-3 mt-2 bg-white p-3 border rounded shadow-lg"
          style={{ top: "100%", left: 0, minWidth: '280px' }}
        >
          <Input
            placeholder="Pega la URL de la imagen..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoFocus
          />
          <div className="d-flex justify-content-end gap-2 mt-2">
            <Button variant="secondary" size="sm" onClick={() => setShowPopup(false)}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleAdd} disabled={!url}>
              Añadir
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
};