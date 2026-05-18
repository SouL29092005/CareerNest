import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
  Briefcase,
  CalendarDays,
  Edit2,
  Eye,
  MoreHorizontal,
  Building2,
} from "lucide-react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const navigate = useNavigate();

  const filterJobs = allAdminJobs.filter((job) => {
    if (!searchJobByText) {
      return true;
    }

    return (
      job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
      job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
    );
  });

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="mt-4 text-gray-500">
          Your recently posted job openings
        </TableCaption>

        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="font-semibold text-gray-700 py-5">
              Company
            </TableHead>

            <TableHead className="font-semibold text-gray-700">
              Job Role
            </TableHead>

            <TableHead className="font-semibold text-gray-700">
              Posted Date
            </TableHead>

            <TableHead className="text-right font-semibold text-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-14 text-gray-500"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg text-gray-700">
                      No Jobs Found
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Try changing your search keyword.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-slate-50 transition-colors duration-200"
              >
                {/* Company */}
                <TableCell className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-xl">
                      <Building2 className="w-5 h-5 text-slate-700" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {job?.company?.name}
                      </p>

                      <p className="text-sm text-gray-500">Hiring Company</p>
                    </div>
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-800">{job?.title}</p>

                    <p className="text-sm text-gray-500">{job?.jobType}</p>
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CalendarDays className="w-4 h-4 text-gray-500" />

                    <span>{job?.createdAt.split("T")[0]}</span>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-xl hover:bg-gray-100 transition">
                        <MoreHorizontal className="w-5 h-5 text-gray-700" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-44 p-2 rounded-2xl border border-gray-200 shadow-lg"
                      align="end"
                    >
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4 text-gray-700" />

                        <span className="text-sm font-medium">Edit Job</span>
                      </div>

                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer transition mt-1"
                      >
                        <Eye className="w-4 h-4 text-gray-700" />

                        <span className="text-sm font-medium">
                          View Applicants
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
