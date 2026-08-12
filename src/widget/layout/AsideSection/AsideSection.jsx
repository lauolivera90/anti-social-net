import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trends, RecommendedUsers } from "@/features/AsideSection/ui";
import { Input } from "@/widget/ui";

export const AsideSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <aside
      className="position-sticky d-flex flex-column pt-3"
      style={{ 
        top: "calc(100vh - 100%)", 
        alignSelf: "start",
        width: "100%"
      }}
    >
      {/* Barra de Búsqueda: Se queda siempre arriba de su propio contenedor */}
      <form onSubmit={handleSubmit} className="position-relative mb-4">
        <i
          className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary z-1"
          style={{ pointerEvents: "none" }}
        ></i>
        <Input
          type="text"
          placeholder="Buscar en AntiSocial"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mb-0"
          classNameControl="ps-5 rounded-pill bg-black border-dark text-white"
        />
      </form>

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
