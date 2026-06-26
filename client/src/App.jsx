import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import InterviewAnalysis from "./pages/InterviewAnalysis";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { toast } from "react-toastify";
import Footer from "./pages/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const userName =
  localStorage.getItem("name") || "User";

const confirmLogout = () => {
  toast(
    ({ closeToast }) => (
      <div>
        <p className="mb-3">
          Are you sure you want to logout?
        </p>

        <div className="flex gap-2">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => {
              toast.success("Logged out successfully");

              closeToast();

              setTimeout(() => {
                localStorage.clear();
                window.location.href = "/login";
              }, 1000);
            }}
          >
            Logout
          </button>

          <button
            className="bg-gray-500 text-white px-3 py-1 rounded"
            onClick={closeToast}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
    }
  );
};

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileStats, setProfileStats] = useState(null);

  const userName =
    localStorage.getItem("name") || "User";
    const token = localStorage.getItem("token");

useEffect(() => {
  fetchProfileStats();
}, []);

const fetchProfileStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:5000/api/analytics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProfileStats(response.data);
  } catch (error) {
    console.log(error);
  }
};


    
  return (
     <div className="min-h-screen bg-[#071428]">
    <BrowserRouter>

      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
  <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

    {/* Logo */}
    <div className="flex items-center gap-3">
      <img
        src="/logo.png"
        alt="logo"
        className="h-12 w-12"
      />

      <span className="text-white text-3xl font-light">
        <b>InterviewLens AI</b>
      </span>
    </div>

    {/* Desktop Menu */}
    <div className="hidden md:flex gap-6 text-white font-medium items-center">

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-cyan-300 font-bold"
            : "hover:text-gray-300"
        }
      >
        Analyze
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) =>
          isActive
            ? "text-cyan-300 font-bold"
            : "hover:text-gray-300"
        }
      >
        History
      </NavLink>

      <NavLink
        to="/analytics"
        className={({ isActive }) =>
          isActive
            ? "text-cyan-300 font-bold"
            : "hover:text-gray-300"
        }
      >
        Analytics
      </NavLink>

      {!token && (
  <>
    <NavLink
      to="/login"
      className={({ isActive }) =>
        isActive
          ? "text-cyan-300 font-bold"
          : "hover:text-gray-300"
      }
    >
      Login
    </NavLink>

    <NavLink
      to="/signup"
      className={({ isActive }) =>
        isActive
          ? "text-cyan-300 font-bold"
          : "hover:text-gray-300"
      }
    >
      Signup
    </NavLink>
  </>
)}

      {token && (
      <div className="relative">
        <button
          onClick={() =>
            setShowMenu(!showMenu)
          }
          className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/20"
        >
          👤 {userName}
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40 z-50">

            <button
              onClick={() => {
                fetchProfileStats();
                setShowProfile(true);
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              Profile
            </button>

            <button
              onClick={confirmLogout}
              className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600"
            >
              Logout
            </button>

          </div>
        )}
      </div>
      )}

    </div>

    {/* Mobile Hamburger */}
    <button
      className="md:hidden text-white text-3xl"
      onClick={() =>
        setMobileMenu(!mobileMenu)
      }
    >
      ☰
    </button>

  </div>

  {/* Mobile Menu */}
  {mobileMenu && (
    <div className="md:hidden bg-slate-900 text-white px-6 py-4 space-y-4">

      <NavLink
        to="/"
        className="block"
         onClick={() => setMobileMenu(false)}
      >
        Analyze
      </NavLink>

      <NavLink
        to="/history"
        className="block"
         onClick={() => setMobileMenu(false)}
      >
        History
      </NavLink>

      <NavLink
        to="/analytics"
        className="block"
         onClick={() => setMobileMenu(false)}
      >
        Analytics
      </NavLink>

      {token ? (
  <>
    <div className="border-t border-white/20 pt-4">

  <div className="flex items-center gap-3 mb-4">

    <div
      className="
      w-10 h-10
      rounded-full
      bg-cyan-600
      flex
      items-center
      justify-center
      font-bold
      "
    >
      {userName
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()}
    </div>

    <div>
      <p className="text-cyan-300 font-semibold">
        {userName}
      </p>

      <p className="text-xs text-slate-400">
        {localStorage.getItem("email")}
      </p>
    </div>

  </div>

  <button
    onClick={() => {
      setShowProfile(true);
      setMobileMenu(false);
    }}
    className="
    block
    w-full
    text-left
    py-2
    text-white
    hover:text-cyan-300
    "
  >
    👤 Profile
  </button>

  <button
    onClick={confirmLogout}
    className="
    block
    w-full
    text-left
    py-2
    text-red-400
    hover:text-red-300
    "
  >
    🚪 Logout
  </button>

</div>
  </>
) : (
  <>
    <NavLink
      to="/login"
      className="block"
    >
      Login
    </NavLink>

    <NavLink
      to="/signup"
      className="block"
    >
      Signup
    </NavLink>
  </>
)}

    </div>
  )}
