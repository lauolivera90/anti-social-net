import { useNavigate } from "react-router-dom";
import { PublicLayout } from "@/widget/layout";
import { Button } from "@/widget/ui";

export default function Contacto() {
    const navigate = useNavigate();

    const handleCopy = (email) => {
        navigator.clipboard.writeText(email);
        alert("¡Correo copiado al portapapeles!");
    };

    const contacts = [
        { name: "González, Federico", email: "No disponible" },
        { name: "Labriola, Federico", email: "fede.lean.lab@gmail.com" },
        { name: "Lubris Vadell, Martin", email: "martin.lubris@gmail.com" },
        { name: "Olivera, Lautaro B.", email: "lautarobolivera098@gmail.com" },
    ];

    return (
        <PublicLayout>
            <h1 className="fw-bold text-white display-5 mb-2 text-center">AntiSocial Net</h1>
            <h3 className="fw-normal text-secondary fs-5 mb-5 text-center">Contáctate con nosotros</h3>

            <div className="w-100 d-flex flex-column gap-3 mb-4">
                {contacts.map((contact, index) => (
                    <div key={index} className="p-3 border border-secondary rounded text-white bg-dark bg-opacity-10 d-flex justify-content-between align-items-center">
                        <div>
                            <p className="mb-1"><b>{contact.name}</b></p>
                            <p className="mb-0 text-secondary small"><i>{contact.email}</i></p>
                        </div>
                        <i 
                            className="bi bi-clipboard interactive-item p-2 rounded-circle fs-5 text-secondary icon-grow" 
                            style={{ cursor: "pointer" }}
                            onClick={() => handleCopy(contact.email)}
                            title="Copiar correo"
                        ></i>
                    </div>
                ))}
            </div>
            
            <p className="text-secondary text-center small mb-1">
                No te olvides dejarnos tus datos. Te contestaremos a la brevedad.
            </p>
            <footer className="text-secondary text-center small mb-4">Saludos de parte de nuestro Staff.</footer>
            
            <Button variant="primary" className="w-100 py-2 fs-5 rounded-pill mt-2" onClick={() => navigate("/")}>
                Volver
            </Button>
        </PublicLayout>
    );
}