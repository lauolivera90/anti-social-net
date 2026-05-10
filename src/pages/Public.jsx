import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers";
import { Button } from "@/widget/ui";
import { PublicLayout } from "@/widget/layout"; // Importamos el nuevo layout

const Public = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  useEffect(() => {
    if (usuario) {
      navigate("/home");
    }
  }, [usuario, navigate]);

  return (
    <PublicLayout>
      <h1 className="fw-bold text-white display-4 mb-4 text-center">
        Interacción en todo momento
      </h1>
      
      <h2 className="fw-bold fs-5 text-white mb-5 text-center">
        Únete a AntiSocial hoy mismo.
      </h2>

      <div className="d-flex flex-column gap-3">
        <Button
          variant="primary"
          className="py-2 fs-5 rounded-pill"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </Button>

        <Button
          variant="outline-secondary"
          className="py-2 fs-5 rounded-pill text-white border-secondary"
          onClick={() => navigate("/register")}
        >
          Registrarse
        </Button>
      </div>

      <p className="text-secondary mt-5 small">
        Al registrarte, aceptas los Términos de servicio y la Política de privacidad.
      </p>
    </PublicLayout>
  );
};

export default Public;