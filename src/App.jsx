import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/404"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import Upload from "./components/Upload"
function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      {localStorage.getItem("student_all") && <Route path="/profile" element={<Profile/>} />}
      {localStorage.getItem("student_all") && <Route path="/upload" element={<Upload/>} />}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
