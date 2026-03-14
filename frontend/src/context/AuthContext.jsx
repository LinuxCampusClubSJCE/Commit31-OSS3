import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Read from localStorage synchronously to avoid the flash-redirect on reload
const getSavedToken = () => localStorage.getItem("token");
const getSavedUser = () => {
  try {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getSavedUser);
  const [token, setToken] = useState(getSavedToken);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!(getSavedToken() && getSavedUser())
  );

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    setIsAuthenticated(true);

    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Helper for API calls
  const authFetch = async (url, options = {}) => {
    const headers = new Headers(options.headers || {});

    const hasBody = options.body != null;
    const isFormData =
      typeof FormData !== "undefined" && options.body instanceof FormData;

    if (hasBody && !isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        updateUser,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext; 
