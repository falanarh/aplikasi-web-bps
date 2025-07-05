// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const loginAction = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  const logoutAction = () => {
    /* ... akan diisi nanti ... */
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
