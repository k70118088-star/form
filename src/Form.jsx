import { useState, useEffect } from "react";

const Form = () => {
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setErrors] = useState(false);
  const [userData, setUserData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailExistsError, setEmailExistsError] = useState(false);


  useEffect(() => {
    const storedUsers = localStorage.getItem("userData");
   
    if (storedUsers) {
      const parsed = JSON.parse(storedUsers);
      setUserData(Array.isArray(parsed) ? parsed : [parsed]);
    }
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
    setErrors(true);

   const emailExists = userData.some(
    (user) => user.email === formDetails.email
  );

 
  if (emailExists) {
    setEmailExistsError(true);
  } else {
    setEmailExistsError(false);
  }

    if (
      formDetails.firstName &&
      formDetails.lastName &&
      formDetails.email &&
      formDetails.password &&
      formDetails.confirmPassword &&
      formDetails.password === formDetails.confirmPassword &&
      !emailExists
    ) {
      setLoading(true);

      setTimeout(() => {
        const newUser = {
          firstName: formDetails.firstName,
          lastName: formDetails.lastName,
          email: formDetails.email,
          password: formDetails.password,
        };

        const updatedUsers = [...userData, newUser];

        setUserData(updatedUsers);
        localStorage.setItem("userData", JSON.stringify(updatedUsers));

        setShowForm(false);

        setFormDetails({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setErrors(false);
        setShowPassword(false);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-300 flex-col gap-8">
      {!showForm && (
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 text-center transition-all duration-300 hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Registered Users
          </h2>

          {userData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-400 text-4xl">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="No Data Found"
                    className="w-24 h-24 mb-4 opacity-60"
                  />
                </span>
              </div>

              <p className="text-gray-500 text-lg font-semibold">
                No Results Found
              </p>

              <p className="text-gray-400 text-sm mt-1">
                No data available at the moment.
              </p>
            </div>
          ) : (
            userData.map((user, index) => (
              <div key={index} className="mb-4 border-b pb-3 text-left">
                <p>
                  <strong>First Name:</strong> {user.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            ))
          )}

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 m-auto bg-black hover:bg-gray-800 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-all duration-300"
          >
            +
          </button>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={clickHandler}
          className="bg-white p-8 rounded-2xl shadow-2xl w-96 flex flex-col gap-4 animate-fadeIn"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
            Registration Form
          </h2>

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
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          {error && !formDetails.firstName && (
            <p className="text-red-500 text-sm">First name is required</p>
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
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          {error && !formDetails.lastName && (
            <p className="text-red-500 text-sm">Last name is required</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={formDetails.email}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                email: e.target.value,
              })
            }
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          {error && !formDetails.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
          {emailExistsError && (
            <p className="text-red-500 text-sm mt-1">Email already exists</p>
          )}

          <div className="relative">
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
              className="border p-3 rounded-lg w-full pr-16 focus:outline-none focus:ring-2 focus:ring-black transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-blue-600 text-sm font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && !formDetails.password && (
            <p className="text-red-500 text-sm">Password is required</p>
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
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          {error && !formDetails.confirmPassword && (
            <p className="text-red-500 text-sm">Confirm password is required</p>
          )}
          {error &&
            formDetails.confirmPassword &&
            formDetails.password !== formDetails.confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}

          <button
            type="submit"
            disabled={loading}
            className={`py-2 rounded mt-2 text-white transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submiting...
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
