import { useState } from "react";
import { Button } from "./ui/button";
import { Search, Briefcase, TrendingUp, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative">

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold text-sm shadow-sm">
          <TrendingUp size={16} />
          #1 Smart Career Platform
        </div>

        <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-gray-900">
          Find, Apply & <br />
          Build Your{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Dream Career
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
          Explore thousands of job opportunities from top companies, discover
          your perfect role, and take the next big step in your professional
          journey with CareerNest.
        </p>

        <div className="mt-10 flex items-center w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-6 py-5 outline-none text-gray-700"
          />

          <Button
            onClick={searchJobHandler}
            className="
              m-2 rounded-xl
              bg-gradient-to-r from-violet-600 
              to-indigo-600 hover:from-violet-700
              hover:to-indigo-700 text-white
              px-6 py-6
              shadow-lg hover:shadow-violet-300/40
              transition-all -300
              flex items-center gap-2
            "
          >
            <Search className="h-5 w-5" />
            <span className="hidden sm:block font-medium">Search</span>
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 mx-auto rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
              <Briefcase />
            </div>

            <h2 className="mt-4 text-3xl font-bold text-gray-900">10K+</h2>

            <p className="mt-2 text-gray-600">Active Job Listings</p>
          </div>

          <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Users />
            </div>

            <h2 className="mt-4 text-3xl font-bold text-gray-900">5K+</h2>

            <p className="mt-2 text-gray-600">Trusted Companies</p>
          </div>

          <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 mx-auto rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
              <TrendingUp />
            </div>

            <h2 className="mt-4 text-3xl font-bold text-gray-900">20K+</h2>

            <p className="mt-2 text-gray-600">Successful Hirings</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
