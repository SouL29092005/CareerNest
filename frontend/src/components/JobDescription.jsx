import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/apiConstants";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  MapPin,
  Briefcase,
  Wallet,
  Users,
  CalendarDays,
  Clock3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id,
    ) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };

        dispatch(setSingleJob(updatedSingleJob));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id,
            ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-indigo-50">
      <Navbar />

      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Card */}
          <div className="relative overflow-hidden rounded-[32px] border border-violet-100 bg-white/80 backdrop-blur-xl shadow-2xl shadow-violet-100/50">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-indigo-300/20 blur-3xl"></div>

            <div className="relative z-10 p-8 md:p-10">
              {/* Top */}
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                {/* Left */}
                <div className="max-w-3xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
                    <Sparkles size={16} />
                    Featured Opportunity
                  </div>

                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    {singleJob?.title}
                  </h1>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Badge className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-blue-700 hover:bg-blue-100">
                      {singleJob?.openings} Positions
                    </Badge>

                    <Badge className="rounded-full border border-orange-100 bg-orange-50 px-4 py-1 text-orange-700 hover:bg-orange-100">
                      {singleJob?.jobType}
                    </Badge>

                    <Badge className="rounded-full border border-violet-100 bg-violet-50 px-4 py-1 text-violet-700 hover:bg-violet-100">
                      ₹ {singleJob?.salary} LPA
                    </Badge>
                  </div>

                  {/* Requirements */}
                  <div className="mt-6">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                      Requirements
                    </h2>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {singleJob?.requirements?.map((requirement, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 transition-all hover:border-violet-300 hover:bg-violet-100/50"
                        >
                          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                            ✓
                          </div>

                          <p className="text-sm leading-relaxed text-gray-700">
                            {requirement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Apply Card */}
                <div className="w-full max-w-sm rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-6 shadow-lg">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg">
                      <Briefcase size={26} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Apply Now
                      </h2>

                      <p className="text-sm text-gray-500">
                        Join this amazing opportunity
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`h-12 w-full rounded-2xl text-base font-semibold transition-all ${
                      isApplied
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-violet-200"
                    }`}
                  >
                    {isApplied ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        Already Applied
                      </div>
                    ) : (
                      "Apply Now"
                    )}
                  </Button>

                  <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Total Applicants</span>

                      <span className="font-bold text-violet-700">
                        {singleJob?.applications?.length}
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-violet-100">
                      <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-violet-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <h2 className="font-bold text-gray-900">
                        {singleJob?.location}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Clock3 className="text-violet-600" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <h2 className="font-bold text-gray-900">
                        {singleJob?.experience} Years
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Wallet className="text-violet-600" />
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <h2 className="font-bold text-gray-900">
                        ₹ {singleJob?.salary} LPA
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Users className="text-violet-600" />
                    <div>
                      <p className="text-sm text-gray-500">Applicants</p>
                      <h2 className="font-bold text-gray-900">
                        {singleJob?.applications?.length}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="text-violet-600" />
                    <div>
                      <p className="text-sm text-gray-500">Posted Date</p>
                      <h2 className="font-bold text-gray-900">
                        {singleJob?.createdAt?.split("T")[0]}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Briefcase className="text-violet-600" />
                    <div>
                      <p className="text-sm text-gray-500">Job Type</p>
                      <h2 className="font-bold text-gray-900">
                        {singleJob?.jobType}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mt-10 rounded-3xl border border-violet-100 bg-white p-7 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">
                  Job Description
                </h1>

                <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"></div>

                <p className="mt-6 text-base leading-8 text-gray-700">
                  {singleJob?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
