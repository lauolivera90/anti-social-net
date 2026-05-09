import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widget/layout/Sidebar/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

export const MainLayout = () => {
  return (
    <Container fluid style={{minHeight: '100vh' }}>
        <Row>
            <Col xs={12} md="auto" className='bg-black border-end border-dark'>
                <Sidebar />
            </Col>
            <Col className='m-0 p-0'>
                <Outlet />
            </Col>
        </Row>
    </Container>
  );
};