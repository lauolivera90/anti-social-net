import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null); 

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);


    useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) {
      try {
        setUsuario(JSON.parse(user));
      } catch (e) {
        console.error("Error al parsear el usuario del localStorage", e);
        localStorage.removeItem('usuario'); 
      }
    }
    setCargando(false);
  }, []);


  const login = (user) => {
  setUsuario(user);
  localStorage.setItem('usuario', JSON.stringify(user));
  //console.log("👤 Usuario logueado y guardado:", user);
};

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}