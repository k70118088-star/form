import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

    if (storedUsers.length > 0) {
      setUser(storedUsers[storedUsers.length - 1]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/register");
  };

  

  return (
    <div className="min-h-screen bg-gray-100">
      {user && (
        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
          <h1 className="text-xl font-bold">Profile</h1>

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover "
            />

            <span className="font-medium">
              {user.firstName?.charAt(0).toUpperCase()}
              {user.lastName?.charAt(0).toUpperCase()}
            </span>
          </div>

          {showDropdown && (     
            <div className="absolute right-6 top-16 bg-white shadow-lg rounded-lg w-40 py-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center items-center px-4 py-10">
        {user ? (
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-semibold mb-2">First Name</label>
                <input
                  type="text"
                  value={user.firstName}
                  readOnly
                  className="w-full border-2 border-[#858585] rounded-lg p-3 bg-gray-50"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Last Name</label>
                <input
                  type="text"
                  value={user.lastName}
                  readOnly
                  className="w-full border-2 border-[#858585] rounded-lg p-3 bg-gray-50"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full border-2 border-[#858585] rounded-lg p-3 bg-gray-50"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  readOnly
                  className="w-full border-2 border-[#858585] rounded-lg p-3 bg-gray-50 pr-16"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-gray-500">No Profile Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
