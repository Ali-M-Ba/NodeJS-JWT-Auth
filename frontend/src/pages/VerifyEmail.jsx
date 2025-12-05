import VerifyEmailForm from "../components/VerifyEmailForm";
import Navbar from "../components/Navbar";

const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-300">
      <Navbar />
      <VerifyEmailForm />
    </div>
  );
};

export default VerifyEmail;
