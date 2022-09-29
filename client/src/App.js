import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
