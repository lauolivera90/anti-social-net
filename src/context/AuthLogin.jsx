import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null); 

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);


    useEffect(() => {
    const emailGuardado = localStorage.getItem('usuario');
    if (emailGuardado) {
        setUsuario({ email: emailGuardado });
    }
    setCargando(false);
    }, []);


  const login = (email) => {
    setUsuario({ email });
    localStorage.setItem('usuario', email);
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