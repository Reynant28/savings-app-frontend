import { Link, useLocation } from "react-router-dom";
import { Wallet } from "lucide-react";

function LandingNavigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-20">
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br from-[#628141] to-[#536a37] shadow-lg">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="text-white text-2xl font-bold">Savings App</span>
      </Link>
      
      <div className="flex items-center gap-3">
        {currentPath === "/" && (
          <>
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg text-white font-medium hover:bg-white hover:text-gray-900 hover:bg-opacity-10 transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg text-white bg-[#536a37] font-semibold shadow-lg hover:shadow-xl hover:bg-[#3e5229] transition-all duration-200"
            >
              Sign Up
            </Link>
          </>
        )}
        {currentPath === "/login" && (
          <Link
            to="/register"
            className="px-5 py-2 rounded-lg text-white bg-[#536a37] font-semibold shadow-lg hover:shadow-xl hover:bg-[#3e5229] transition-all duration-200"
          >
            Sign Up
          </Link>
        )}
        {currentPath === "/register" && (
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg text-white bg-[#536a37] font-semibold shadow-lg hover:shadow-xl hover:bg-[#3e5229] transition-all duration-200"
          >
            Sign In
          </Link>
        )}
        {currentPath === "/dashboard" && (
          <Link
            to="/"
            className="px-5 py-2 rounded-lg text-white font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-200"
          >
            Home
          </Link>
        )}
      </div>
    </div>
  );
}

export default LandingNavigation;