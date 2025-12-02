import axiosClient from "./axiosClient.js";

const userApi = {
  getUser: () => axiosClient.get("/api/auth/me"),
  signupUser: (data) => axiosClient.post("/api/auth/signup", data),
  loginUser: (data) => axiosClient.post("/api/auth/login", data),
  logoutUser: () => axiosClient.post("/api/auth/logout"),
  sendVerifyOtp: () => axiosClient.get("/api/auth/verify-account/otp"),
  verifyAccount: (otp) =>
    axiosClient.post("/api/auth/verify-account/confirm", otp),
  requestPasswordReset: (data) =>
    axiosClient.post("/api/auth/forgot-password", data),
  resetPassword: (data) => axiosClient.post("/api/auth/reset-password", data),
};

export default userApi;
