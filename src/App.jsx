import './App.css'
import Home from './pages/Home'
import PostDetails from "./pages/PostDetails" 
import { Navigate, Route, Routes } from "react-router-dom"
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Public from './pages/Public'
import PrivateRoute from './components/Private'
import PublicRoute from './components/toHome'

function App() {

  return <>
    <Routes>
      <Route path="/" element={<Public /> } />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
      <Route path="/post/:id" element={ <PostDetails /> } />
      <Route path="/user/:id" element={ <Profile /> } />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
    </Routes>
  </>
}

export default App
