import { useState } from "react";
import Navbar from "../shared/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/apiConstants";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Briefcase,
  MapPin,
  IndianRupee,
  Layers3,
  Users,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { allAdminJobs } = useSelector((store) => store.job);

  const existingJob = allAdminJobs?.find((job) => job._id === id);

  const [input, setInput] = useState({
    title: existingJob?.title || "",
    description: existingJob?.description || "",
    requirements: existingJob?.requirements?.join(", ") || "",
    salary: existingJob?.salary || "",
    experienceLevel: existingJob?.experienceLevel || "",
    location: existingJob?.location || "",
    jobType: existingJob?.jobType || "",
    openings: existingJob?.openings || "",
    company: existingJob?.company?._id || existingJob?.company || "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        {
          ...input,
          requirements: input.requirements
            .split(",")
            .map((item) => item.trim()),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top Hero Section */}
        <div className="mb-10 rounded-3xl border border-violet-100 bg-white/70 backdrop-blur-xl p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-violet-600 mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">Update Your Job Posting</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Edit Job Details
              </h1>

              <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
                Refine your job listing with updated responsibilities,
                requirements, salary details, and hiring information to attract
                the best candidates.
              </p>
            </div>

            <div className="hidden lg:flex">
              <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <Briefcase className="w-14 h-14 text-white" />
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info */}
              <Card className="rounded-3xl border-0 shadow-md bg-white/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Basic Information</CardTitle>

                  <CardDescription>
                    Update the main details about the role.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <Label className="mb-2 block">Job Title</Label>

                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

                      <Input
                        type="text"
                        name="title"
                        value={input.title}
                        onChange={changeEventHandler}
                        placeholder="Frontend Developer"
                        className="pl-11 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Job Description</Label>

                    <textarea
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      rows={8}
                      placeholder="Describe the role, responsibilities, expectations, and technologies..."
                      className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm outline-none focus:ring-2 focus:ring-violet-500 resize-y min-h-[220px]"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Requirements</Label>

                    <textarea
                      name="requirements"
                      value={input.requirements}
                      onChange={changeEventHandler}
                      rows={5}
                      placeholder="React, Node.js, MongoDB, Tailwind CSS..."
                      className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm outline-none focus:ring-2 focus:ring-violet-500 resize-y min-h-[160px]"
                    />

                    <p className="text-xs text-gray-500 mt-2">
                      Separate each requirement with commas.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Details */}
              <Card className="rounded-3xl border-0 shadow-md bg-white/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Additional Details</CardTitle>

                  <CardDescription>
                    Provide salary, experience, openings and location.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="pl-2 mb-2 block">Salary (LPA)</Label>

                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

                      <Input
                        type="number"
                        name="salary"
                        value={input.salary}
                        onChange={changeEventHandler}
                        placeholder="12"
                        className="pl-11 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="pl-2 mb-2 block">Experience Level</Label>

                    <div className="relative">
                      <Layers3 className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

                      <Input
                        type="number"
                        name="experienceLevel"
                        value={input.experienceLevel}
                        onChange={changeEventHandler}
                        placeholder="2"
                        className="pl-11 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="pl-2 mb-2 block">Location</Label>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

                      <Input
                        type="text"
                        name="location"
                        value={input.location}
                        onChange={changeEventHandler}
                        placeholder="Bangalore"
                        className="pl-11 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="pl-2 mb-2 block">Openings</Label>

                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

                      <Input
                        type="number"
                        name="openings"
                        value={input.openings}
                        onChange={changeEventHandler}
                        placeholder="5"
                        className="pl-11 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="pl-2 mb-2 block">
                      Job Type
                    </Label>

                    <div className="relative">
                      <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400">
                        <Briefcase className="w-5 h-5" />
                      </div>

                      <Select
                        value={input.jobType}
                        onValueChange={(value) =>
                          setInput({ ...input, jobType: value })
                        }
                      >
                        <SelectTrigger
                          className="
                            h-12 rounded-2xl border-gray-200
                            bg-white/80 pl-11
                            shadow-sm transition-all
                            hover:border-violet-300
                            focus:ring-2 focus:ring-violet-500
                          "
                        >
                          <SelectValue placeholder="Select Job Type" />
                        </SelectTrigger>

                        <SelectContent className="pl-2 rounded-2xl border-gray-200 shadow-xl">
                          <SelectItem value="Full-time">Full-time</SelectItem>

                          <SelectItem value="Part-time">Part-time</SelectItem>

                          <SelectItem value="Internship">Internship</SelectItem>

                          <SelectItem value="Contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side */}
            <div>
              <Card className="rounded-3xl border-0 shadow-md bg-gradient-to-br from-violet-600 to-indigo-600 text-white sticky top-24">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-white/20">
                      <FileText className="w-6 h-6" />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold">
                        Ready to Update?
                      </h2>

                      <p className="text-sm text-violet-100">
                        Save your latest changes instantly.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-violet-100 leading-relaxed">
                    <p>
                      Make your job listing more attractive with detailed
                      descriptions, clear requirements, and accurate salary
                      information.
                    </p>

                    <p>
                      A well-structured job post improves visibility and helps
                      you attract better candidates faster.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-8 h-12 rounded-xl bg-white text-violet-700 hover:bg-gray-100 font-semibold text-base"
                  >
                    Update Job
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
