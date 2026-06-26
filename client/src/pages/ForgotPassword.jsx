import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
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
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-slate-400 text-center mb-6">
          Enter your registered email
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email Address"
          className="
          w-full
          bg-slate-800
          border border-slate-700
          text-white
          p-3
          rounded-xl
          mb-4
          focus:outline-none
          focus:border-cyan-500
        "
        />

        <button
          onClick={handleSubmit}
          className="
          w-full
          bg-cyan-600
          hover:bg-cyan-700
          text-white
          py-3
          rounded-xl
          font-semibold
        "
        >
          Send Reset Link
        </button>
      </div>

    </div>
  );
}

export default ForgotPassword;