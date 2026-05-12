import { Dropdown } from "react-bootstrap";

export const DropDown = ({ 
  trigger, 
  options = [],
  children, // Prop para contenido personalizado
  variant = "dark", 
  drop = "down",
  menuClassName = "",
  ...props // Captura el resto de las props (como `show`, `onToggle`, etc.)
}) => {
  // Temas predefinidos para reutilizar en toda la app
  const themes = {
    dark: "bg-black border-dark text-white",
    slate: "bg-dark border-secondary text-white",
    light: "bg-white border-light text-dark"
  };

  const currentTheme = themes[variant] || themes.dark;

  return (
    <Dropdown className="z-2" drop={drop} {...props}>
      <Dropdown.Toggle as="div" style={{ cursor: 'pointer' }} > 
        {trigger}
      </Dropdown.Toggle>

      <Dropdown.Menu 
        className={`${currentTheme} shadow-lg p-2 rounded-4 border ${menuClassName}`}
      >
        {/* Si se pasan hijos, se renderizan. Si no, se mapean las opciones. */}
        {children ? children : (
          options.map((item, index) => (
            <div key={index}>
              {item.divider ? (
                <Dropdown.Divider className={variant === 'light' ? 'bg-light' : 'bg-dark'} />
              ) : (
                <Dropdown.Item 
                  onClick={() => {
                    item.onClick();
                  }}
                  className={`interactive-item py-2 px-3 rounded-pill mb-1 transition-all d-flex align-items-center ${
                    item.isDanger ? 'text-danger fw-bold' : 'text-white'
                  }`}
                >
                  {item.icon && <i className={`${item.icon} me-3 fs-5`}></i>}
                  <span>{item.label}</span>
                </Dropdown.Item>
              )}
            </div>
          ))
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};