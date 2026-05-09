import { Avatar } from '@/widget/ui';
import { Row, Col } from 'react-bootstrap';


export function UserInfo({user, onProfileClick}) {
    return(
        <Row className="g-2">
            <Col xs="auto">
                <Avatar
                    src={user?.avatar}
                    alt={user?.nickname}
                    onClick={onProfileClick}
                />
            </Col>
            <Col xs="auto">
                <p className="text-capitalize fw-bold m-0 text-white" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
                    {user?.nickname || "Desconocido"}
                </p>
                <p className="text-secondary small m-0" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
                    @{user?.nickname?.toLowerCase() || "desconocido"}
                </p>
            </Col>
        </Row>
    );
}