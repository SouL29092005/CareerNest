import "react";
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
  MoreHorizontal,
  Mail,
  Phone,
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
  Users,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/apiConstants";
import axios from "axios";
import { setAllApplicants } from "@/redux/applicationSlice";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        const updatedApplications = applicants.applications.filter(
          (application) => application._id !== id,
        );

        dispatch(
          setAllApplicants({
            ...applicants,
            applications: updatedApplications,
          }),
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b bg-gradient-to-r from-violet-50 via-white to-fuchsia-50">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Applicants Overview
          </h2>

          <p className="text-gray-500 mt-1">
            Manage and review all pending applications.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-violet-100 px-5 py-3">
          <Users className="h-5 w-5 text-violet-700" />

          <span className="font-semibold text-violet-700">
            {applicants?.applications?.filter(
              (item) => item.status === "pending",
            ).length || 0}{" "}
            Pending
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="py-5 text-gray-500">
            A list of recent applicants for this position.
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-bold text-gray-700 py-4">
                Candidate
              </TableHead>

              <TableHead className="font-bold text-gray-700">Email</TableHead>

              <TableHead className="font-bold text-gray-700">Contact</TableHead>

              <TableHead className="font-bold text-gray-700">Resume</TableHead>

              <TableHead className="font-bold text-gray-700">
                Applied On
              </TableHead>

              <TableHead className="text-right font-bold text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applicants &&
            applicants?.applications?.filter(
              (item) => item.status === "pending",
            ).length > 0 ? (
              applicants?.applications
                ?.filter((item) => item.status === "pending")
                ?.map((item) => (
                  <TableRow
                    key={item._id}
                    className="hover:bg-violet-50/40 transition-all duration-200"
                  >
                    {/* Candidate */}
                    <TableCell className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {item?.applicant?.fullname?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {item?.applicant?.fullname}
                          </h3>

                          <p className="text-sm text-gray-500">Applicant</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4 text-violet-600" />

                        <span className="text-sm">
                          {item?.applicant?.email}
                        </span>
                      </div>
                    </TableCell>

                    {/* Contact */}
                    <TableCell>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="h-4 w-4 text-fuchsia-600" />

                        <span>{item?.applicant?.phoneNumber}</span>
                      </div>
                    </TableCell>

                    {/* Resume */}
                    <TableCell>
                      {item.applicant?.profile?.resume ? (
                        <a
                          className="inline-flex items-center gap-2 rounded-xl bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 hover:bg-violet-200 transition-all"
                          href={item?.applicant?.profile?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="h-4 w-4" />
                          Resume
                        </a>
                      ) : (
                        <span className="text-gray-400">No Resume</span>
                      )}
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-indigo-500" />

                        <span>{item?.applicant?.createdAt?.split("T")[0]}</span>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="rounded-xl p-2 hover:bg-gray-100 transition-all">
                            <MoreHorizontal className="h-5 w-5 text-gray-600" />
                          </button>
                        </PopoverTrigger>

                        <PopoverContent className="w-40 rounded-2xl border border-gray-100 shadow-xl">
                          <div className="space-y-2">
                            {shortlistingStatus.map((status, index) => (
                              <div
                                onClick={() => statusHandler(status, item?._id)}
                                key={index}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer transition-all ${
                                  status === "Accepted"
                                    ? "hover:bg-green-50"
                                    : "hover:bg-red-50"
                                }`}
                              >
                                {status === "Accepted" ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}

                                <span
                                  className={`font-medium ${
                                    status === "Accepted"
                                      ? "text-green-700"
                                      : "text-red-700"
                                  }`}
                                >
                                  {status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Users className="h-12 w-12 text-gray-300" />

                    <h3 className="mt-4 text-lg font-semibold text-gray-700">
                      No Pending Applicants
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      New applications will appear here.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
