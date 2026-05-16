import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, UserPlus } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/apiConstants";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      if (input.password !== input.confirmPassword) {
  toast.error("Passwords do not match");
  return;
}

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-white"
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-3xl font-bold">Create Account</h1>

            <p className="text-sm text-gray-300 mt-2">
              Join and start your career journey
            </p>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <Label className="text-gray-200 mb-2 block">Full Name</Label>

            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-indigo-500 h-11"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label className="text-gray-200 mb-2 block">Email</Label>

            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-indigo-500 h-11"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <Label className="text-gray-200 mb-2 block">Phone Number</Label>

            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter contact number"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-indigo-500 h-11"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
  <Label className="text-gray-200 mb-2 block">
    Password
  </Label>

  <div className="relative">
    <Input
      type={showPassword ? "text" : "password"}
      value={input.password}
      name="password"
      onChange={changeEventHandler}
      placeholder="Choose a strong password"
      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-indigo-500 h-11 pr-12"
    />

    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      onMouseDown={() => setShowPassword(true)}
      onMouseUp={() => setShowPassword(false)}
      onMouseLeave={() => setShowPassword(false)}
      onTouchStart={() => setShowPassword(true)}
      onTouchEnd={() => setShowPassword(false)}
    >
      {showPassword ? (
        <Eye className="w-5 h-5" />
      ) : (
        <EyeOff className="w-5 h-5" />
      )}
    </button>
  </div>
</div>

          {/* Confirm Password */}
          <div className="mb-4">
            <Label className="text-gray-200 mb-2 block">Confirm Password</Label>

            <Input
              type="password"
              value={input.confirmPassword}
              name="confirmPassword"
              onChange={changeEventHandler}
              placeholder="Confirm your password"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-indigo-500 h-11"
            />
          </div>

          {/* Role */}
          <div className="mb-5">
            <Label className="text-gray-200 mb-3 block">Continue as</Label>

            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-center border rounded-xl p-3 cursor-pointer transition-all duration-200 ${
                  input.role === "student"
                    ? "bg-indigo-600 border-indigo-500"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="hidden"
                />

                <span className="text-sm font-medium">Job Seeker</span>
              </label>

              <label
                className={`flex items-center justify-center border rounded-xl p-3 cursor-pointer transition-all duration-200 ${
                  input.role === "recruiter"
                    ? "bg-indigo-600 border-indigo-500"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="hidden"
                />

                <span className="text-sm font-medium">Recruiter</span>
              </label>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <Label className="text-gray-200 mb-3 block">Profile Photo</Label>

            <label
              className="
      flex items-center justify-center gap-3
      w-full h-28
      border-2 border-dashed border-white/20
      rounded-2xl
      bg-white/5 hover:bg-white/10
      cursor-pointer
      transition-all duration-200
    "
            >
              <input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="hidden"
              />

              <div className="text-center px-4">
                <p className="text-sm font-medium text-gray-200">
                  {input.file ? input.file.name : "Upload Profile Photo"}
                </p>

                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </label>
          </div>

          {/* Button */}
          {loading ? (
            <Button
              disabled
              className="w-full h-11 rounded-xl bg-indigo-600 text-white hover:bg-indigo-600 opacity-100 cursor-not-allowed"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Signup
            </Button>
          )}

          {/* Footer */}
          <p className="text-sm text-center text-gray-300 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sky-400 hover:text-sky-300 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
