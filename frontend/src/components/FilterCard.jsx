import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";
import {
  Filter,
  RotateCcw,
  MapPin,
  Briefcase,
  IndianRupee,
} from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    icon: <MapPin size={18} />,
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Job Title",
    icon: <Briefcase size={18} />,
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary (in LPA)",
    icon: <IndianRupee size={18} />,
    array: ["0-6", "6-12", "12 to 18", "18+"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    Location: "None",
    "Job Title": "None",
    "Salary (in LPA)": "None",
  });

  const changeHandler = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      Location: "None",
      "Job Title": "None",
      "Salary (in LPA)": "None",
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(filters));
  }, [filters, dispatch]);

  return (
    <div className="sticky top-24 h-[calc(100vh-110px)] overflow-y-auto rounded-[26px] border border-violet-100 bg-white/90 backdrop-blur-xl shadow-2xl shadow-violet-100/40">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-violet-100 bg-white/90 backdrop-blur-xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md">
              <Filter size={18} />
            </div>

            <div>
              <h1 className="text-lg font-semibold text-gray-900">Filters</h1>

              <p className="text-xs text-gray-500">Narrow your search</p>
            </div>
          </div>

          <Button
            onClick={resetFilters}
            variant="ghost"
            className="h-8 rounded-lg px-2 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <RotateCcw size={13} className="mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4 p-4">
        {filterData.map((data, index) => (
          <div
            key={index}
            className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/60 to-white p-3 shadow-sm"
          >
            {/* Section Title */}
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-violet-100 p-1.5 text-violet-700">
                {data.icon}
              </div>

              <h1 className="text-sm font-semibold text-gray-800">
                {data.filterType}
              </h1>
            </div>

            {/* Radio Group */}
            <RadioGroup
              value={filters[data.filterType]}
              onValueChange={(value) => changeHandler(data.filterType, value)}
              className="space-y-0.5"
            >
              {/* None Option */}
              <Label
                htmlFor={`${data.filterType}-none`}
                className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 transition-all ${
                  filters[data.filterType] === "None"
                    ? "border-violet-500 bg-violet-100 text-violet-700 shadow-sm"
                    : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="None" id={`${data.filterType}-none`} />

                  <span className="text-sm font-medium">None</span>
                </div>
              </Label>

              {/* Other Options */}
              {data.array.map((item, idx) => {
                const itemId = `id-${index}-${idx}`;

                return (
                  <Label
                    key={itemId}
                    htmlFor={itemId}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 transition-all ${
                      filters[data.filterType] === item
                        ? "border-violet-500 bg-violet-100 text-violet-700 shadow-sm"
                        : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={item} id={itemId} />

                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  </Label>
                );
              })}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
