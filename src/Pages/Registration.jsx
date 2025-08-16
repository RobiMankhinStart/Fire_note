import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import { BeatLoader, ClockLoader } from "react-spinners";
import { Link } from "react-router";
const Registration = () => {
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: "",
  });
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   const [errors, setErrors] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    )
      return setFormData((prev) => ({
        ...prev,
        errors: "fill up all the filds",
      }));
    if (!emailRegex.test(formData.email))
      return setFormData((prev) => ({
        ...prev,
        errors: "invalid email",
      }));
    if (!passwordRegex.test(formData.password))
      return setFormData((prev) => ({
        ...prev,
        errors: "Provide a strong Password",
      }));
    if (formData.password !== formData.confirmPassword)
      return setFormData((prev) => ({
        ...prev,
        errors: "Passwords do not match",
      }));
    // setFormData((prev) => ({ ...prev, errors: "" }));
    console.log("formData : ", formData);
    setLoading(true);
    // .....................firebase Authention.....................
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("user : ", user);

        updateProfile(auth.currentUser, {
          displayName: formData.name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              toast.info("varification code sent", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
              setLoading(false);
            });
          })
          .catch((error) => {
            console.log("varification error :", error);
            setLoading(false);
          });

        // toast.success("Registration successfull", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        //   transition: Bounce,
        // });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setLoading(false);
        if (errorCode == "auth/email-already-in-use") {
          toast.error("Email already in use", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
        // ..
      });
    setFormData((prev) => ({
      ...prev,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: "",
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="mainDiv min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="header p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <p className="mt-1 text-lg text-red-600">{formData.errors}</p>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2
             
              `}
              placeholder="John Doe"
            />
            {/* {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )} */}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
              }}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 `}
              placeholder="john@example.com"
            />
            {/* {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )} */}
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
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2  pr-10`}
                placeholder="••••••••"
              />
              {/* ${
                  errors.password
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-purple-300"
                } */}
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-purple-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )} */}
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 8 characters with uppercase, lowercase, and a
              number
            </p>
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
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }));
                }}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2  pr-10`}
                placeholder="••••••••"
              />
              {/* $
              {errors.confirmPassword
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-purple-300"} */}
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-purple-600"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )} */}
          </div>

          <div className="pt-4">
            {/* <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            >
              Register
            </button> */}
            {loading ? (
              <button
                type="submit"
                className="rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 cursor-pointer w-full  font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-3"
              >
                <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">
                  <BeatLoader />
                </span>
                <span className="absolute w-full h-full bg-green-500 -left-47 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                <span className="absolute w-full h-full bg-green-500 -right-47 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 cursor-pointer w-full  font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-3"
              >
                <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">
                  Register
                </span>
                <span className="absolute w-full h-full bg-green-500 -left-47 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                <span className="absolute w-full h-full bg-green-500 -right-47 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
              </button>
            )}
          </div>
        </form>

        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
