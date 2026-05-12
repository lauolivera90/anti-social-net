import { useNavigate } from "react-router-dom";

export const useLocate = () => {
  const navigate = useNavigate();

  const locate = (target, options) => {
    // Fuerza el scroll al inicio de la pantalla de forma inmediata
    window.scrollTo(0, 0);
    
    // Ejecuta la navegación normal de react-router
    navigate(target, options);
  };

  return locate;
};