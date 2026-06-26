import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/signup`,
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

    toast.success("Account created successfully 🚀");

    window.location.href = "/";
  } catch (error) {
    console.log(error);
    toast.error(
        error.response?.data?.message ||
        "Signup Failed"
        );
  }
};

  return (
 <form autoComplete="off">
  <div className="min-h-screen bg-[#071428] flex justify-center items-center px-4">

    <div
      className="
      bg-slate-900/70
      backdrop-blur-xl
      border border-cyan-500/20
      p-8
      rounded-3xl
      w-full
      max-w-md
      shadow-2xl
    "
    >

      <div className="text-center mb-8">

        <h1 className="text-4xl font-bold text-white">
          Create Account
        </h1>

        <p className="text-slate-400 mt-2">
          Join InterviewLens AI
        </p>

      </div>

      <input
        type="text"
        name="user_name_random"
        autoComplete="off"
        value={form.name}
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
        placeholder="Full Name"
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <input
        type="email"
        name="new_email"
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
        name="new_password"
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
        mb-5
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

      <button
        onClick={handleSignup}
        className="
        w-full
        bg-cyan-600
        hover:bg-cyan-700
        text-white
        py-3
        rounded-xl
        font-semibold
        transition
        "
      >
        Create Account
      </button>

      <div className="text-center mt-6">

        <span className="text-slate-400">
          Already have an account? 
        </span>

        <a
          href="/login"
          className="
          text-cyan-400
          hover:text-cyan-300
          font-medium ml-2
          "
        >
           Login
        </a>

      </div>

    </div>

  </div>
  </form>
);
}

export default Signup;