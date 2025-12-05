import { useState } from "react";
import { useAuth } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const { requestPasswordReset } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await requestPasswordReset({ email });

    if (success) {
      toast.success(message);
      navigate("/login");
    } else {
      toast.error(message);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setEmail(value);
  };

  return (
    <div className="w-full max-w-md bg-orange-300 border-4 border-black shadow-[6px_6px_0_#000] px-6 py-4 rounded-lg">
      <form onSubmit={onSubmit} id="reset-passowrd-form" className="space-y-4">
        <div>
          <div className="text-center py-2">
            <h2 className="text-3xl font-semibold text-center py-1">
              Forgot Password?
            </h2>
            <p className="text-gray-600">
              No worries, we'll send you reset instructions.
            </p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold tracking-wide"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border-2 border-black p-2 focus:ring-1 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="my-2 mt-4 bg-orange-400 border-2 shadow-[4px_4px_0_#000] px-4 py-2 font-bold hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] transition-transform"
        >
          Reset Password
        </button>
      </form>
      <Link
        to="/login"
        className="inline-block text-purple-600 py-2 font-bold hover:underline"
      >
        Back to Log In
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;
