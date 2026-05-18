import "react";
import { Button } from "./ui/button";
import { Bookmark, BookmarkCheck, MapPin, Clock3 } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-violet-100 bg-white/90 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-violet-200/40 transition-all duration-300"
    >
      
      {/* Gradient Top Bar */}
      <div className="h-2 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-500"></div>

      <div className="p-6">
        
        {/* Top Section */}
        <div className="flex items-start justify-between">
          
          <div className="flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1">
            <Clock3 size={14} className="text-violet-600" />

            <p className="text-xs font-medium text-violet-700">
              {daysAgoFunction(job?.createdAt) === 0
                ? "Posted Today"
                : `${daysAgoFunction(job?.createdAt)} days ago`}
            </p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-violet-100 hover:text-violet-700 transition-all"
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>

        {/* Company Section */}
        <div className="mt-5 flex items-center gap-4">
          
          <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-2 shadow-sm">
            <Avatar className="h-14 w-14">
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {job?.company?.name}
            </h1>

            <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={14} />
              <span>{job?.location || "India"}</span>
            </div>
          </div>
        </div>

        {/* Job Info */}
        <div className="mt-6">
          
          <h1 className="text-2xl font-extrabold text-gray-900 transition-colors group-hover:text-violet-700">
            {job?.title}
          </h1>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
            {job?.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-3">
          
          <Badge className="rounded-full bg-blue-50 px-4 py-1 text-blue-700 hover:bg-blue-100 border border-blue-100">
            {job?.position} Positions
          </Badge>

          <Badge className="rounded-full bg-orange-50 px-4 py-1 text-orange-700 hover:bg-orange-100 border border-orange-100">
            {job?.jobType}
          </Badge>

          <Badge className="rounded-full bg-violet-50 px-4 py-1 text-violet-700 hover:bg-violet-100 border border-violet-100">
            ₹ {job?.salary} LPA
          </Badge>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-7 flex items-center gap-3">
          
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            variant="outline"
            className="flex-1 rounded-xl border-violet-200 hover:bg-violet-50 hover:text-violet-700 transition-all"
          >
            View Details
          </Button>

          <Button className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-lg shadow-violet-200">
            <BookmarkCheck className="mr-2 h-4 w-4" />
            Save Job
          </Button>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-indigo-500/5"></div>
      </div>
    </motion.div>
  );
};

export default Job;