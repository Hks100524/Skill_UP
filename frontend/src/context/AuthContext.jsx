import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");

    if (saved) {
      setToken(saved);
      setUser(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



