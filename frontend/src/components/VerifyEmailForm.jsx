import React, { useEffect } from "react";
import { useAuth } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyEmailForm = () => {
  const inputsRef = React.useRef([]);
  const { user, verifyAccount } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Move to next input if a digit is entered
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = inputsRef.current.map((ref) => ref.value).join("");

    const { success, message } = await verifyAccount({ otp });
    success
      ? toast.success(message) && (user.isVerified = true) && navigate("/")
      : toast.error(message);
  };

  useEffect(() => {
    if (user.isVerified) navigate("/");
  }, [user.isVerified]);

  return (
    <div className="w-full max-w-md bg-amber-300 border-4 border-black shadow-[6px_6px_0_#000] p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-semibold text-center mb-4">
          Verify Account
        </h2>
        <p className="text-center text-md">
          Enter the 6-digit OTP code sent to your Email
        </p>
        <div className="flex justify-between my-8">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 bg-amber-200 rounded-md text-center focus:shadow-[3px_3px_0_#000] focus:outline-none"
                key={index}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                inputMode="numeric"
                maxLength={1}
                required
              />
            ))}
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 border-2 shadow-[4px_4px_0_#000] px-4 py-2 font-bold hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] transition-transform"
        >
          Verify Account
        </button>
      </form>
    </div>
  );
};

export default VerifyEmailForm;
