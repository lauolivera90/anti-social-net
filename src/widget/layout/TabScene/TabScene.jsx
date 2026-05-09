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
              className="p-0 text-center"
              onClick={() => setActiveTab(index)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`py-3 fw-bold transition-all ${
                isActive 
                  ? "text-white border-bottom border-primary border-4" 
                  : "text-secondary"
              }`}>
                {tab.label}
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