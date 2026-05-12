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

  useEffect(() => {
    // Despierta la API en Render (Free Tier) lanzando una petición en segundo plano.
    fetch("https://antisocialnet-backend.onrender.com/health").catch(() => {});
  }, []);

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

      <div className="mt-5 text-center">
        <p className="text-secondary small mb-2">
          Al registrarte, aceptas nuestro{" "}
          <span 
            className="text-primary text-decoration-underline interactive-item px-1 rounded transition-all" 
            role="button"
            onClick={() => navigate("/disclaimer")}
          >
            Aviso Legal (Disclaimer)
          </span>.
        </p>
        <Button variant="ghost" className="text-secondary small p-0 m-0 text-decoration-underline" onClick={() => navigate("/contacto")}>
          Contacto
        </Button>
      </div>
    </PublicLayout>
  );
};

export default Public;