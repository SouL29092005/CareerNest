import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, BriefcaseBusiness } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/apiConstants";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
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
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12 text-white">
        <div className="w-full max-w-md">
          <form
            onSubmit={submitHandler}
            className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8"
          >
            <div className="flex flex-col items-center mb-8">
              <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4">
                <BriefcaseBusiness className="w-8 h-8 text-white" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight">
                Welcome Back
              </h1>

              <p className="text-sm text-gray-300 mt-2">
                Login to continue your journey
              </p>
            </div>

            <div className="mb-5">
              <Label className="text-gray-200 mb-2 block">Email</Label>

              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="myemail@gmail.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-indigo-500 h-11"
              />
            </div>

            <div className="mb-5">
              <Label className="text-gray-200 mb-2 block">Password</Label>

              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter your password"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-indigo-500 h-11"
              />
            </div>

            <div className="mb-6">
              <Label className="text-gray-200 mb-3 block">Continue as</Label>

              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`flex items-center justify-center gap-2 border rounded-xl p-3 cursor-pointer transition-all duration-200 ${
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
                  className={`flex items-center justify-center gap-2 border rounded-xl p-3 cursor-pointer transition-all duration-200 ${
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

            {loading ? (
              <Button
                disabled
                className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200"
              >
                Login
              </Button>
            )}

            <p className="text-sm text-center text-gray-300 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-sky-400 hover:text-sky-300 font-medium"
              >
                Sign Up Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
