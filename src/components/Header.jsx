import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Navbar } from 'react-bootstrap';


export default function Header() {
  const { usuario } = useAuth();

  const destino = usuario ? "/home" : "/login";

  return (
    <Navbar bg="light" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to={destino}>
          <strong>UnaHur Anti-Social Net</strong>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}