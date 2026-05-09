import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/widget/layout"; // Debes crear este archivo
import Home from '@/pages/Home';
import Post from "@/pages/Post";
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Public from '@/pages/Public';
import Configuration from '@/pages/Configuration';
import Contacto from '@/pages/Contacto';
import PrivateRoute from '@/components/Private';
import PublicRoute from '@/components/toHome';

function App() {
  return (
    <Routes>
      {/* --- RUTAS PÚBLICAS (Sin Sidebar) --- */}
      <Route path="/" element={<PublicRoute><Public /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/contacto" element={<PublicRoute><Contacto /></PublicRoute>} />

      {/* --- RUTAS PRIVADAS (Con Sidebar via Layout) --- */}
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/user/edit" element={<Configuration />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/user/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;