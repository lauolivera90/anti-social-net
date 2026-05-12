import { useNavigate } from "react-router-dom";
import { PublicLayout } from "@/widget/layout";
import { Button } from "@/widget/ui";

export default function Disclaimer() {
    const navigate = useNavigate();

    return (
        <PublicLayout>
            <h1 className="fw-bold text-white display-5 mb-3 text-center">Aviso Legal</h1>
            
            <div className="text-secondary mb-5 small" style={{ textAlign: "justify" }}>
                <p>
                    <strong>AntiSocial Net</strong> es un proyecto de carácter estrictamente universitario y educativo, desarrollado por el equipo <em>VisualLayer</em>.
                </p>
                <p>
                    El diseño visual, la interfaz (UI) y la experiencia de usuario (UX) de esta plataforma han sido fuertemente inspirados en <strong>X (anteriormente Twitter)</strong>. 
                </p>
                <p>
                    Queremos dejar explícitamente claro que este proyecto <strong>no persigue ningún fin de lucro</strong>, ni tiene intenciones comerciales, publicitarias o de competencia en el mercado. No monetizamos el uso de la aplicación ni recolectamos datos para terceros. 
                </p>
                <p>
                    Nuestro único propósito es el aprendizaje práctico, el consumo de APIs y la demostración de habilidades técnicas en el desarrollo de software moderno. Reconocemos y respetamos que la identidad visual que inspiró este trabajo pertenece a X Corp.
                </p>
            </div>

            <div className="d-flex flex-column gap-3 w-100">
                <a 
                    href="https://x.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline-light w-100 py-2 fs-5 rounded-pill d-flex align-items-center justify-content-center gap-2"
                >
                    <i className="bi bi-twitter-x"></i> Visitar X.com
                </a>
                
                <Button 
                    variant="primary" 
                    className="w-100 py-2 fs-5 rounded-pill" 
                    onClick={() => navigate(-1)}
                >
                    Volver
                </Button>
            </div>
        </PublicLayout>
    );
}