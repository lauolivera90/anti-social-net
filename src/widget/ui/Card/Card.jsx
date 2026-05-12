import React from 'react';

/**
 * Un componente de tarjeta reutilizable con variantes de estilo.
 * Ideal para mostrar opciones o resúmenes de información.
 * @param {object} props
 * @param {string} props.icon - Clase del ícono de Bootstrap (ej. 'bi bi-person').
 * @param {string} props.title - El título principal de la tarjeta.
 * @param {string} props.description - El texto descriptivo secundario.
 * @param {function} props.onClick - Función a ejecutar al hacer clic.
 * @param {React.ReactNode} props.children - Contenido interno personalizado para la tarjeta.
 * @param {string} [props.variant='primary'] - Variante de color ('primary', 'danger', etc.) que afecta al ícono y al borde en hover.
 * @param {boolean} [props.hoverable=true] - Si la tarjeta debe tener efecto hover al ser clickeable.
 * @param {string} props.className - Clases CSS adicionales para el contenedor.
 */
export const Card = ({
  icon,
  title,
  description,
  children,
  onClick,
  variant = 'primary',
  hoverable = true,
  className,
  ...rest
}) => {
  const isClickable = !!onClick;

  const cardClasses = `p-4 h-100 border border-dark rounded bg-dark bg-opacity-25 transition-all shadow-sm text-white text-start ${isClickable && hoverable ? `cursor-pointer border-hover-${variant}` : ''} ${className || ''}`.trim().replace(/\s+/g, ' ');

  return (
    <div className={cardClasses} onClick={onClick} role={isClickable ? 'button' : undefined} {...rest}>
      {icon && <i className={`${icon} fs-1 text-${variant}`}></i>}
      {title && <h5 className="mt-3 fw-bold">{title}</h5>}
      {description && <p className="small text-secondary mb-0">{description}</p>}
      {children}
    </div>
  );
};