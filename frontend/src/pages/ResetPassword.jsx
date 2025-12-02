import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const [isEmailSubmited, setIsEmailSubmited] = useState(false);
  const [isotpEntered, setIsotpEntered] = useState(false);
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const inputsRef = React.useRef([]);

  const { requestPasswordReset, resetPassword } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailSubmited) {
      const { success, message } = await requestPasswordReset(resetData);

      if (success) {
        toast.success(message);
        setIsEmailSubmited(true);
      } else {
        toast.error(message);
      }
    } else {
      const { success, message } = await resetPassword(resetData);

      if (success) {
        toast.success(message);
        navigate("/login");
      } else {
        toast.error(message);
        setIsEmailSubmited(false);
        setIsotpEntered(false);
        setResetData((prev) => ({
          ...prev,
          otp: "",
          newPassword: "",
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInput = (e, index) => {
    const value = e.target.value;

    // Move to next input if a digit is entered
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Clear OTP inputs when going back to modify email "GPT recomenedation"
  useEffect(() => {
    if (!isEmailSubmited) {
      inputsRef.current.forEach((input) => {
        if (input) input.value = "";
      });
    }
  }, [isEmailSubmited]);

  const handleOtpAssigning = () => {
    const otp = inputsRef.current.map((ref) => ref.value).join("");
    setResetData((prev) => ({ ...prev, otp }));
    setIsotpEntered(true);
  };

  const handleKeyDown = (e, index) => {
    const value = e.target.value;

    if (e.key === "Backspace" && !value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const digits = pasted.split("");

    const currentIndex = inputsRef.current.indexOf(document.activeElement);

    const availableSlots = inputsRef.current.length - currentIndex;
    const digitsToApply = digits.slice(0, availableSlots);

    digitsToApply.forEach((digit, index) => {
      inputsRef.current[currentIndex + index].value = digit;
    });

    const lastIndex = currentIndex + digitsToApply.length - 1;
    const nextIndex = Math.min(lastIndex + 1, inputsRef.current.length - 1);

    inputsRef.current[nextIndex].focus();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-300">
      <div className="w-full max-w-md bg-orange-300 border-4 border-black shadow-[6px_6px_0_#000] px-6 py-4 rounded-lg">
        <form
          onSubmit={onSubmit}
          id="reset-passowrd-form"
          className="space-y-4"
        >
          {!isEmailSubmited && (
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
                  value={resetData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {isEmailSubmited && !isotpEntered && (
            <div>
              <div className="text-center py-2">
                <h2 className="text-3xl font-semibold text-center py-1">
                  Password Reset
                </h2>
                <p className="text-gray-600">
                  We sent a code to {resetData.email}.
                </p>
              </div>
              <div className="flex justify-between py-2">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      name="otp"
                      ref={(el) => (inputsRef.current[index] = el)}
                      className="w-12 h-12 bg-amber-200 rounded-md text-center focus:shadow-[3px_3px_0_#000] focus:outline-none"
                      key={index}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      inputMode="numeric"
                      maxLength={1}
                      required
                    />
                  ))}
              </div>
              <div>
                <div className="text-purple-600 py-2">
                  <button
                    className="cursor-pointer hover:underline"
                    onClick={() => setIsEmailSubmited(false)}
                  >
                    Modify Email?
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleOtpAssigning}
                  className="my-2 mt-4 bg-orange-400 border-2 shadow-[4px_4px_0_#000] px-4 py-2 font-bold hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] transition-transform"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {isotpEntered && (
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
                  value={resetData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {(!isEmailSubmited || isotpEntered) && (
            <button
              type="submit"
              className="my-2 mt-4 bg-orange-400 border-2 shadow-[4px_4px_0_#000] px-4 py-2 font-bold hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] transition-transform"
            >
              Reset Password
            </button>
          )}
        </form>

        <Link
          to="/login"
          className="inline-block text-purple-600 py-2 font-bold hover:underline"
        >
          Back to Log In
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
