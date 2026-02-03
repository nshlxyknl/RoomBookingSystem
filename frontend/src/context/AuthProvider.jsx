import {  useState } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
    const [userId, setUserId] = useState(localStorage.getItem("userId") || "");


  const login = (token, role, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    setToken(token);
    setRole(role);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setToken(null);
    setRole("");
    setUserId("");
  };

  return (
    <AuthContext.Provider value={{ token, role,userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};