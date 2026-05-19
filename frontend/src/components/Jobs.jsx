import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Briefcase, SearchX } from "lucide-react";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const filterJobs = allJobs.filter((job) => {
    // Location Filter
    if (searchedQuery.Location && searchedQuery.Location !== "None") {
      if (
        !job.location
          .toLowerCase()
          .includes(searchedQuery.Location.toLowerCase())
      ) {
        return false;
      }
    }

    // Job Title Filter
    if (searchedQuery["Job Title"] && searchedQuery["Job Title"] !== "None") {
      if (
        !job.title
          .toLowerCase()
          .includes(searchedQuery["Job Title"].toLowerCase())
      ) {
        return false;
      }
    }

    // Salary Filter
    if (
      searchedQuery["Salary (in LPA)"] &&
      searchedQuery["Salary (in LPA)"] !== "None"
    ) {
      const salary = job.salary;

      switch (searchedQuery["Salary (in LPA)"]) {
        case "0-6":
          if (!(salary >= 0 && salary <= 6)) {
            return false;
          }
          break;

        case "6-12":
          if (!(salary > 6 && salary <= 12)) {
            return false;
          }
          break;

        case "12 to 18":
          if (!(salary > 12 && salary <= 18)) {
            return false;
          }
          break;

        case "18+":
          if (!(salary > 18)) {
            return false;
          }
          break;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Find Your <span className="text-violet-600">Dream Job</span>
            </h1>

            <p className="mt-2 text-gray-600 text-lg">
              Explore thousands of opportunities tailored for you.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-5 py-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Briefcase size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Available Jobs</p>
              <h2 className="text-2xl font-bold text-gray-900">
                {filterJobs.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <div className="lg:w-[320px] shrink-0">
            <FilterCard />
          </div>

          {/* Jobs Section */}
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="flex h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-violet-200 bg-white shadow-sm">
                <div className="mb-4 rounded-full bg-violet-100 p-5 text-violet-600">
                  <SearchX size={40} />
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  No Jobs Found
                </h2>

                <p className="mt-2 text-gray-500">
                  Try changing filters or search for something else.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {filterJobs.map((job, index) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className="h-full"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
