import { useState } from "react";

import Navbar from "../shared/Navbar";

import { Button } from "../ui/button";

import {
  ArrowLeft,
  Building2,
  Globe,
  Loader2,
  MapPin,
  Upload,
  FileImage,
  Sparkles,
} from "lucide-react";

import { Label } from "../ui/label";

import { Input } from "../ui/input";

import axios from "axios";

import { COMPANY_API_END_POINT } from "@/utils/apiConstants";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import { useSelector } from "react-redux";

import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();

  useGetCompanyById(params.id);

  const [overrides, setOverrides] = useState({});

  const [file, setFile] = useState(null);

  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const input = {
    name: overrides.name ?? singleCompany?.name ?? "",
    description: overrides.description ?? singleCompany?.description ?? "",
    website: overrides.website ?? singleCompany?.website ?? "",
    location: overrides.location ?? singleCompany?.location ?? "",
  };

  const changeEventHandler = (e) => {
    setOverrides({
      ...overrides,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    const selectedFile = e.target.files?.[0];

    setFile(selectedFile);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (file) {
      formData.append("file", file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="rounded-2xl px-5 h-11 border-gray-300 hover:bg-gray-100 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Company Customization
          </div>
        </div>

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-white shadow-xl shadow-indigo-100/30">
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-violet-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30" />

          <div className="relative z-10 grid lg:grid-cols-5">
            {/* Left Info Panel */}
            <div className="lg:col-span-2 p-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Building2 className="w-8 h-8" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold">Company Setup</h1>

                  <p className="text-indigo-100 mt-1">
                    Customize your company profile.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-5 border border-white/10">
                  <h2 className="font-semibold text-lg mb-2">
                    Professional Presence
                  </h2>

                  <p className="text-sm text-indigo-100 leading-relaxed">
                    Add your company details, logo, website, and location to
                    make your profile more attractive to job seekers.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-5 border border-white/10">
                  <h2 className="font-semibold text-lg mb-2">Quick Tip</h2>

                  <p className="text-sm text-indigo-100 leading-relaxed">
                    Companies with logos and detailed descriptions usually
                    receive more applicant engagement.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="lg:col-span-3 p-10 lg:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Edit Company Details
                </h2>

                <p className="text-gray-500 mt-2">
                  Update your company information and branding.
                </p>
              </div>

              <form onSubmit={submitHandler}>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Company Name
                    </Label>

                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                      <Input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={changeEventHandler}
                        className="h-12 pl-12 rounded-2xl border-gray-200 bg-gray-50 focus-visible:ring-2 focus-visible:ring-indigo-500"
                        placeholder="Microsoft"
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Website
                    </Label>

                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                      <Input
                        type="text"
                        name="website"
                        value={input.website}
                        onChange={changeEventHandler}
                        className="h-12 pl-12 rounded-2xl border-gray-200 bg-gray-50 focus-visible:ring-2 focus-visible:ring-indigo-500"
                        placeholder="https://company.com"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Description
                    </Label>

                    <Input
                      type="text"
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      className="h-12 rounded-2xl border-gray-200 bg-gray-50 focus-visible:ring-2 focus-visible:ring-indigo-500"
                      placeholder="Describe your company..."
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Location
                    </Label>

                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                      <Input
                        type="text"
                        name="location"
                        value={input.location}
                        onChange={changeEventHandler}
                        className="h-12 pl-12 rounded-2xl border-gray-200 bg-gray-50 focus-visible:ring-2 focus-visible:ring-indigo-500"
                        placeholder="New York"
                      />
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Company Logo
                    </Label>

                    <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-5 bg-gray-50 hover:border-indigo-400 transition-all duration-300">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="p-3 rounded-full bg-indigo-100 mb-3">
                          <Upload className="w-6 h-6 text-indigo-600" />
                        </div>

                        <p className="text-sm font-medium text-gray-700">
                          Upload Company Logo
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, SVG supported
                        </p>

                        <Input
                          type="file"
                          accept="image/*"
                          onChange={changeFileHandler}
                          className="mt-4 cursor-pointer"
                        />

                        {file && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-indigo-600 font-medium">
                            <FileImage className="w-4 h-4" />
                            {file.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-10">
                  {loading ? (
                    <Button
                      disabled
                      className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600"
                    >
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Updating Company...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-200 transition-all duration-300"
                    >
                      Save Changes
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;
