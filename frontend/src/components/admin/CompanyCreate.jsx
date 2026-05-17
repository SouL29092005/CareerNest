import { useState } from "react";

import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { COMPANY_API_END_POINT } from "@/utils/apiConstants";

import { toast } from "sonner";

import { useDispatch } from "react-redux";

import { setSingleCompany } from "@/redux/companySlice";

import { ArrowLeft, ArrowRight, Building2, Sparkles } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");

  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));

        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;

        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-white shadow-xl shadow-indigo-100/40">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-violet-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30" />

          <div className="relative z-10 grid lg:grid-cols-2">
            {/* Left Section */}
            <div className="p-10 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium w-fit mb-6">
                <Sparkles className="w-4 h-4" />
                Create Your Company
              </div>

              <h1 className="text-4xl font-bold leading-tight text-gray-900">
                Build your company profile in minutes
              </h1>

              <p className="text-gray-500 mt-5 leading-relaxed">
                Add your company and start posting jobs, managing applicants,
                and growing your hiring network.
              </p>

              {/* Decorative Card */}
              <div className="mt-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Building2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      Your Company Workspace
                    </h2>

                    <p className="text-sm text-indigo-100 mt-1">
                      You can customize logos, descriptions, and company details
                      later.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Company Details
                </h2>

                <p className="text-gray-500 mt-2">
                  Start by choosing a professional company name.
                </p>
              </div>

              {/* Input Section */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Company Name
                </Label>

                <Input
                  type="text"
                  value={companyName}
                  placeholder="Microsoft, Google, JobNest..."
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-14 rounded-2xl border-gray-200 bg-gray-50 px-5 text-base focus-visible:ring-2 focus-visible:ring-indigo-500"
                />

                <p className="text-sm text-gray-500">
                  This name will appear publicly on your company profile.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4 mt-10">
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/companies")}
                  className="h-12 px-6 rounded-2xl border-gray-300 hover:bg-gray-100 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>

                <Button
                  onClick={registerNewCompany}
                  className="h-12 px-7 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-200 transition-all duration-300"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
