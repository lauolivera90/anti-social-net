import { useState, useEffect } from 'react';

export const useSmartDrop = (elementRef, menuHeight = 250) => {
  const [dropDirection, setDropDirection] = useState('down');

  useEffect(() => {
    const updateDirection = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Si el espacio hacia abajo es menor que la altura del menú,
      // y hay más espacio arriba que abajo, tiramos el menú hacia arriba.
      if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        setDropDirection('up');
      } else {
        setDropDirection('down');
      }
    };

    updateDirection(); // Calculamos al montar el componente

    // Recalculamos al hacer scroll o cambiar el tamaño de la ventana.
    // El 'true' captura eventos de scroll en contenedores internos (como modales).
    window.addEventListener('scroll', updateDirection, true);
    window.addEventListener('resize', updateDirection);

    return () => {
      window.removeEventListener('scroll', updateDirection, true);
      window.removeEventListener('resize', updateDirection);
    };
  }, [elementRef, menuHeight]);

  return dropDirection;
};