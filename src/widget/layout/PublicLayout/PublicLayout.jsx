import { Container, Row, Col } from "react-bootstrap";
import { Logo } from "@/shared/ui";

export const PublicLayout = ({ children }) => {
  return (
    // Aseguramos que el contenedor sea exactamente el alto de la pantalla
    <Container fluid className="p-0 vh-100 bg-black overflow-hidden">
      <Row className="g-0 h-100"> {/* g-0 elimina márgenes laterales negativos */}
        
        {/* SECCIÓN VISUAL ESTÁTICA */}
        <Col md={6} className="d-none d-md-block position-relative h-100">
          <img
            src="https://i.pinimg.com/736x/79/0e/44/790e44391a38a9589e32c846947a01bb.jpg"
            alt="Welcome Visual"
            // object-fit: cover es la clave para que la imagen se adapte sin estirarse ni desbordar
            className="w-100 h-100 object-fit-cover grayscale-effect"
            style={{ 
                filter: "brightness(0.7)",
                display: "block" // Evita espacios extra debajo de la imagen
            }}
          />
          <div className="position-absolute top-50 start-50 translate-middle">
              <Logo width={200} className="text-white opacity-75" />
          </div>
        </Col>

        {/* SECCIÓN DINÁMICA */}
        <Col 
          xs={12} 
          md={6} 
          className="d-flex flex-column align-items-center justify-content-center bg-black h-100"
        >
          <div className="p-4 text-start w-100" style={{ maxWidth: "450px" }}>
            
            {/* Logo para versión mobile */}
            <div className="d-md-none mb-4 text-center">
              <Logo width={60} />
            </div>

            {children}
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};