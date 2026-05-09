import { useEffect } from 'react';

/**
 * Hook para detectar clics fuera de un elemento específico.
 * @param {React.RefObject} ref - Referencia del elemento que queremos monitorear.
 * @param {Function} callback - Función que se ejecutará cuando se haga clic fuera.
 */
export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si la referencia existe y el clic NO fue dentro del elemento referido
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Escuchar clics y scroll (opcional) para cerrar el elemento
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // Soporte para móviles
    
    // Limpieza al desmontar el componente o cambiar dependencias
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]); // Dependencias para evitar ejecuciones innecesarias
};