import { Modal, Spinner } from "react-bootstrap";
import { Button } from "@/widget/ui";

export const ModalCustom = ({ 
  show, 
  onHide, 
  title, 
  children, 
  footerActions, 
  isLoading = false,
  variant = "slate", // Valores: "dark", "slate", "light"
  scrollable, // Nueva prop opcional
  showCloseButton = true, // Permite ocultar el botón de "Cerrar"
  ...props    // Permite pasar cualquier otra prop nativa de Modal
}) => {

  // Configuración de estilos por variante
  const variants = {
    dark: {
      header: "bg-black text-white border-dark",
      body: "bg-black text-white",
      footer: "bg-black border-dark",
      closeBtn: "secondary"
    },
    slate: {
      header: "bg-dark text-white border-secondary",
      body: "bg-dark text-white",
      footer: "bg-dark border-secondary",
      closeBtn: "outline-light"
    },
    light: {
      header: "bg-white text-dark border-bottom",
      body: "bg-white text-dark",
      footer: "bg-light border-top",
      closeBtn: "secondary"
    }
  };

  const style = variants[variant] || variants.slate;

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      scrollable={scrollable} 
      {...props}
    >
      <Modal.Header closeButton className={style.header}>
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className={`${style.body} p-4`}>
        {isLoading ? (
          <div className="text-center p-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          children
        )}
      </Modal.Body>

      <Modal.Footer className={style.footer}>
        {showCloseButton && (
          <Button 
            variant={style.closeBtn} 
            onClick={onHide} 
            disabled={isLoading}
          >
            Cerrar
          </Button>
        )}
        {footerActions}
      </Modal.Footer>
    </Modal>
  );
};