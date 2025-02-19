import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         const response = await axiosInstance.post(`/auth/refresh`);
//         const newToken = response.data.token;
//         localStorage.setItem('token', newToken);

//         error.config.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance(error.config);
//       } catch {
//         console.error("Session expired, please login again.");
//         localStorage.removeItem('token');
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;