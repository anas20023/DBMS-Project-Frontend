import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/404"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import Upload from "./components/Upload"
import PrivateRoute from "./PrivateRoute"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protect these routes */}
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
      <Route path="/upload" element={
        <PrivateRoute>
          <Upload />
        </PrivateRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
