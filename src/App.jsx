import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/404"
import Login from "./components/Login"
import Register from "./components/Register"
function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
