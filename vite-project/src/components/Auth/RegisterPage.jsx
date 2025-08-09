import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { motion } from "framer-motion";
import LottiePlayer from "./LottiePlayer";
import TextPressure from "./TextPressure";

const RegisterPage = () => {
  const { register, isSigningUp, authError } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success.success) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4 mt-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-base-100 rounded-xl shadow-2xl overflow-hidden border border-base-300">

        {/* Left: Visual section */}
        <motion.div
          className="hidden md:block bg-gradient-to-br from-secondary to-primary text-white"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center">
            <div className="p-32">
              <LottiePlayer/>
            </div>
            {/* Animated Text */}
            <div className="w-full max-w-xs">
              <TextPressure
                text="Join US!"
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

        {/* Right: Register Form */}
        <motion.div
          className="p-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-primary">Create Your Account</h1>
          <p className="text-sm text-base-content/70 mb-6">
            Sign up and unlock all the features.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                className="input input-bordered w-full mt-1"
                onChange={handleChange}
                required
              />
            </div>

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

            <div>
              <label className="text-sm font-medium">Role</label>
              <select
                name="role"
                className="select select-bordered w-full mt-1"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            {authError && <p className="text-red-500 text-sm">{authError}</p>}

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Signing up..." : "Register"}
            </button>

            <p className="text-sm text-center pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
