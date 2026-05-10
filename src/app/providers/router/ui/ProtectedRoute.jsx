import { Navigate } from 'react-router-dom';
import { useAuth } from '@/app/providers';
// import { FullScreenLoader } from '@/shared/ui'; // Opcional

export const ProtectedRoute = ({ children }) => {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return null; // O un <FullScreenLoader /> si lo tienes
  }

  // Si no hay usuario, mandamos a la bienvenida (Public)
  return usuario ? children : <Navigate to="/" replace />;
};