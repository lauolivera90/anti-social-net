import { DropDown } from "@/widget/ui";

/**
 * Un componente de menú de acciones reutilizable y flexible.
 * Muestra un botón (por defecto, tres puntos) que abre un menú desplegable.
 * El contenido del menú puede generarse a partir de un array `options` (para menús simples)
 * o pasando `children` directamente (para un control total y menús complejos).
 *
 * @param {object} props
 * @param {Array<object>} [props.options] - Array para generar el menú. Cada objeto puede tener: label, icon, onClick, isDanger, divider.
 * @param {React.ReactNode} [props.children] - Contenido personalizado para el dropdown. Se ignora si se provee `options`.
 * @param {React.ReactNode} [props.trigger] - Componente personalizado para el botón que abre el menú.
 * @param {string} [props.drop] - Dirección del dropdown ('up', 'down', 'start', 'end'). Por defecto 'down'.
 * @param {string} [props.align] - Alineación del menú ('start', 'end'). Por defecto 'end'.
 * @param {string} [props.variant] - Variante de color del DropDown. Por defecto 'dark'.
 * @param {string} [props.menuClassName] - Clases CSS para el contenedor del menú.
 */
export const ActionButton = ({
  options,
  children,
  trigger,
  drop = "down",
  align = "end",
  variant = "dark",
  menuClassName,
  ...rest
}) => {
  // Un trigger por defecto, consistente en toda la app.
  const defaultTrigger = (
    <div
      className="interactive-item rounded-circle d-flex align-items-center justify-content-center"
      style={{ width: "36px", height: "36px" }}
    >
      <i className="bi bi-three-dots fs-5 text-secondary"></i>
    </div>
  );

  return (
    <DropDown
      drop={drop}
      variant={variant}
      align={align}
      options={options}
      trigger={trigger || defaultTrigger}
      menuClassName={menuClassName}
      {...rest}
    >
      {!options && children}
    </DropDown>
  );
};