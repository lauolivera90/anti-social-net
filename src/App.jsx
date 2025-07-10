import './App.css'
import Home from './pages/Home'
import PostDetails from "./pages/PostDetails" 
import { Route, Routes } from "react-router-dom"
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Public from './pages/Public'
import PrivateRoute from './components/Private'
import Search from './pages/Search'
import PublicRoute from './components/toHome'
import Configuration from './pages/Configuration'
import Contacto from '../../../porahora/src/pages/Contacto'

function App() {

  const title = (
    <title className='title'>
      <h1>Anti Social .NET</h1>
    </title>
  )

  return <>
    <Routes>
      <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
      <Route path="/" element={<PublicRoute><Public /></PublicRoute>} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
      <Route path="/user/edit" element={<PrivateRoute><Configuration /></PrivateRoute>}/>
      <Route path="/post/:id" element={<PrivateRoute><PostDetails /></PrivateRoute>} />
      <Route path="/user" element={<PrivateRoute><Profile /></PrivateRoute>  } />
      <Route path="/user/:id" element={<PrivateRoute><Profile /></PrivateRoute>  } />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/contacto" element={<PublicRoute><Contacto /></PublicRoute>} />
    </Routes>
  </>
}

export default App
