import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { Briefcase, PlusCircle, Search } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [dispatch, input]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-black text-white p-3 rounded-2xl">
                  <Briefcase size={24} />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Manage Jobs
                  </h1>

                  <p className="text-gray-500 mt-1">
                    Create, manage, and track all your job postings.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Button */}
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="h-12 px-6 rounded-xl text-base font-semibold flex items-center gap-2 shadow-md cursor-pointer"
            >
              <PlusCircle size={18} />
              Post New Job
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search by company, role, location..."
              className="pl-11 h-12 rounded-xl border-gray-300 focus-visible:ring-2 focus-visible:ring-black"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
