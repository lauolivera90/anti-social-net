import { Avatar } from '@/widget/ui';
import { Row, Col } from 'react-bootstrap';


export function UserInfo({ user, onProfileClick, actions }) {
    return(
        <Row className="g-2 align-items-center">
            <Col xs="auto">
                <Avatar
                    src={user?.avatar}
                    alt={user?.nickname}
                    onClick={onProfileClick}
                />
            </Col>
            <Col>
                <p className="text-capitalize fw-bold m-0 text-white" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
                    {user?.nickname || "Desconocido"}
                </p>
                <p className="text-secondary small m-0" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
                    @{user?.nickname?.toLowerCase() || "desconocido"}
                </p>
            </Col>
            {/* Slot para renderizar componentes de acción */}
            {actions && (
                <Col xs="auto">{actions}</Col>
            )}
        </Row>
    );
}