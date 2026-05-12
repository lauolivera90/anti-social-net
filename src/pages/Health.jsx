import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Button } from '@/widget/ui';

const Health = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="vh-100 bg-black text-white d-flex flex-column justify-content-center align-items-center text-center">
      <div className="mb-4">
        <style>
          {`
            @keyframes heartbeat {
              0% { transform: scale(1); }
              14% { transform: scale(1.3); }
              28% { transform: scale(1); }
              42% { transform: scale(1.3); }
              70% { transform: scale(1); }
            }
            .heart-icon {
              font-size: 8rem;
              color: var(--bs-danger);
              animation: heartbeat 1.5s infinite;
              display: inline-block;
            }
          `}
        </style>
        <i className="bi bi-heart-pulse-fill heart-icon"></i>
      </div>
      <h1 className="fw-bold display-4 mb-3" style={{ color: "#00ff00" }}>SYSTEM STATUS: 200 OK</h1>
      <p className="fs-5 text-secondary mb-5">
        Los servidores de AntiSocial están corriendo más rápido que estudiante en semana de finales. 🏃💨<br/>
        ¡Nuestra salud de hierro está intacta!
      </p>
      <Button variant="outline-light" className="rounded-pill px-4 py-2" onClick={() => navigate('/')}>
        Volver a la normalidad
      </Button>
    </Container>
  );
};

export default Health;