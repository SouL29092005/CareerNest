import "react";
import { Badge } from "./ui/badge";
import { Bookmark, MapPin, Briefcase, IndianRupee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="
        group relative overflow-hidden
        rounded-2xl border border-gray-200 bg-white
        p-6 shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
        hover:border-violet-300 cursor-pointer
      "
    >
      <div className="absolute top-0 right-0 h-28 w-28 bg-violet-100 blur-3xl opacity-40 group-hover:opacity-70 transition-all"></div>

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 border">
            <AvatarImage src={job?.company?.logo} />
            <AvatarFallback>{job?.company?.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="font-semibold text-lg text-gray-900">
              {job?.company?.name}
            </h1>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={14} />
              <span>India</span>
            </div>
          </div>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-violet-100"
        >
          <Bookmark size={18} />
        </Button>
      </div>

      <div className="mt-5 relative z-10">
        <h1
          className="
            text-xl font-bold text-gray-900
            group-hover:text-violet-700 transition-colors
          "
        >
          {job?.title}
        </h1>

        <p
          className="
            mt-2 text-sm leading-relaxed text-gray-600
            line-clamp-3
          "
        >
          {job?.description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 relative z-10">
        <Badge
          className="
            bg-blue-50 text-blue-700 hover:bg-blue-100
            px-3 py-1 rounded-full font-medium
          "
        >
          <Briefcase size={14} className="mr-1" />
          {job?.openings} Positions
        </Badge>

        <Badge
          className="
            bg-red-50 text-red-600 hover:bg-red-100
            px-3 py-1 rounded-full font-medium
          "
        >
          {job?.jobType}
        </Badge>

        <Badge
          className="
            bg-violet-50 text-violet-700 hover:bg-violet-100
            px-3 py-1 rounded-full font-medium
          "
        >
          <IndianRupee size={14} className="mr-1" />
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="mt-6 flex items-center justify-between relative z-10">
        <span className="text-xs text-gray-400">Posted recently</span>

        <Button
          className="
            rounded-xl bg-violet-600
            hover:bg-violet-700
          "
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default LatestJobCards;
