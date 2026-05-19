import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/apiConstants";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { Users, Briefcase, FileText, Sparkles, Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true },
        );

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl">
          {/* Background Glow */}
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-violet-200 blur-3xl opacity-40"></div>
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-200 blur-3xl opacity-40"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
                <Sparkles className="h-4 w-4" />
                Recruitment Dashboard
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Manage Your <span className="text-violet-600">Applicants</span>
              </h1>

              <p className="mt-4 text-gray-600 leading-relaxed max-w-xl">
                Review applications, shortlist talented candidates, and keep
                track of every applicant applying for this role — all from one
                modern dashboard.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center justify-between">
                    <Users className="h-8 w-8 text-violet-600" />
                    <span className="text-2xl font-bold text-gray-900">
                      {applicants?.applications?.length || 0}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-medium text-gray-600">
                    Total Applicants
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center justify-between">
                    <Briefcase className="h-8 w-8 text-fuchsia-600" />
                    <span className="text-lg font-bold text-gray-900">
                      Active
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-medium text-gray-600">
                    Hiring Status
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center justify-between">
                    <FileText className="h-8 w-8 text-indigo-600" />
                    <span className="text-lg font-bold text-gray-900">
                      Resume
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-medium text-gray-600">
                    CV Screening
                  </p>
                </div>
              </div>
            </div>

            {/* Right Illustration Card */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8 text-white shadow-2xl">
                <div className="rounded-2xl bg-white/10 backdrop-blur-md p-6 border border-white/20">
                  <h2 className="text-2xl font-bold">Hiring Made Simpler 🚀</h2>

                  <p className="mt-4 text-sm text-violet-100 leading-relaxed">
                    Efficiently track applications, organize candidates, and
                    streamline your recruitment process with a cleaner and more
                    professional interface.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-xl bg-white/10 p-4">
                      ✓ Review candidate profiles
                    </div>

                    <div className="rounded-xl bg-white/10 p-4">
                      ✓ Track applicant activity
                    </div>

                    <div className="rounded-xl bg-white/10 p-4">
                      ✓ Manage hiring workflow
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applicants Table Section */}
        <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-2 shadow-lg">
          {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Applicant List
              </h2>

              <p className="text-gray-500 mt-1">
                View and manage all candidates who applied for this position.
              </p>
            </div>

            <div className="rounded-xl bg-violet-100 px-5 py-3 text-violet-700 font-semibold">
              {applicants?.applications?.length || 0} Candidates
            </div>
          </div> */}

          {/* Table */}
          <div className="overflow-x-auto">
            {applicants ? (
              <ApplicantsTable />
            ) : (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-violet-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Applicants;
