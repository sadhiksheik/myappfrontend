import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import MyPosts from "./components/MyPosts"
import Login from "./components/Login";
import ProtectedRoute from "./components/PotectedRoute";
import './App.css';

const App = () =>(
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/posts/:user_id" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
    </Routes>

)
export default App;
