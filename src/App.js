import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Components/Menu"
import LandingPage from "./Pages/LandingPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login"
import GroupsPage from "./Pages/GroupsPage";
import GroupDetail from "./Pages/GroupDetail";
import './App.css';
import Profile from "./Pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/group" element={<GroupsPage/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/group/:groupId" element={<GroupDetail/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
