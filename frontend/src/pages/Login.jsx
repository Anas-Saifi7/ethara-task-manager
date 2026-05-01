import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setError("All fields are required");
    }

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      setAuthToken(res.data.token);

      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back 👋</h2>
          <p className="text-sm text-gray-500 mt-1">Login to your account</p>
        </div>

        <div className="space-y-4">

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

        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button onClick={handleSubmit} className="w-full mt-3 bg-blue-600 text-white py-2.5 rounded-lg">
          Login
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="text-blue-600 cursor-pointer">
            Signup
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;