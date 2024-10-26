import { useState } from "react";

const UserAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    Number: "",
    number: "",
    password: "",
  });
  const [error, setError] = useState({
    fullName: "",
    emailOrNumber: "",
    number: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: "",
      emailOrNumber: "",
      number: "",
      password: "",
    });
    setError({
      fullName: "",
      emailOrNumber: "",
      number: "",
      password: "",
    });
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      fullName: "",
      emailOrNumber: "",
      number: "",
      password: "",
    });
    setMessage("");

    try {
      const response = await fetch(
        isLogin
          ? `${import.meta.env.VITE_API_BASE_URL}/users/login`
          : `${import.meta.env.VITE_API_BASE_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isLogin
              ? {
                  email: formData.emailOrNumber.includes("@")
                    ? formData.emailOrNumber
                    : undefined,
                  number: formData.emailOrNumber.match(/^\d+$/)
                    ? formData.emailOrNumber
                    : undefined,
                  password: formData.password,
                }
              : {
                  fullName: formData.fullName,
                  email: formData.emailOrNumber.includes("@")
                    ? formData.emailOrNumber
                    : undefined,
                  number: formData.number,
                  password: formData.password,
                }
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (data.message.includes("Full Name")) {
          setError((prev) => ({ ...prev, fullName: data.message }));
        } else if (
          data.message.includes("Email") ||
          data.message.includes("Phone Number")
        ) {
          setError((prev) => ({
            ...prev,
            emailOrNumber: data.message,
          }));
        } else if (data.message.includes("Password")) {
          setError((prev) => ({ ...prev, password: data.message }));
        } else {
          setMessage(data.message);
        }
      } else {
        if (data.token) {
          document.cookie = `token=${data.token}; path=/; max-age=3600; HttpOnly; Secure;`;
          setMessage(
            isLogin
              ? "Login successful!"
              : "Registration successful! You can now log in."
          );
        }

        setFormData({
          fullName: "",
          emailOrNumber: "",
          number: "",
          password: "",
        });
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.", err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black p-4">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        {message && (
          <p className="text-center mb-4 text-sm text-green-500">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Full Name for Register */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your full name"
                required
              />
              {error.fullName && (
                <p className="text-red-500 text-sm mt-2">{error.fullName}</p>
              )}
            </div>
          )}

          {/* Email or Phone Number */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Email or Phone Number</label>
            <input
              type="text"
              name="emailOrNumber"
              value={formData.emailOrNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email or phone number"
              required
            />
            {error.emailOrNumber && (
              <p className="text-red-500 text-sm mt-2">{error.emailOrNumber}</p>
            )}
          </div>

          {/* Phone Number for Register */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your phone number"
                required
              />
              {error.number && (
                <p className="text-red-500 text-sm mt-2">{error.number}</p>
              )}
            </div>
          )}

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-sm mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              required
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-2">{error.password}</p>
            )}
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-md transition duration-300"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={toggleAuthMode}
            className="text-sm text-black hover:underline"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;
