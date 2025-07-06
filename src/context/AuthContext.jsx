// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set token ke axios header saat aplikasi dimuat
  useEffect(() => {
    if (token) {
      import('../api/axios').then(({ default: apiClient }) => {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      });
    }
  }, [token]);

  const loginAction = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
        const response = await authService.login(email, password);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        
        // Set token ke axios header
        import('../api/axios').then(({ default: apiClient }) => {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
        });
        
        return response; // Return response untuk menandakan success
    } catch (error) {
        console.error("Login error:", error);
        setError(error.message);
        throw error; // Re-throw error agar bisa di-catch di component
    } finally {
        setLoading(false);
    }
  };

  const logoutAction = async () => {
    setLoading(true);
    setError(null);

    try {
        // Panggil service logout terlebih dahulu
        await authService.logout();
        
        // Jika logout berhasil, baru clear state dan localStorage
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        
        // Hapus token dari axios header
        import('../api/axios').then(({ default: apiClient }) => {
          delete apiClient.defaults.headers.common['Authorization'];
        });
        
        return true; 
    } catch (error) {
        console.error('Logout error:', error.message);
        setError(error.message);
        throw error; // Re-throw error agar bisa di-catch di component
    } finally {
        setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logoutAction, loading, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
