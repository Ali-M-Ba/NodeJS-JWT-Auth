import ForgotPasswordForm from "../components/ForgotPasswordForm";
import Navbar from "../components/Navbar";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-300">
      <Navbar />
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
