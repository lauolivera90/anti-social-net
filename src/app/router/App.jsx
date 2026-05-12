import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "@/widget/layout"; // Debes crear este archivo
import Home from '@/pages/Home';
import Post from "@/pages/Post";
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Public from '@/pages/Public';
import Configuration from '@/pages/Configuration';
import Search from '@/pages/Search';
import Contacto from '@/pages/Contacto';
import Disclaimer from '@/pages/Disclaimer';
import CommentPage from '@/pages/Comment';
import Health from '@/pages/Health';
import {PublicRoute, ProtectedRoute} from '@/app/providers';

// Componente que escucha cada cambio de ruta y sube el scroll automáticamente
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <>
    {/* Al montarse aquí, detectará CADA cambio de URL en toda la app */}
    <ScrollToTop />
    <Routes>
      {/* --- RUTAS PÚBLICAS (Sin Sidebar) --- */}
      <Route path="/" element={<PublicRoute><Public /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* --- RUTAS LIBRES (Accesibles con o sin sesión) --- */}
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/health" element={<Health />} />

      {/* --- RUTAS PRIVADAS (Con Sidebar via Layout) --- */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user/edit" element={<Configuration />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/comment/:id" element={<CommentPage />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/user/:id" element={<Profile />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;