import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "member",
  });

  const navigate = useNavigate();
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return setError("All fields are required");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await API.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        adminCode
        // role: formData.role,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Create your account</h2>
          <p className="text-sm text-gray-500 mt-1">Start your journey 🚀</p>
        </div>

        <div className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleChange}
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 cursor-pointer">
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Enter Admin Code (optional)"
            className="w-full px-4 py-2 border rounded-lg"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
          />

        </div>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

        <button onClick={handleSubmit} className="w-full mt-3 bg-blue-600 text-white py-2.5 rounded-lg">
          Sign up
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <span onClick={() => navigate("/")} className="text-blue-600 cursor-pointer">
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;