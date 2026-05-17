import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

import { Building2, Plus, Search } from "lucide-react";

const Companies = () => {
  useGetAllCompanies();

  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [dispatch, input]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-sm mb-8">
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-40" />

          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Companies
                  </h1>

                  <p className="text-gray-500 mt-1">
                    Manage, search, and organize all registered companies.
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mt-6 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search companies by name..."
                  className="pl-12 h-12 rounded-2xl border-gray-200 bg-gray-50 focus-visible:ring-2 focus-visible:ring-indigo-500 text-sm"
                />
              </div>
            </div>

            {/* Right Side Button */}
            <div className="flex items-center">
              <Button
                onClick={() => navigate("/admin/companies/create")}
                className="h-12 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-200 transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Company
              </Button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-5 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Company List
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View and manage all companies from one place.
              </p>
            </div>
          </div>

          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