</nav>

{showProfile && (
  <div
    className="
    fixed inset-0
    bg-black/60
    flex
    justify-center
    items-center
    z-50
    "
  >
    <div
      className="
      bg-slate-900/90
      backdrop-blur-xl
      border
      border-cyan-500/20
      rounded-3xl
      p-8
      w-[400px]
      shadow-2xl
      "
    >
      <div className="text-center">

        <div
          className="
          w-20 h-20
          rounded-full
          bg-cyan-600
          flex
          items-center
          justify-center
          text-3xl
          mx-auto
          mb-4
          text-white
          "
        >
          {userName
          .split(" ")
          .map(word => word[0])
          .join("")
          .toUpperCase()}
        </div>

        <h2 className="text-2xl text-white font-bold">
          {userName}
        </h2>

        <p className="text-slate-400 mt-2">
          {localStorage.getItem("email")}
        </p>
        <div
  className="
  mt-4
  inline-flex
  items-center
  px-3
  py-1
  rounded-full
  bg-green-500/20
  text-green-400
  text-sm
  "
>
  ● Active Member
</div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

  <div className="bg-slate-800 p-4 rounded-xl">
    <p className="text-slate-400 text-sm">
      Interviews
    </p>

    <p className="text-cyan-400 text-2xl font-bold">
      {profileStats?.totalInterviews || 0}
    </p>
  </div>

  <div className="bg-slate-800 p-4 rounded-xl">
    <p className="text-slate-400 text-sm">
      Average Score
    </p>

    <p className="text-green-400 text-2xl font-bold">
      {profileStats?.averageScore || 0}
    </p>
  </div>

  <div className="bg-slate-800 p-4 rounded-xl">
    <p className="text-slate-400 text-sm">
      Best Score
    </p>

    <p className="text-yellow-400 text-2xl font-bold">
      {profileStats?.bestScore || 0}
    </p>
  </div>

  <div className="bg-slate-800 p-4 rounded-xl">
    <p className="text-slate-400 text-sm">
      Improvement
    </p>

    <p className="text-purple-400 text-2xl font-bold">
      {profileStats?.improvement || 0}
    </p>
  </div>

</div>
<div className="mt-6 text-center">
  <p className="text-slate-500 text-sm">
    InterviewLens AI
  </p>

  <p className="text-slate-600 text-xs">
    AI Interview Failure Analyzer
  </p>
  <p className="text-slate-600 text-xs">
    © By Aakanshi Malik
  </p>
</div>

      <button
        onClick={() =>
          setShowProfile(false)
        }
        className="
        w-full
        mt-6
        bg-cyan-600
        hover:bg-cyan-700
        text-white
        py-3
        rounded-xl
        "
      >
        Close
      </button>

    </div>
  </div>
)}

      <Routes>

        <Route
          path="/"
          element={<InterviewAnalysis />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

      </Routes>
      

    </BrowserRouter>
  
    <Footer/>
    </div>
    
  );
}

export default App;