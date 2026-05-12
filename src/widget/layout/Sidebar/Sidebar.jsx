import { Container, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { UserInfo, Logo } from "@/shared/ui";
import { DropDown } from "@/widget/ui"; // Importación solicitada
import { useAuth } from "@/app/providers"; // Importamos el hook

const navItems = [
  { label: "Inicio", path: "/home", icon: "bi bi-house-door-fill fs-4" },
  { label: "Explorar", path: "/search", icon: "bi bi-search fs-4" },
  { label: "Perfil", path: "/user", icon: "bi bi-person-fill fs-4" },
];

export function Sidebar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const userMenuOptions = [
    { 
      label: "Configuración", 
      icon: "bi bi-gear", 
      onClick: () => navigate('/user/edit') 
    },
    { divider: true },
    { 
      label: `Cerrar sesión`, 
      icon: "bi bi-box-arrow-right", 
      onClick: () => { logout(); navigate('/login'); },
      isDanger: true 
    }
  ];

  return (
    <Container 
      fluid 
      className='position-sticky top-0 d-none d-md-flex flex-column vh-100'
      style={{ width: "272px", maxWidth: "272px" }}
    >
      {/* SECCIÓN LOGO */}
      <Row 
        className={`mt-1 py-2 px-1 mb-2 rounded-pill transition-all d-flex align-items-center ${hoveredItem === 'logo' ? 'interactive-item-active' : ''}`}
        style={{ cursor: "pointer", width: "fit-content" }}
        onClick={() => navigate('/home')}
        onMouseEnter={() => setHoveredItem('logo')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <Col className="d-flex align-items-center">
          <Logo width={64} className="text-white" />
        </Col>
      </Row>

      {/* SECCIÓN NAVEGACIÓN */}
      <div className="flex-grow-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isHovered = hoveredItem === item.path;
          return (
            <div key={item.path} 
              style={{cursor: "pointer"}}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}>
              <Row
                // Agregamos una clase personalizada para el hover si la tienes en tu CSS
                className={`py-2 px-1 d-flex align-items-center rounded-pill transition-all ${
                  isActive ? "text-primary fw-bold" : "text-white"
                } ${isHovered ? 'interactive-item-active' : ''}`}
                style={{ width: "fit-content" }}
              >
                <Col xs="auto" className="pe-1">
                  <i className={`${item.icon} ${isActive ? "text-primary" : ""}`} />
                </Col>
                <Col className="d-none d-xl-block">
                  <span className="fs-5">{item.label}</span>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>

{/* SECCIÓN USUARIO (Siempre al fondo) */}
      <div className="mt-auto mb-4">
        <DropDown 
          drop="up"
          variant="dark"
          menuClassName="mb-1 w-100"
          options={userMenuOptions}
          trigger={
            <Row 
              className={`py-2 px-1 rounded-pill transition-all d-flex align-items-center ${hoveredItem === 'user' ? 'interactive-item-active' : ''}`}
              onMouseEnter={() => setHoveredItem('user')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Col>
                <UserInfo user={usuario} />
              </Col>
              {/* Tres puntos opcionales para indicar que hay un menú */}
              <Col xs="auto" className="d-none d-xl-block">
                <i className="bi bi-three-dots fs-5 text-white"></i>
              </Col>
            </Row>
          }
        />
      </div>
    </Container>
  );
}