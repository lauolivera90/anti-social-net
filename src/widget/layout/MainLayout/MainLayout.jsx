import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widget/layout';
import { Container, Row, Col } from 'react-bootstrap';

export const MainLayout = () => {
  return (
    <Container fluid className="d-flex p-0" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
      <div className="d-none d-md-block border-end border-dark px-2">
        <Sidebar />
      </div>

      <div className="flex-grow-1 d-flex justify-content-center">
        <div style={{ width: '100%'}} className="border-end border-dark">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};