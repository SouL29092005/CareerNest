import { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

import { Contact, Mail, Pen, Download, Briefcase, User2 } from "lucide-react";

import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./shared/Footer";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f7ff] to-[#eef2ff]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Top Banner */}
          <div className="h-40 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 relative">
            <Button
              onClick={() => setOpen(true)}
              size="icon"
              className="absolute top-5 right-5 rounded-full bg-white text-black hover:bg-gray-100"
            >
              <Pen size={18} />
            </Button>

            <div className="absolute -bottom-14 left-8">
              <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://github.com/shadcn.png"
                  }
                  alt="profile"
                />
                {/* Fallback component in case the image fails to load entirely */}
                <AvatarFallback>
                  {user?.fullname?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 px-8 pb-8">
            {/* Name + Bio */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {user?.fullname}
              </h1>

              <p className="text-gray-600 max-w-2xl leading-relaxed">
                {user?.profile?.bio || "No bio added yet."}
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-700">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Contact size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-700">
                    {user?.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <User2 className="text-indigo-600" size={20} />
                <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {user?.profile?.skills?.length !== 0 ? (
                  user?.profile?.skills?.map((item, index) => (
                    <Badge
                      key={index}
                      className="px-4 py-2 rounded-full text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                    >
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">No skills added.</span>
                )}
              </div>
            </div>

            {/* Resume */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="text-purple-600" size={20} />
                <Label className="text-xl font-semibold text-gray-800">
                  Resume
                </Label>
              </div>

              {user?.profile?.resume ? (
                <a
                  href={user?.profile?.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl border bg-gray-50 hover:bg-indigo-50 transition-all duration-200"
                >
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                    <Download size={18} />
                  </div>

                  <div>
                    <p className="font-medium text-gray-700">
                      {user?.profile?.resumeOriginalName}
                    </p>

                    <p className="text-sm text-indigo-600">Download Resume</p>
                  </div>
                </a>
              ) : (
                <span className="text-gray-500">Resume not uploaded.</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="mt-8">
          <AppliedJobTable />
        </div>
      </div>

      <Footer />

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
