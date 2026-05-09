import { Container, Row, Col, Image } from 'react-bootstrap';

export const UserInformation = ({ 
  user, 
  postsCount = 0, 
  commentsCount = 0, 
  actions, 
  size = "md" 
}) => {
  if (!user) return null;

  const isSmall = size === "sm";

  return (
    <div className={`bg-black text-white ${!isSmall && 'p-4 p-md-3'}`}>
      {/* Botón de acciones (se mantiene a la derecha para no interferir con la info) */}
      {actions && (
        <Row className="justify-content-end mb-2">
          <Col xs="auto">{actions}</Col>
        </Row>
      )}

      {/* Todo alineado a la izquierda mediante flex-column en el Col de texto */}
      <Row className="gx-3 align-items-start">
        {/* Imagen de Perfil */}
        <Col xs="auto" className="mb-3">
          <Image
            alt={`${user.nickname} avatar`}
            src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            roundedCircle
            style={{ 
              width: isSmall ? '60px' : '120px', 
              height: isSmall ? '60px' : '120px', 
              objectFit: 'cover',
              backgroundColor: '#16181c'
            }}
          />
        </Col>

        {/* Bloque de texto alineado a la izquierda */}
        <Col xs={12}>
          <div className="text-start">
            {/* Nombre */}
            <h4 className="fw-bold m-0 text-capitalize">
              {user.nickname}
            </h4>
            
            {/* Arroba */}
            <p className="text-secondary mb-3">
              @{user.nickname?.toLowerCase()}
            </p>

            {/* Publicaciones y Comentarios alineados en la misma línea */}
            <div className="d-flex gap-4">
              <div>
                <span className="fw-bold">{postsCount}</span>{' '}
                <span className="text-secondary small">Publicaciones</span>
              </div>
              <div>
                <span className="fw-bold">{commentsCount}</span>{' '}
                <span className="text-secondary small">Comentarios</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};