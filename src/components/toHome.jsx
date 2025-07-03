// src/components/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PublicRoute({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return null; // o un spinner

  return !usuario ? children : <Navigate to="/home" />;
}

export default PublicRoute;
