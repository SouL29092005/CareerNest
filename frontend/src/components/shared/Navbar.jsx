import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/apiConstants";
import Logo from "./Logo";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
        <Logo />
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors duration-200"
                    to="/admin/companies"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors duration-200"
                    to="/admin/jobs"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors duration-200"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors duration-200"
                    to="/jobs"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors duration-200"
                    to="/browse"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                className="hover:text-violet-600 transition-colors duration-200"
                to="/login"
              >
                <Button variant="outline" className="rounded-full">
                  Login
                </Button>
              </Link>
              <Link
                className="hover:text-violet-600 transition-colors duration-200"
                to="/signup"
              >
                <Button className="rounded-full px-5 bg-violet-600 hover:bg-violet-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-violet-500 transition-all duration-200">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 shadow-xl border border-gray-200">
                <div className="">
                  <div className="flex gap-3 items-start">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-violet-600 transition-colors duration-200">
                        <User2 />
                        <Button variant="link">
                          {" "}
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-violet-600 transition-colors duration-200">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
