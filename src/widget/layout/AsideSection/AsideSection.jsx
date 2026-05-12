import { Trends, RecommendedUsers } from "@/features/AsideSection/ui";
import { Input } from "@/widget/ui";
import { Link } from "react-router-dom";

export const AsideSection = () => {
  return (
    <aside
      className="position-sticky d-flex flex-column pt-3"
      style={{ 
        /* Calculamos un top negativo. 
           Si tu Aside mide, por ejemplo, 1200px y tu pantalla 800px,
           necesitamos que "suba" esos 400px de diferencia antes de quedarse quieto.
        */
        top: "calc(100vh - 100%)", 
        alignSelf: "start", // Crucial para que sticky funcione en Flexbox
        width: "100%"
      }}
    >
      {/* Barra de Búsqueda: Se queda siempre arriba de su propio contenedor */}
      <div className="position-relative mb-4">
        <i
          className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary z-1"
          style={{ pointerEvents: "none" }}
        ></i>
        <Input
          type="text"
          placeholder="Buscar en AntiSocial"
          className="mb-0"
          classNameControl="ps-5 rounded-pill bg-black border-dark text-white"
        />
      </div>

      {/* Contenido que subirá con el scroll hasta llegar a su base */}
      <Trends />
      <RecommendedUsers />
      
      {/* Footer (opcional, ayuda a que no termine tan seco) */}
      <div className="text-secondary small w-100 d-flex flex-wrap justify-content-center align-items-center gap-2 my-3">
        <Link to="/contacto" className="text-secondary text-decoration-none interactive-item px-2 py-1 rounded">Contacto</Link>
        <span>·</span>
        <Link to="/disclaimer" className="text-secondary text-decoration-none interactive-item px-2 py-1 rounded">Aviso Legal</Link>
        <span>·</span>
        <span>© 2026 AntiSocial</span>
      </div>
    </aside>
  );
};
