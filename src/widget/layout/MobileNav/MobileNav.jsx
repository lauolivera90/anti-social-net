import { NavLink } from 'react-router-dom';
import { useAuth } from '@/app/providers';

export const MobileNav = () => {
  const { logout } = useAuth();

  // Definimos las rutas principales
  const navItems = [
    { path: '/home', icon: 'bi bi-house-door' },
    { path: '/search', icon: 'bi bi-search' },
    { path: '/user', icon: 'bi bi-person' },
  ];

  return (
    <nav 
      className="d-lg-none position-fixed bottom-0 start-0 w-100 bg-black border-top border-dark z-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} // Soporte para la barra de navegación del iPhone
    >
      <div className="d-flex justify-content-around align-items-center py-2 px-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `interactive-item rounded-pill px-4 py-2 text-center transition-all ${
                isActive ? 'text-white' : 'text-secondary'
              }`
            }
          >
            {({ isActive }) => (
              // Si está activo usamos el icono relleno (fill), si no el normal
              <i className={`${item.icon}${isActive ? '-fill' : ''} fs-3 icon-grow`}></i>
            )}
          </NavLink>
        ))}
        
        {/* Botón de Cerrar Sesión (Llave) */}
        <div
          className="interactive-item rounded-pill px-4 py-2 text-center transition-all text-secondary"
          onClick={() => {
            const confirmLogout = window.confirm("¿Seguro que deseas cerrar sesión?");
            if (confirmLogout) logout();
          }}
          role="button"
          title="Cerrar sesión"
        >
          <i className="bi bi-key fs-3 icon-grow"></i>
        </div>
      </div>
    </nav>
  );
};