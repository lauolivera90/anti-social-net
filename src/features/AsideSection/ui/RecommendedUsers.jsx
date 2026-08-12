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
              className="g-2 align-items-center w-100 mb-2 p-2 rounded interactive-item flex-wrap"
              onClick={() => navigate(`/user/${user._id}`)}
              role="button"
              style={{ cursor: "pointer" }}
            >
              <Col xs={12} sm className="ps-1 d-flex align-items-center">
                <UserInfo user={user} showNickname={true} />
              </Col>
              <Col xs={12} sm="auto" className="d-flex justify-content-sm-end">
                <Button 
                  variant="secondary" 
                  className="rounded-pill px-3 py-1 fw-bold w-100 w-sm-auto"
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
