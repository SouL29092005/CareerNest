import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Edit2, MoreHorizontal, Building2, CalendarDays } from "lucide-react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );

  const navigate = useNavigate();

  const filterCompany =
    companies?.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }

      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    }) || [];

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <Table>
        <TableCaption className="py-6 text-gray-500">
          A list of all recently registered companies.
        </TableCaption>

        {/* Table Header */}
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-gray-50 to-indigo-50 hover:bg-transparent border-b border-gray-200">
            <TableHead className="py-5 text-gray-700 font-semibold">
              Company
            </TableHead>

            <TableHead className="text-gray-700 font-semibold">Name</TableHead>

            <TableHead className="text-gray-700 font-semibold">
              Created
            </TableHead>

            <TableHead className="text-right text-gray-700 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {filterCompany?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-40 text-center">
                <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                  <div className="p-4 rounded-full bg-indigo-50">
                    <Building2 className="w-8 h-8 text-indigo-500" />
                  </div>

                  <div>
                    <h1 className="font-semibold text-gray-700 text-lg">
                      No Companies Found
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                      Try searching with another company name.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-indigo-50/40 transition-all duration-200 border-b border-gray-100"
              >
                {/* Logo */}
                <TableCell className="py-5">
                  <Avatar className="h-12 w-12 border border-gray-200 shadow-sm">
                    <AvatarImage src={company.logo} alt={company.name} />

                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold">
                      {company?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* Name */}
                <TableCell>
                  <div>
                    <h1 className="font-semibold text-gray-800">
                      {company.name}
                    </h1>

                    <p className="text-sm text-gray-500">Registered Company</p>
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDays className="w-4 h-4 text-indigo-500" />

                    <span className="text-sm font-medium">
                      {company.createdAt.split("T")[0]}
                    </span>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-xl hover:bg-indigo-100 transition-all duration-200">
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-40 p-2 rounded-2xl border border-gray-200 shadow-xl">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer hover:bg-indigo-50 transition-all duration-200"
                      >
                        <div className="p-2 rounded-lg bg-indigo-100">
                          <Edit2 className="w-4 h-4 text-indigo-600" />
                        </div>

                        <span className="text-sm font-medium text-gray-700">
                          Edit
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

export default CompaniesTable;
