import { Dropdown } from "react-bootstrap";

export const DropDown = ({ 
  trigger, 
  options = [], 
  variant = "dark", 
  drop = "down",
  menuClassName = ""
}) => {
  // Temas predefinidos para reutilizar en toda la app
  const themes = {
    dark: "bg-black border-dark text-white",
    slate: "bg-dark border-secondary text-white",
    light: "bg-white border-light text-dark"
  };

  const currentTheme = themes[variant] || themes.dark;

  return (
    <Dropdown drop={drop}>
      <Dropdown.Toggle as="div" style={{ cursor: 'pointer' }} > 
        {trigger}
      </Dropdown.Toggle>

      <Dropdown.Menu 
        className={`${currentTheme} shadow-lg p-2 rounded-4 border ${menuClassName}`}
      >
        {options.map((item, index) => (
          <div key={index}>
            {item.divider ? (
              <Dropdown.Divider className={variant === 'light' ? 'bg-light' : 'bg-dark'} />
            ) : (
              <Dropdown.Item 
                onClick={() => {
                  item.onClick();
                }}
                className={`custom-dropdown-item py-2 px-3 rounded-pill mb-1 transition-all d-flex align-items-center ${
                  item.isDanger ? 'text-danger fw-bold' : 'text-white'
                }`}
              >
                {item.icon && <i className={`${item.icon} me-3 fs-5`}></i>}
                <span>{item.label}</span>
              </Dropdown.Item>
            )}
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};