import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/apiConstants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
  Briefcase,
  Building2,
  IndianRupee,
  Loader2,
  MapPin,
  Users,
  FileText,
  ClipboardList,
  Layers3,
  Sparkles,
  CheckCircle2,
  Rocket,
} from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    openings: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );

    setInput({
      ...input,
      companyId: selectedCompany._id,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT SIDE */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700 p-10 text-white shadow-2xl min-h-[850px] flex flex-col justify-between">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md mb-8">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Recruiter Dashboard</span>
              </div>

              <h1 className="text-5xl font-extrabold leading-tight">
                Hire Your
                <span className="block text-violet-200">Next Great Talent</span>
              </h1>

              <p className="mt-6 text-violet-100 text-lg leading-relaxed max-w-lg">
                Create beautiful job listings and attract skilled candidates
                from all around the world. Your next top employee could be just
                one post away.
              </p>

              {/* Feature Cards */}
              <div className="mt-12 space-y-5">
                <div className="flex items-start gap-4 bg-white/10 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                  <div className="bg-white text-violet-700 p-3 rounded-xl">
                    <Rocket className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Fast Hiring Process
                    </h3>

                    <p className="text-violet-100 text-sm mt-1">
                      Reach candidates quickly with optimized job postings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                  <div className="bg-white text-violet-700 p-3 rounded-xl">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Better Applicant Quality
                    </h3>

                    <p className="text-violet-100 text-sm mt-1">
                      Clearly define roles and requirements for ideal matches.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                  <div className="bg-white text-violet-700 p-3 rounded-xl">
                    <Briefcase className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Professional Job Listings
                    </h3>

                    <p className="text-violet-100 text-sm mt-1">
                      Create clean and attractive job posts in minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="relative z-10 mt-10">
              <p className="text-sm text-violet-200">
                Trusted by modern recruiters and growing startups.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[32px] p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Create Job Post
              </h2>

              <p className="text-gray-500 mt-2">
                Fill in the details below to publish a new opportunity.
              </p>
            </div>

            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <Label className="mb-2 block">Job Title</Label>

                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 w-5 h-5 text-violet-500" />

                    <Input
                      type="text"
                      name="title"
                      value={input.title}
                      onChange={changeEventHandler}
                      placeholder="Frontend Developer"
                      className="pl-11 h-12 rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <Label className="mb-2 block">Salary</Label>

                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3.5 w-5 h-5 text-violet-500" />

                    <Input
                      type="text"
                      name="salary"
                      value={input.salary}
                      onChange={changeEventHandler}
                      placeholder="12 LPA"
                      className="pl-11 h-12 rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <Label className="mb-2 block">Description</Label>

                  <div className="relative">
                    <FileText className="absolute left-3 top-4 w-5 h-5 text-violet-500" />

                    <textarea
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      placeholder="Describe the job role, responsibilities, skills required, benefits, and other important details..."
                      rows={6}
                      className="
        w-full
        min-h-[180px]
        resize-y
        rounded-2xl
        border
        border-gray-200
        bg-white
        pl-11
        pr-4
        pt-4
        pb-4
        text-sm
        outline-none
        focus:ring-2
        focus:ring-violet-500
      "
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <Label className="mb-2 block">Requirements</Label>

                  <div className="relative">
                    <ClipboardList className="absolute left-3 top-3.5 w-5 h-5 text-violet-500" />

                    <Input
                      type="text"
                      name="requirements"
                      value={input.requirements}
                      onChange={changeEventHandler}
                      placeholder="React, Node.js..."
                      className="pl-11 h-12 rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label className="mb-2 block">Location</Label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-violet-500" />

                    <Input
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      placeholder="Bangalore"
                      className="pl-11 h-12 rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <Label className="mb-2 block">Experience</Label>

                  <div className="relative">
                    <Layers3 className="absolute left-3 top-3.5 w-5 h-5 text-violet-500" />

                    <Input
                      type="text"
                      name="experience"
                      value={input.experience}
                      onChange={changeEventHandler}
                      placeholder="2+ Years"
                      className="pl-11 h-12 rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Openings */}
                <div>
                  <Label className="mb-2 block">Open Positions</Label>

                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-5 h-5 text-violet-500" />

                    <Input
                      type="number"
                      name="openings"
                      value={input.openings}
                      onChange={changeEventHandler}
                      className="pl-11 h-12 rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <Label className="mb-2 block">Job Type</Label>

                  <Select
                    onValueChange={(value) =>
                      setInput({
                        ...input,
                        jobType: value,
                      })
                    }
                  >
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-violet-500">
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Full-time">Full-time</SelectItem>

                        <SelectItem value="Part-time">Part-time</SelectItem>

                        <SelectItem value="Internship">Internship</SelectItem>

                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Company Select */}
              {companies.length > 0 && (
                <div className="mt-6">
                  <Label className="mb-2 block">Select Company</Label>

                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-violet-500">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-violet-500" />
                        <SelectValue placeholder="Choose a company" />
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company?.name?.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Submit */}
              <div className="mt-8">
                {loading ? (
                  <Button
                    disabled
                    className="w-full h-12 rounded-xl bg-violet-700 hover:bg-violet-700 text-base font-semibold"
                  >
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Posting Job...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-violet-700 hover:bg-violet-800 text-base font-semibold shadow-lg shadow-violet-300 cursor-pointer"
                  >
                    Post New Job
                  </Button>
                )}
              </div>

              {/* Warning */}
              {companies.length === 0 && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-sm text-red-600 font-medium text-center">
                    Please register a company first before posting a job.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
