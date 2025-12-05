import LoginSignupForm from "../components/LoginSignupForm";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-300">
        <Navbar />
        <LoginSignupForm />
      </div>
    </div>
  );
};

export default Login;
