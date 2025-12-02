import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="flex flex-col-reverse sm:flex-row items-center justify-between px-32 w-full">
      {/* Left Content */}
      <div className="text-center sm:text-left">
        {/* Headings */}
        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 mb-3">
          Hey there, {user?.userName || "stranger !"}
          <span className="inline-block animate-wave">👋🏻</span>
        </h1>

        <h2 className="text-7xl font-extrabold text-gray-900 mb-6 w-3xl">
          Welcome to my Auth App
        </h2>

        {/* Descriptions */}
        <p className="text-lg text-gray-700 leading-relaxed">
          Take a quick tour and get started securely in just a few clicks.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          Fast, simple, and safe — just for you.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="bg-pink-600 text-white font-bold border-2 border-black px-8 py-3 shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150"
        >
          Get Started
        </button>
      </div>

      {/* Right Image */}
      <div className="shrink-0">
        <img
          className="w-72 sm:w-96 mb-6 sm:mb-0"
          src={assets.simp_img}
          alt="Illustration of secure login"
        />
      </div>
    </header>
  );
};

export default Header;
