import { useState } from "react";
import { useAuth } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await resetPassword({ newPassword }, token);

    if (success) {
      toast.success(message);
      navigate("/login");
    } else {
      toast.error(message);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setNewPassword(value);
  };
  return (
    <div className="w-full max-w-md bg-orange-300 border-4 border-black shadow-[6px_6px_0_#000] px-6 py-4 rounded-lg">
      <form onSubmit={onSubmit} id="reset-passowrd-form" className="space-y-4">
        <div>
          <div className="text-center py-2">
            <h2 className="text-3xl font-semibold text-center py-1">
              Set New Password
            </h2>
            <p className="text-gray-600">Must be at least 6 characters.</p>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold tracking-wide"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="password"
              className="w-full border-2 border-black p-2 focus:ring-1 focus:outline-none"
              placeholder="••••••••"
              value={newPassword}
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

export default ResetPasswordForm;
