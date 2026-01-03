import axios from "axios";

// Base URL without the /api/v1 path
const BASE_URL = (process.env.REACT_APP_BASE_URL || "https://vidyavardani-backend.vercel.app").replace(/\/$/, "");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Set to false for Vercel CORS
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      } catch (e) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // Log the request URL for debugging
    console.log("🔍 API Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.message);
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

export const apiConnector = (method, url, bodyData, headers, params) => {
  return api({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
