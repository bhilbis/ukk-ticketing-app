// "use client";
// import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// const AuthContext = createContext<{ isLoggedIn: boolean; setIsLoggedIn: (value: boolean) => void; logout: () => void } | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     window.location.href = "/";
//   };

//   return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>{children}</AuthContext.Provider>;
// };

// // 3️⃣ Custom Hook untuk menggunakan AuthContext di komponen lain
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth harus digunakan dalam AuthProvider");
//   }
//   return context;
// };
