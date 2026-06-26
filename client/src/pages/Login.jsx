import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      form
    );

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "name",
      response.data.user.name
    );
    localStorage.setItem(
    "email",
    response.data.user.email
    );

    toast.success("Login Successful");

    window.location.href = "/";
  } catch (error) {
    console.log(error);
    toast.error("Invalid Email or Password");
  }
};
return (
  <div
    className="
    min-h-screen
    flex
    justify-center
    items-center
    bg-[#071428]
    px-4
    "
  >
    <div
      className="
      w-full
      max-w-md
      bg-slate-900/80
      backdrop-blur-xl
      border
      border-cyan-500/20
      rounded-3xl
      p-8
      shadow-2xl
      "
    >
      <h1 className="text-4xl font-bold text-white text-center mb-2">
        Welcome Back
      </h1>

      <p className="text-slate-400 text-center mb-8">
        Login to InterviewLens AI
      </p>
    
    <form autoComplete="off">
      <input
        type="email"
        name={`email_${Date.now()}`}
        autoComplete="new-email"
        value={form.email}
        className="
        w-full
        bg-slate-800
        border
        border-slate-700
        text-white
        p-3
        rounded-xl
        mb-4
        focus:outline-none
        focus:border-cyan-500
        "
        placeholder="Email Address"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        name={`password_${Date.now()}`}
        autoComplete="new-password"
        value={form.password}
        className="
        w-full
        bg-slate-800
        border
        border-slate-700
        text-white
        p-3
        rounded-xl
        mb-3
        focus:outline-none
        focus:border-cyan-500
        "
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />
    </form>

      <div className="flex justify-end mb-5">
        <div className="text-right mb-4">
  <NavLink
    to="/forgot-password"
    className="
    text-cyan-400
    hover:text-cyan-300
    text-sm
  "
  >
    Forgot Password?
  </NavLink>
</div>
      </div>

      <button
        onClick={handleLogin}
        className="
        w-full
        bg-cyan-600
        hover:bg-cyan-700
        text-white
        py-3
        rounded-xl
        font-semibold
        transition-all
        "
      >
        Login
      </button>

      <div className="text-center mt-6">
        <span className="text-slate-400">
          Don't have an account?
        </span>

        <a
          href="/signup"
          className="
          ml-2
          text-cyan-400
          hover:text-cyan-300
          font-medium
          "
        >
          Sign Up
        </a>
      </div>
    </div>
  </div>
);
}

export default Login;