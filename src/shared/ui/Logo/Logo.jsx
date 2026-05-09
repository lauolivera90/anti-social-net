import camsLogo from "@/assets/logo/cams.png";

export const Logo = ({ width = 150, height = "auto", className = "" }) => {
  return (
    <img
      src={camsLogo}
      alt="Cams Logo"
      width={width}
      height={height}
      // Mantenemos la posibilidad de pasar clases (como filtros o márgenes)
      className={`object-fit-contain ${className}`}
      // Evitamos que la imagen sea arrastrable (comportamiento común en sidebars)
      draggable={false}
    />
  );
};