import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useSearchJobs from "@/hooks/useSearchJobs";
import { Input } from "./ui/input";
import { Search, Briefcase, SearchX } from "lucide-react";
import { motion } from "framer-motion";

const Browse = () => {
  useSearchJobs();

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-violet-100 mb-4">
              <Briefcase size={20} />
              <span className="font-medium">Find Your Dream Career</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Explore Opportunities <br />
              That Match Your Skills
            </h1>

            <p className="mt-4 text-violet-100 text-base md:text-lg leading-relaxed">
              Search thousands of jobs from top companies and discover the
              perfect role for your future.
            </p>

            {/* Search Bar */}
            <div className="mt-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <Input
                type="text"
                value={searchedQuery || ""}
                onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
                placeholder="Search jobs by title, skill, or keyword..."
                className="h-14 pl-12 rounded-2xl border-0 bg-white text-base shadow-lg focus-visible:ring-2 focus-visible:ring-violet-400"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Search Results
              </h2>

              <p className="text-gray-500 mt-1">
                Showing {allJobs.length} available jobs
              </p>
            </div>
          </div>

          {allJobs.length <= 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-violet-200 bg-violet-50"
            >
              <SearchX className="text-violet-500 mb-4" size={60} />

              <h1 className="text-2xl font-bold text-gray-800">
                No Jobs Found
              </h1>

              <p className="text-gray-500 mt-2 text-center max-w-md">
                We couldn&apos;t find any jobs matching your search. Try using
                different keywords or explore more opportunities.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {allJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
