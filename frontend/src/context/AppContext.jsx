import { createContext, useContext, useEffect, useState } from "react";
import userApi from "../api/userApi";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userApi.getUser();
        res.success && res.data ? setUser(res.data) : setUser(null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await userApi.loginUser(credentials);
      if (!res || !res.success) {
        setUser(null);
        return res;
      }

      // If backend returned the user object use it, otherwise fetch current user (cookie-based auth)
      if (res.data) {
        setUser(res.data);
      } else {
        const me = await userApi.getUser();
        setUser(me?.data ?? null);
      }

      return res;
    } catch (error) {
      console.log(error);
      setUser(null);
      return error;
    }
  };

  const signup = async (credentials) => {
    try {
      const res = await userApi.signupUser(credentials);
      if (!res?.success) {
        setUser(null);
        return res;
      }

      const newUser = res.data ?? (await userApi.getUser()?.data) ?? null;
      setUser(newUser);

      return res;
    } catch (error) {
      console.log(error);
      setUser(null);
      return error;
    }
  };

  const logout = async () => {
    try {
      await userApi.logoutUser();
    } catch (error) {
      console.log("Log out error: ", error);
    } finally {
      setUser(null);
    }
  };

  const sendVerifyOtp = async () => {
    try {
      return await userApi.sendVerifyOtp();
    } catch (error) {
      console.error("Error verifing account: ", error.message);
      return error;
    }
  };

  const verifyAccount = async (otp) => {
    try {
      return await userApi.verifyAccount(otp);
    } catch (error) {
      console.error("Error verifing account: ", error);
      return error;
    }
  };

  const requestPasswordReset = async (data) => {
    try {
      return await userApi.requestPasswordReset(data);
    } catch (error) {
      console.error("Error requesting password reset: ", error);
      return error;
    }
  };

  const resetPassword = async (data, token) => {
    try {
      return await userApi.resetPassword(data, token);
    } catch (error) {
      console.error("Error resetting password: ", error);
      return error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        sendVerifyOtp,
        verifyAccount,
        requestPasswordReset,
        resetPassword,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth data anywhere
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
