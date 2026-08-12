import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

export const DropDown = ({ 
  trigger, 
  options = [],
  children, // Prop para contenido personalizado
  variant = "dark", 
  drop = "down",
  menuClassName = "",
  menuStyle = {},
  show: controlledShow,
  onToggle: onToggleProp,
  ...props // Captura el resto de las props (como `align`, `variant`, etc.)
}) => {
  // Temas predefinidos para reutilizar en toda la app
  const themes = {
    dark: "bg-black border-dark text-white",
    slate: "bg-dark border-secondary text-white",
    light: "bg-white border-light text-dark"
  };

  const currentTheme = themes[variant] || themes.dark;
  const [localShow, setLocalShow] = useState(false);
  const show = controlledShow ?? localShow;

  const handleToggle = (nextShow, event) => {
    if (controlledShow === undefined) {
      setLocalShow(nextShow);
    }
    if (onToggleProp) {
      onToggleProp(nextShow, event);
    }
  };

  useEffect(() => {
    if (!show) return;

    const handleScroll = () => {
      if (controlledShow === undefined) {
        setLocalShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll, true);
    };
  }, [show, controlledShow]);

  return (
    <Dropdown className="z-2" drop={drop} show={show} onToggle={handleToggle} {...props}>
      <Dropdown.Toggle as="div" role="button" tabIndex={0} style={{ cursor: 'pointer' }} > 
        {trigger}
      </Dropdown.Toggle>

      <Dropdown.Menu 
        className={`${currentTheme} shadow-lg p-2 rounded-4 border overflow-auto ${menuClassName}`}
        style={{ zIndex: 3000, maxHeight: '400px', overflow: 'auto', ...menuStyle }}
        renderOnMount
        popperConfig={{ strategy: 'fixed' }}
        rootCloseEvent="click"
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