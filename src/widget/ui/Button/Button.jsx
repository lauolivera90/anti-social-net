// src/shared/ui/Button/Button.jsx
import { Button as RBButton } from 'react-bootstrap';

export function Button({
  variant = 'primary',
  size,
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button', // Añadimos tipo por defecto
  ...props // Captura cualquier otra prop estándar
}) {
  const mappedVariant = {
    primary: 'primary',
    secondary: 'outline-primary',
    ghost: 'link'
  }[variant] || 'primary';

  const mappedSize = size === 'md' ? undefined : size;

  return (
    <RBButton
      {...props}
      type={type}
      variant={mappedVariant}
      size={mappedSize}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </RBButton>
  );
}