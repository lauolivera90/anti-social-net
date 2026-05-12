import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Avatar } from '@/widget/ui';
import { getUsers } from '@/entities/user';
import { UserInfo } from '@/shared/ui';
import { Spinner, Row, Col } from 'react-bootstrap';

export const RecommendedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsers();
        // La lógica de recomendación debería estar en el backend.
        // Por ahora, solo mostramos los primeros 3.
        setUsers(allUsers.slice(0, 3)); 
      } catch (error) {
        console.error("Error al cargar usuarios recomendados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Card title="Usuarios recomendados" hoverable={false}>
      {loading ? (
        <div className="text-center p-3">
          <Spinner animation="border" size="sm" variant="primary" />
        </div>
      ) : (
        <div className="mt-4">
          {users.map((user) => (
            <Row
              key={user._id}
              className="g-0 align-items-center w-100 mb-2 p-2 rounded interactive-item"
              onClick={() => navigate(`/user/${user._id}`)}
              role="button"
              style={{ cursor: "pointer" }}
            >
              <Col className="ps-1">
                <UserInfo user={user} showNickname={true} />
              </Col>
              <Col xs="auto">
                <Button 
                  variant="secondary" 
                  className="rounded-pill px-3 py-1 fw-bold"
                >
                  Visitar
                </Button>
              </Col>
            </Row>
          ))}
        </div>
      )}
    </Card>
  );
};
