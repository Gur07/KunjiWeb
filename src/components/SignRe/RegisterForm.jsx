import React, { useState } from "react";
import { Eye, EyeOff, Laptop } from "lucide-react";

const RegisterForm = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration attempted with:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xl font-semibold mb-6">
          <Laptop className="h-6 w-6" />
          <span>Your Logo</span>
        </div>
        <h2 className="text-lg text-gray-600">Welcome !</h2>
        <h1 className="text-2xl font-bold mt-2">Sign up to</h1>
        <p className="text-gray-600 mt-1">Lorem ipsum is simply</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            User name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
            placeholder="Enter your user name"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
              placeholder="Enter your Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
              placeholder="Confirm your Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-black/90 transition-colors"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an Account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-black font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
