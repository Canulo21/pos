import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import ViewUsers from "./Admin/UserNav/ViewUsers";
import DashBoardCashier from "./Components/Dashboard/DashBoardCashier";
import Products from "./Admin/Products/Products";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedIsAdmin = localStorage.getItem("isAdmin");

    if (token) {
      setIsLogin(true);
      setIsAdmin(storedIsAdmin === "true");
    }
  }, []);

  const handleLogin = () => {
    setIsLogin(true);
    localStorage.setItem("token", "your_token_here");
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsLogin(false);
    setIsAdmin(false);

    try {
      await axios.post("http://localhost:8080/logout", { userId: userId });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleRole = (Role) => {
    setIsAdmin(Role === "Admin");
    localStorage.setItem("isAdmin", Role === "Admin");
  };

  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          {isLogin && <Navigation onLogout={handleLogout} isAdmin={isAdmin} />}
          <Routes>
            <Route path="/registration" element={<RegistrationForm />} />
            {!isLogin ? (
              <Route
                path="/"
                element={
                  <LoginForm
                    isLogin={handleLogin}
                    isRole={handleRole}
                    isId={setUserId}
                  />
                }
              />
            ) : (
              <>
                {isAdmin ? (
                  <>
                    <Route path="/users" element={<ViewUsers />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                  </>
                ) : (
                  <>
                    <Route path="/dashboard" element={<DashBoardCashier />} />
                  </>
                )}
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
