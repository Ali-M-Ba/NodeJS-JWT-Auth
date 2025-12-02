import axios from "axios";

// Vite exposes env variables prefixed with VITE_ via import.meta.env
// Don't import dotenv in browser code — that's Node-only and will break the bundle.
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "/",
  headers: {
    "Content-Type": "application/json",
  },
  // allow browser to send and receive cookies from the API
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    if (err?.response?.status === 401) {
      console.log("Session expired or invalid — auto logout");
      await axiosClient.post("/api/auth/logout");
    }

    return Promise.reject(err.response?.data);
  }
);

export default axiosClient;
