import { Container, Row, Col } from 'react-bootstrap';
import { ProfileView } from '@/features/Profile/ui/ProfileView';

const ProfilePage = () => {
    return (
        <Container fluid className="p-0 bg-black min-vh-100">
            <Row className="m-0">
                <Col className="p-0 ">
                    <ProfileView />
                </Col>
            </Row>
        </Container>
    );
}

export default ProfilePage;