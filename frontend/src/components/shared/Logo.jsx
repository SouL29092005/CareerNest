import { Link } from "react-router-dom";
import { Network } from "lucide-react";

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3 no-underline">
      <div className="relative p-2.5 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-200 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-indigo-300">
        <Network
          size={22}
          className="transition-transform duration-300 group-hover:rotate-12"
        />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <h1 className="text-2xl font-black tracking-tight flex items-center">
        <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Career
        </span>
        <span className="text-slate-800 transition-colors duration-300 group-hover:text-indigo-600 ml-0.5">
          Nest
        </span>
      </h1>
    </Link>
  );
}
