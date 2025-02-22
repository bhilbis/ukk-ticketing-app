// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

// const LoadingContext = createContext<{ loading: boolean }>({ loading: false });

// export function LoadingProvider({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => setLoading(false), 800);
//   }, [pathname]);

//   return (
//     <LoadingContext.Provider value={{ loading }}>
//       {loading && <LoadingScreen />}
//       <div className={loading ? "hidden" : ""}>{children}</div>
//     </LoadingContext.Provider>
//   );
// }

// export function useLoading() {
//   return useContext(LoadingContext);
// }

// function LoadingScreen() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//       <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
//     </div>
//   );
// }
