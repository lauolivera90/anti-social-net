import './App.css'
import Home from './pages/Home'
import PostDetails from "./pages/PostDetails" 
import { Navigate, Route, Routes } from "react-router-dom"
import Profile from './pages/Profile'

function App() {

  return <>
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/post/:id" element={ <PostDetails /> } />
      <Route path="/user/:id" element={ <Profile /> } />
    </Routes>
  </>
}

export default App
