// src/entities/post/ui/ImageGrid.jsx
import { Row, Col } from 'react-bootstrap';

export const ImageGrid = ({ images, onRemove }) => {
  if (!images || images.length === 0) return null;

  return (
    <Row className="g-2 mt-2" style={{ 
      display: "grid", 
      gridTemplateColumns: images.length > 1 ? "repeat(2, 1fr)" : "1fr" 
    }}>
      {images.map((img, index) => (
        <Col key={img.url || index} className="position-relative">
          <img
            src={img.url}
            alt="post content"
            className="rounded-3 w-100"
            style={{ aspectRatio: '16/9', objectFit: 'cover' }}
          />
          {/* Si pasamos onRemove, mostramos el botón de borrar (útil en el editor) */}
          {onRemove && (
            <i
              className="bi bi-x-circle-fill btn fs-4 text-white position-absolute top-0 end-0"
              style={{ cursor: 'pointer', textShadow: '0 0 5px rgba(0,0,0,0.5)' }}
              onClick={() => onRemove(img.url)}
            ></i>
          )}
        </Col>
      ))}
    </Row>
  );
};