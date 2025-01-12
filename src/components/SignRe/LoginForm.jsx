import React from "react";
const LoginComponent = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
      username: "",
      password: "",
      rememberMe: false,
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Login attempted with:", formData);
    };
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xl font-semibold mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9.5V6m-6 9v1a2 2 0 002 2h8a2 2 0 002-2v-1M15 11.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Your Logo</span>
              </div>
              <h2 className="text-lg text-gray-600">Welcome!</h2>
              <h1 className="text-2xl font-bold mt-2">Sign in to</h1>
              <p className="text-gray-600 mt-1">Lorem ipsum is simply</p>
            </div>
  
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.738 0-8.564-3.097-9.827-7.475A10.025 10.025 0 015.636 5.636M9 14l6-6m0 6l-6-6"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12a9 9 0 0116 0M9 9m9-2v3M4 12h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
  
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Forgot Password?
                </button>
              </div>
  
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-black/90 transition-colors"
              >
                Login
              </button>
  
              <p className="text-center text-sm text-gray-600">
                Don't have an Account?{" "}
                <button
                  type="button"
                  className="text-black font-medium hover:underline"
                >
                  Register
                </button>
              </p>
            </form>
          </div>
  
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
              alt="Login illustration"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginComponent;
  