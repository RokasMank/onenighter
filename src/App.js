import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Components/Menu"
import LandingPage from "./Pages/LandingPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login"
import GroupPage from "./Pages/GroupPage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/group" element={<GroupPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
