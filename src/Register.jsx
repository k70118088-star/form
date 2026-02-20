import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";


const Register = () => {
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const [error, setError] = useState(false);
  const [emailExistsError, setEmailExistsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 


const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setFormDetails({
    ...formDetails,
    profileImage: imageUrl,
  });
};



  const handleSubmit = (e) => {
    e.preventDefault();
    setError(true);

    const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

    const emailExists = storedUsers.some(
      (user) => user.email === formDetails.email,
    );

    setEmailExistsError(emailExists);

    if (
      formDetails.firstName &&
      formDetails.lastName &&
      formDetails.email &&
      formDetails.password &&
      formDetails.confirmPassword &&
      formDetails.profileImage &&
      formDetails.password === formDetails.confirmPassword &&
      !emailExists
    ) {
      const newUser = {
        firstName: formDetails.firstName,
        lastName: formDetails.lastName,
        email: formDetails.email,
        password: formDetails.password,
        profileImage: formDetails.profileImage,
      };

      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem("userData", JSON.stringify(updatedUsers));

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
         navigate("/login")
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-1">Sign up</h2>
        <p className="text-[#112D49] text-center mb-4">Create your account to unlock access and stay updated with everything we offer.</p>

        <div className="flex flex-col items-center mb-4">
          <div className="w-84 p-2 h-40 rounded-lg bg-gray-200 overflow-hidden  mb-2">
            {formDetails.profileImage ? (
              <img
                src={formDetails.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-sm">
                No Image
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm"
          />

          {error && !formDetails.profileImage && (
            <p className="text-red-500 text-sm mt-1">
              Profile image is required
            </p>
          )}
        </div>

        <input
          type="text"
          placeholder="First Name"
          value={formDetails.firstName}
          onChange={(e) =>
            setFormDetails({
              ...formDetails,
              firstName: e.target.value,
            })
          }
          className="w-full p-2 rounded-[102px] bg-[#F4F8F7] mb-2"
        />
        {error && !formDetails.firstName && (
          <p className="text-red-500 text-sm mb-2">First name is required</p>
        )}

        <input
          type="text"
          placeholder="Last Name"
          value={formDetails.lastName}
          onChange={(e) =>
            setFormDetails({
              ...formDetails,
              lastName: e.target.value,
            })
          }
          className="w-full p-2  rounded-[102px] bg-[#F4F8F7] mb-2"
        />
        {error && !formDetails.lastName && (
          <p className="text-red-500 text-sm mb-2">Last name is required</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={formDetails.email}
          onChange={(e) => {
            setFormDetails({
              ...formDetails,
              email: e.target.value,
            });
            setEmailExistsError(false);
          }}
          className="w-full p-2 rounded-[102px] bg-[#F4F8F7] mb-2"
        />
        {error && !formDetails.email && (
          <p className="text-red-500 text-sm mb-2">Email is required</p>
        )}
        {emailExistsError && (
          <p className="text-red-500 text-sm mb-2">Email already exists</p>
        )}

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formDetails.password}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                password: e.target.value,
              })
            }
            className="w-full p-2 rounded-[102px] bg-[#F4F8F7]"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        {error && !formDetails.password && (
          <p className="text-red-500 text-sm mb-2">Password is required</p>
        )}

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={formDetails.confirmPassword}
          onChange={(e) =>
            setFormDetails({
              ...formDetails,
              confirmPassword: e.target.value,
            })
          }
          className="w-full  p-2 rounded-[102px] bg-[#F4F8F7] mb-2"
        />
        {error && !formDetails.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">
            Confirm password is required
          </p>
        )}
        {error &&
          formDetails.confirmPassword &&
          formDetails.password !== formDetails.confirmPassword && (
            <p className="text-red-500 text-sm mb-2">Passwords do not match</p>
          )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded-[102px] mt-2 text-white transition-all duration-300 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#112D49] hover:bg-gray-800"
          }`}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
        <p className="text-[#41576D] text-center text-base font-normal mt-3 opacity-80">Already a member? <span className=" text-[#112D49] underline decoration-1 decoration-[#112D49]"> <Link to="/login">Log in</Link></span></p>
      </form>
    </div>
  );
};

export default Register;
