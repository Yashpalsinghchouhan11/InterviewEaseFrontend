import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, logOut } from "../../features/userSlice";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";


export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LoggedIn = useSelector(isAuthenticated);
  const location = useLocation();
  const iconColor = location.pathname === "/";

  const toggleMenu = () => setMobileMenu(!mobileMenu);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <header className="w-full shadow-md font-poppins sticky top-0 z-50 bg-[#F3F5F9] text-black">
      {/* 🔹 Top Marquee */}
      <div className="w-full bg-[#9381FF] text-black text-xs py-1 overflow-hidden whitespace-nowrap">
        <marquee behavior="scroll" direction="left" scrollamount="5">
          🎉 Interview Based on Resume Feature Added Soon!
        </marquee>
      </div>

      {/* 🔹 Navbar */}
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo (Left side - Desktop & Mobile) */}
        <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-[#9381FF] via-[#3A86FF] to-[#8338EC] bg-clip-text text-transparent">
          InterviewEase
        </h1>

        {/* 🔹 Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6 text-base">
            <Link to="/" className="hover:text-[#9381FF] transition">
              Home
            </Link>
            <Link to="/" className="hover:text-[#9381FF] transition">
              Pricing
            </Link>
            <Link to="/" className="hover:text-[#9381FF] transition">
              Resume
            </Link>
          </nav>

          {/* Auth Buttons */}
          {!LoggedIn ? (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-[#9381FF] text-white hover:bg-[#a394f5] transition"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md border border-[#9381FF] text-[#9381FF] hover:bg-[#9381FF] hover:text-white transition"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* 🔹 Mobile Topbar */}
        <div className="md:hidden flex items-center gap-2">
          {!LoggedIn ? (
            <>
              <Link
                to="/signup"
                className="px-3 py-1 text-sm rounded-md bg-[#9381FF] text-white hover:bg-[#a394f5] transition"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="px-3 py-1 text-sm rounded-md border border-[#9381FF] text-[#9381FF] hover:bg-[#9381FF] hover:text-white transition"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          )}

          {/* Menu Icon */}
          <button type="button" onClick={toggleMenu} className="p-1">
            {mobileMenu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Slide Menu */}
      {mobileMenu && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-6 bg-[#F3F5F9] text-black">
          <Link to="/" onClick={toggleMenu} className="hover:text-[#9381FF] transition">
            Home
          </Link>
          <Link to="/" onClick={toggleMenu} className="hover:text-[#9381FF] transition">
            Pricing
          </Link>
          <Link to="/" onClick={toggleMenu} className="hover:text-[#9381FF] transition">
            Resume
          </Link>
        </div>
      )}
    </header>
  );
}