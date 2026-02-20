import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(true);
    setLoginError("");

    const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

    const user = storedUsers.find(
      (e) =>
        e.email === loginDetails.email && e.password === loginDetails.password,
    );

    if (!loginDetails.email || !loginDetails.password) return;

    if (user) {
      setError(false);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        navigate("/profile");
      }, 2000);
    } else {
      setLoginError("Invalid Email or Password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-90">
        <h2 className="text-2xl font-bold text-center text-[#112D49] mb-1">
          Welcome back!
        </h2>
        <p className="max-w-81.5 text-base font-normal text-center text-[#112D49] mb-5">
          Log in below to access your account and keep things running smoothly.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full bg-[#F4F8F7] p-2 px-4 rounded-[102px] mb-2"
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails({
                ...loginDetails,
                email: e.target.value,
              })
            }
          />

          {error && !loginDetails.email && (
            <p className="text-red-500 text-sm mb-2">Email is required</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full bg-[#F4F8F7] p-2 px-4 rounded-[102px] mb-2"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  password: e.target.value,
                })
              }
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && !loginDetails.password && (
            <p className="text-red-500 text-sm mb-2">Password is required</p>
          )}

          {loginError && (
            <p className="text-red-500 text-sm mb-2">{loginError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#112D49] text-white p-2 rounded-[102px] mt-2 flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-[#41576D] text-center text-base font-normal mt-3">
            Don’t have an account?
            <span className="text-[#112D49] underline decoration-1 decoration-[#112D49]">
              <Link to="/register">Create account</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
