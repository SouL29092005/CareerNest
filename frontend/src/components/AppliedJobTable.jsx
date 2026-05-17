import "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { Briefcase, Building2, CalendarDays } from "lucide-react";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
//   const allAppliedJobs = [
//   {
//     _id: 1,
//     createdAt: "2026-05-17T10:00:00.000Z",
//     status: "accepted",
//     job: {
//       title: "Machine Learning Engineer",
//       company: {
//         name: "Google",
//       },
//       jobType: "Part Time"
//     },
//   },
//   {
//     _id: 2,
//     createdAt: "2026-05-14T10:00:00.000Z",
//     status: "pending",
//     job: {
//       title: "Frontend Developer",
//       company: {
//         name: "Microsoft",
//       },
//       jobType: "Full Time"
//     },
//   },
//   {
//     _id: 3,
//     createdAt: "2026-05-11T10:00:00.000Z",
//     status: "rejected",
//     job: {
//       title: "Backend Engineer",
//       company: {
//         name: "Amazon",
//       },
      
//     },
//   },
// ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-200 hover:bg-red-100";

      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200 hover:bg-yellow-100";

      case "accepted":
        return "bg-green-100 text-green-700 border border-green-200 hover:bg-green-100";

      default:
        return "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-100";
    }
  };

  return (
    <div className="w-full">
      
      {/* Main Card */}
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-violet-50 via-white to-indigo-50">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Applied Jobs
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Track all your job applications in one place
            </p>
          </div>

          <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-100">
            <Briefcase className="w-7 h-7 text-violet-700" />
          </div>
        </div>

        {/* Empty State */}
        {allAppliedJobs.length <= 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mb-5">
              <Briefcase className="w-10 h-10 text-violet-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
              You haven’t applied to any jobs yet. Start exploring opportunities
              and apply to your dream companies.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableCaption className="py-4 text-gray-500">
                A list of your applied jobs
              </TableCaption>

              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="pl-8 font-semibold text-gray-700">
                    Date
                  </TableHead>

                  <TableHead className="font-semibold text-gray-700">
                    Job Role
                  </TableHead>

                  <TableHead className="pl-4 font-semibold text-gray-700">
                    Company
                  </TableHead>

                  <TableHead className="text-right pr-6 font-semibold text-gray-700">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allAppliedJobs.map((appliedJob) => (
                  <TableRow
                    key={appliedJob._id}
                    className="hover:bg-violet-50/40 transition-colors duration-200"
                  >
                    {/* Date */}
                    <TableCell className="py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarDays className="w-4 h-4 text-violet-500" />

                        <span className="font-medium">
                          {appliedJob?.createdAt?.split("T")[0]}
                        </span>
                      </div>
                    </TableCell>

                    {/* Job Role */}
                    <TableCell>
                      <div>
                        <h2 className="font-semibold text-gray-800">
                          {appliedJob.job?.title}
                        </h2>

                        <p className="text-sm text-gray-500">
                          {appliedJob.job?.jobType || "Full Time"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Company */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-indigo-600" />
                        </div>

                        <span className="font-medium text-gray-700">
                          {appliedJob.job?.company?.name}
                        </span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-right">
                      <Badge
                        className={`px-4 py-1 text-xs rounded-full font-semibold capitalize ${getStatusStyle(
                          appliedJob?.status
                        )}`}
                      >
                        {appliedJob?.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobTable;