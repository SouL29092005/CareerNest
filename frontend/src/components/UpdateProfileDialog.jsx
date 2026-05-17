import { useState } from "react";

import { Dialog, DialogContent } from "./ui/dialog";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

import {
  Loader2,
  Mail,
  Phone,
  User,
  Sparkles,
  UploadCloud,
  FileText,
  Briefcase,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { USER_API_END_POINT } from "@/utils/apiConstants";
import { setUser } from "@/redux/authSlice";

import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
    profilePhoto: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];

    setInput({
      ...input,
      file,
    });
  };

  const imageChangeHandler = (e) => {
    const file = e.target.files?.[0];

    setInput({
      ...input,
      profilePhoto: file,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="
    !max-w-6xl
    w-[95vw]
    max-h-[92vh]
    p-0
    overflow-hidden
    rounded-3xl
    border-none

    [&>button]:z-50
[&>button]:cursor-pointer

[&>button]:bg-white
[&>button]:text-black

[&>button]:rounded-full
[&>button]:p-2

[&>button]:shadow-xl
[&>button]:border
[&>button]:border-gray-200

[&>button]:transition-all
[&>button]:duration-200

hover:[&>button]:scale-110
hover:[&>button]:bg-gray-100

[&>button]:top-5
[&>button]:right-7
  "
      >
        <div className="grid md:grid-cols-[0.9fr_1.4fr] max-h-[92vh]">
          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-between min-h-[92vh] bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-white relative overflow-hidden">
            {/* Background Blur Circles */}
            <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 bg-pink-400/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md">
                  <Sparkles size={30} />
                </div>

                <div>
                  <h1 className="text-3xl font-bold">Edit Profile</h1>

                  <p className="text-white/80 mt-1">
                    Upgrade your professional identity
                  </p>
                </div>
              </div>

              <div className="space-y-6 mt-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/10">
                    <User size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold">Stronger Profile</h3>

                    <p className="text-sm text-white/70">
                      A polished profile increases recruiter visibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/10">
                    <Briefcase size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold">Better Opportunities</h3>

                    <p className="text-sm text-white/70">
                      Showcase your skills and experience professionally.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="relative z-10 text-sm text-white/60">
              CareerNest • Build your future 🚀
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white p-6">
            <div className="h-[80vh] overflow-y-auto pr-4 custom-scrollbar">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Update Details
                </h2>
                <p className="text-gray-500 mt-3 text-base leading-relaxed">
                  Keep your profile updated for better job matches.
                </p>
              </div>

              {/* Profile Photo Section */}
              <div className="flex items-center justify-between p-6 rounded-3xl border border-gray-200 bg-gradient-to-r from-indigo-50 via-white to-violet-50 mb-8">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://ui-avatars.com/api/?name=User"
                        }
                      />
                    </Avatar>

                    <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-indigo-600 border-4 border-white flex items-center justify-center text-white shadow-lg">
                      <User size={14} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Profile Photo
                    </h3>

                    <p className="text-gray-500 mt-1 text-sm max-w-sm">
                      Upload a professional profile picture to improve your
                      profile appearance.
                    </p>
                  </div>
                </div>

                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={imageChangeHandler}
                    className="hidden"
                  />

                  <div className="px-5 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <UploadCloud size={18} />

                      {input.profilePhoto
                        ? input.profilePhoto.name
                        : "Change Photo"}
                    </div>
                  </div>
                </label>
              </div>
              <form onSubmit={submitHandler} className="space-y-6 pb-10">
                {/* Name */}
                <div>
                  <Label className="mb-2 block">Full Name</Label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      type="text"
                      name="fullname"
                      value={input.fullname}
                      onChange={changeEventHandler}
                      placeholder="Enter full name"
                      className="h-12 pl-11 rounded-xl border-gray-200 focus-visible:ring-indigo-500"
                    />
                  </div>
                </div>
                {/* Email + Phone */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label className="mb-2 block">Email</Label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="Enter email"
                        className="h-12 pl-11 rounded-xl border-gray-200"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 block">Phone</Label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <Input
                        type="text"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        placeholder="Phone number"
                        className="h-12 pl-11 rounded-xl border-gray-200"
                      />
                    </div>
                  </div>
                </div>
                {/* Bio */}
                <div>
                  <Label className="mb-2 block">Bio</Label>
                  <textarea
                    rows={5}
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    placeholder="Write something about yourself..."
                    className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
                {/* Skills */}
                <div>
                  <Label className="mb-2 block">Skills</Label>
                  <Input
                    type="text"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                    placeholder="React, Node.js, MongoDB..."
                    className="h-12 rounded-xl border-gray-200"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Separate skills with commas
                  </p>
                </div>
                {/* Resume Upload */}
                <div>
                  <Label className="mb-3 block">Resume</Label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-2xl p-8 cursor-pointer hover:bg-indigo-50 transition">
                    <UploadCloud size={40} className="text-indigo-500 mb-4" />
                    <p className="font-semibold text-gray-700">Upload Resume</p>
                    <p className="text-sm text-gray-500 mt-1">PDF up to 5MB</p>
                    {input.file && (
                      <div className="mt-4 flex items-center gap-2 text-indigo-600 font-medium">
                        <FileText size={18} />
                        {input.file.name}
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={fileChangeHandler}
                      className="hidden"
                    />
                  </label>
                </div>
                {/* Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
