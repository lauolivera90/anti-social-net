import './App.css'
import Home from './pages/Home'
import PostDetails from "./pages/PostDetails" 
import { Navigate, Route, Routes } from "react-router-dom"

function App() {

  return <>
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/post/:id" element={ <PostDetails /> } />

    </Routes>
  </>
}

export default App
