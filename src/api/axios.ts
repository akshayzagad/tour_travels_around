import axios from "axios"

export const api = axios.create({
  baseURL: "https://natours-web-project.onrender.com/api/v1",
   withCredentials: true
});

// ✅ intercept 401 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't throw — just return null silently
      // so useUser returns null instead of crashing
      return Promise.resolve({ data: { data: { doc: null } } });
    }
    return Promise.reject(error);
  }
);