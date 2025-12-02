import userApi from "../api/userApi";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, sendVerifyOtp } = useAuth();

  const handleAccountVerification = async () => {
    const { success, message } = await sendVerifyOtp();

    success
      ? toast.success(message) && navigate("/verify-email")
      : toast.error(message);
  };

  return (
    <div className="w-full flex justify-between items-center bg-white border-b-4 p-4 sm:p-6 sm:px-32 absolute top-0">
      <img src={assets.logo} className="w-28 s:w-32" />
      {user ? (
        <div className="relative group flex items-center justify-center bg-green-500 border-3 w-12 h-12 rounded-full font-bold shadow-[2px_2px_0_#000]">
          {user?.userName[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 pt-12">
            <ul className="list-none cursor-pointer m-0 bg-white w-max border-4 border-black shadow-[4px_4px_0_#000]">
              {!user.isVerified && (
                <li
                  onClick={handleAccountVerification}
                  className="p-3 pr-10 bg-yellow-300 border-b-4 border-black font-bold hover:bg-yellow-200 transition"
                >
                  Verify Email
                </li>
              )}

              <li
                onClick={logout}
                className="p-3 pr-10 bg-red-300 font-bold hover:bg-red-200 transition"
              >
                Log out
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center bg-blue-600 text-white gap-2 border-2 border-black px-6 py-2 font-bold shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          Log in
          <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
