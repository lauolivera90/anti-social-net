import './App.css'
import PostDetails from "./pages/PostDetails" 
import { Navigate, Route, Routes } from "react-router-dom"

function App() {

  return <>
    <Routes>
      <Route path="/" element={ <PostDetails /> } />
    </Routes>
  </>
}

export default App
