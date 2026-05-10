import { Navigate } from 'react-router-dom';
import { useAuth } from '@/app/providers';

export const PublicRoute = ({ children }) => {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return null;
  }

  // Si ya hay usuario, no lo dejamos ver Login/Register/Welcome
  return !usuario ? children : <Navigate to="/home" replace />;
};