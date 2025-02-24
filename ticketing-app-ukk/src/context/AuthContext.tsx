"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userLevel: number | null;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
}

interface JWTPayload {
  level_id: number;
}

const parseJWT = (token: string): JWTPayload | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLevel, setUserLevel] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      const payload = parseJWT(token);
      if (payload) {
        setIsLoggedIn(true);
        setUserLevel(payload.level_id);
      } else {
        // Handle invalid token
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserLevel(null);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserLevel(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        userLevel,
        setIsLoggedIn,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan dalam AuthProvider");
  }
  return context;
};