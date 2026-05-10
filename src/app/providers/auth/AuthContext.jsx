import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

// Llave de almacenamiento constante para evitar errores de dedo
const STORAGE_KEY = 'usuario';

// Helper externo para limpiar la lógica del useEffect
const getPersistedUser = () => {
  const user = localStorage.getItem(STORAGE_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch (e) {
    console.error("Error al recuperar sesión:", e);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Carga inicial de la sesión
  useEffect(() => {
    const persistedUser = getPersistedUser();
    if (persistedUser) {
      setUsuario(persistedUser);
    }
    setCargando(false);
  }, []);

  // Memorizamos las funciones para que no cambien su referencia en cada render
  const login = useCallback((userData) => {
    setUsuario(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Memorizamos el objeto del contexto. 
  // Solo se notificará a los consumidores si cambia 'usuario' o 'cargando'.
  const contextValue = useMemo(() => ({
    usuario,
    cargando,
    login,
    logout
  }), [usuario, cargando, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado con validación de seguridad
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}