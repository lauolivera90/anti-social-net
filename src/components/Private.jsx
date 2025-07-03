import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { usuario, cargando } = useAuth();
  if (cargando) return null; // o un spinner
  return usuario ? children : <Navigate to="/" />;
}

export default PrivateRoute;