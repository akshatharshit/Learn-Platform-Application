import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { motion } from "framer-motion";
import LottiePlayer from "./LottiePlayer";
import TextPressure from "./TextPressure";

const LoginPage = () => {
  const { login, isLoggingIn, authError } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success.success) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4 mt-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-base-100 rounded-xl shadow-2xl overflow-hidden border border-base-300">

        
        <motion.div
          className="p-10 flex flex-col justify-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-primary">Welcome Back 👋</h1>
          <p className="text-sm text-base-content/70 mb-6">
            Log in to access your dashboard and test series.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full mt-1"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full mt-1"
                onChange={handleChange}
                required
              />
            </div>

            {authError && <p className="text-red-500 text-sm">{authError}</p>}

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center pt-3">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </motion.div>

        {/* Right: Animation and text */}
        <motion.div
          className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary text-white"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-8 text-center">
            {/* Lottie Animation */}
            <div className="w-64 h-18">
             <div className="p-20 px-10">
               <LottiePlayer />
             </div>
            </div>

            {/* Animated Text */}
            <div className="w-full max-w-xs">
              <TextPressure
                text="Welcome!"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={36}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
