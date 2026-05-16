import "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-200 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-violet-600 font-semibold tracking-wide uppercase">
              Opportunities
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2">
              Latest & Top <span className="text-violet-600">Job Openings</span>
            </h1>

            <p className="text-gray-600 mt-4 max-w-2xl leading-relaxed">
              Discover premium opportunities from top companies and start
              building your dream career today.
            </p>
          </div>

          <Button
            onClick={() => navigate("/jobs")}
            className="
              rounded-xl px-6 py-6 text-base
              bg-violet-600 hover:bg-violet-700
              shadow-lg shadow-violet-200
            "
          >
            View All Jobs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div
          className="
            grid grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6 mt-14
          "
        >
          {allJobs.length <= 0 ? (
            <div
              className="
                col-span-full flex flex-col items-center
                justify-center py-20 rounded-3xl
                border border-dashed border-gray-300
                bg-gray-50
              "
            >
              <h2 className="text-2xl font-bold text-gray-700">
                No Jobs Available
              </h2>

              <p className="text-gray-500 mt-2">
                Check back later for new openings.
              </p>
            </div>
          ) : (
            allJobs?.slice(0, 6).map((job) => (
              <div
                key={job._id}
                className="
                    transition-all duration-300
                    hover:-translate-y-1
                  "
              >
                <LatestJobCards job={job} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
