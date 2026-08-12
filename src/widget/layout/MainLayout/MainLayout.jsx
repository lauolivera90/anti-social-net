import { Container, Row, Col } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, AsideSection, MobileNav } from "@/widget/layout";

export const MainLayout = () => {
  const location = useLocation();

  // Define las rutas que NO deben mostrar la sección lateral.
  const showAside = !location.pathname.startsWith('/user/edit');

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {/* --- Columna del Sidebar (Izquierda) --- */}
        <Col lg={3} className="p-0 d-none d-lg-flex">
          <Sidebar />
        </Col>

        {/* --- Columna de Contenido Principal (Centro) ---
            Se agrega pb-5 mb-5 en móviles para que el MobileNav no tape el contenido,
            y pb-lg-0 mb-lg-0 para reiniciar el espaciado en desktop. */}
        <Col xs={12} lg={showAside ? 6 : 9} className="border-start border-end border-dark p-0 pb-5 mb-5 pb-lg-0 mb-lg-0" style={{ minHeight: '100vh' }}>
          <Outlet />
        </Col>

        {/* --- Columna Lateral (Derecha, condicional) --- */}
        {showAside && (
          <Col lg={3} className="d-none d-lg-block ps-4">
            <AsideSection />
          </Col>
        )}
      </Row>

      {/* Navegación para pantallas pequeñas */}
      <MobileNav />
    </Container>
  );
};
