import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export function TabScene ({ tabs = [] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container fluid className="p-0 bg-black">
      {/* Cabecera de las Tabs */}
      <Row className="m-0 border-bottom border-dark">
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          
          return (
            <Col 
              key={tab.label}
              className="p-0 text-center" // La columna ya no necesita ser clickeable
            >
              <div 
                onClick={() => setActiveTab(index)}
                style={{ cursor: 'pointer' }}
                className="interactive-item pt-3 transition-all d-flex flex-column align-items-center"
              >
                {/* Este div se ajusta al ancho del texto */}
                <div style={{ width: 'fit-content' }}>
                  <span className={`fw-bold ${isActive ? "text-white" : "text-secondary"}`}>
                    {tab.label}
                  </span>
                  {/* El indicador ahora ocupa el 100% del div padre ajustado */}
                  <div className={`${isActive ? "bg-primary rounded-pill" : ""} mt-3`} style={{ height: '4px', width: '100%' }}></div>

                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Cuerpo de la Tab Activa */}
      <div className="tab-content">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </Container>
  );
};