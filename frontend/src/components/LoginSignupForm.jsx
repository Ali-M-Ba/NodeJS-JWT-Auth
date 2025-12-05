import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AppContext";

export const LoginSignupForm = () => {
  const [formMode, setFormMode] = useState("Log in");
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { isAuthenticated, login, signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();

      const { success, message } =
        formMode === "Sign up" ? await signup(user) : await login(user);

      success ? toast.success(message) : toast.error(message);
      success && navigate("/");
    } catch (error) {
      console.error("An error ocuurred while submitting the form: ", error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="w-full max-w-md bg-yellow-300 border-4 border-black shadow-[6px_6px_0_#000] p-6 rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-4">
        {formMode === "Sign up" ? "Create Account" : "Log In"}
      </h2>
      <form onSubmit={submitForm} id="login-form" className="space-y-4">
        {formMode === "Sign up" && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-700 tracking-wide"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 w-full border-2 border-black p-2 focus:ring-1 focus:outline-none"
              placeholder="Ali Moe"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-700 tracking-wide"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 w-full border-2 border-black p-2 focus:ring-1 focus:outline-none"
            placeholder="you@example.com"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-bold text-gray-700 tracking-wide"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 w-full border-2 border-black p-2 focus:ring-1 focus:outline-none"
            placeholder="••••••••"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        {formMode === "Log in" && (
          <p
            className="text-blue-600 w-fit cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forget password?
          </p>
        )}

        <button
          type="submit"
          className="mt-4 bg-purple-500 border-2 shadow-[4px_4px_0_#000] px-4 py-2 font-bold hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] transition-transform"
        >
          {formMode === "Sign up" ? "Sign up" : "Log in"}
        </button>
        <p className="text-center text-sm font-bold text-gray-500 mt-2 tracking-wide">
          {formMode === "Sign up"
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            onClick={() =>
              setFormMode(formMode === "Sign up" ? "Log in" : "Sign up")
            }
            className="text-blue-600 cursor-pointer hover:underline"
          >
            {formMode === "Sign up" ? "Log in" : "Sign up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginSignupForm;
