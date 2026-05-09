import { Input } from "@/widget/ui";

export const ModalInput = ({ variant = "slate", ...props }) => {
  // Definimos los estilos según la variante del modal
  const variants = {
    dark: "bg-black text-white border-secondary",
    slate: "bg-dark text-white border-secondary",
    light: "bg-white text-dark border-primary" // Contraste para modal blanco
  };

  const selectedClass = variants[variant] || variants.slate;

  return (
    <Input
      {...props}
      classNameControl={`${selectedClass} shadow-none`}
      className={`mb-3 ${props.className || ""}`}
    />
  );
};