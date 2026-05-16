import "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import { Send } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="
        relative overflow-hidden
        bg-gradient-to-b
        from-[#111827]
        to-[#0f172a]
        border-t border-white/10
        text-white
      "
    >
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.15),transparent_40%)]
        "
      ></div>

      <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div
                className="
                  bg-violet-600 text-white
                  p-2 rounded-xl
                  shadow-lg shadow-violet-500/30
                "
              >
                <Send size={18} />
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight">
                Career<span className="text-violet-500">Nest</span>
              </h1>
            </div>

            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Discover opportunities, connect with companies, and build your
              future career with confidence.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="
                  p-2 rounded-full
                  bg-white/10
                  hover:bg-violet-600
                  hover:text-white
                  transition-all duration-300
                  hover:scale-110
                "
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="
                  p-2 rounded-full
                  bg-white/10
                  hover:bg-violet-600
                  hover:text-white
                  transition-all duration-300
                  hover:scale-110
                "
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="
                  p-2 rounded-full
                  bg-white/10
                  hover:bg-violet-600
                  hover:text-white
                  transition-all duration-300
                  hover:scale-110
                "
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="
                  p-2 rounded-full
                  bg-white/10
                  hover:bg-violet-600
                  hover:text-white
                  transition-all duration-300
                  hover:scale-110
                "
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-5 text-white">
              Company
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-violet-400 cursor-pointer transition">
                About Us
              </li>

              <li className="hover:text-violet-400 cursor-pointer transition">
                Careers
              </li>

              <li className="hover:text-violet-400 cursor-pointer transition">
                Contact
              </li>

              <li className="hover:text-violet-400 cursor-pointer transition">
                Blog
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-5 text-white">
              Quick Links
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-violet-400 cursor-pointer transition">
                Find Jobs
              </li>

              <li className="hover:text-violet-400 cursor-pointer transition">
                Companies
              </li>

              <li className="hover:text-violet-400 cursor-pointer transition">
                Dashboard
              </li>

              <li className="hover:text-violet-400 cursor-pointer transition">
                Support
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-5 text-white">
              Subscribe Newsletter
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              Get the latest job updates and career tips directly in your inbox.
            </p>

            <div
              className="
                flex items-center
                bg-white/5
                border border-white/10
                rounded-xl overflow-hidden
                backdrop-blur-sm
              "
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full px-4 py-3
                  outline-none text-sm
                  bg-transparent text-white
                  placeholder:text-gray-500
                "
              />

              <button
                className="
                  bg-violet-600
                  hover:bg-violet-700
                  text-white px-5 py-3
                  transition-all duration-300
                "
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div
          className="
            border-t border-white/10
            mt-12 pt-6
            flex flex-col md:flex-row
            items-center justify-between gap-4
          "
        >
          <p className="text-sm text-gray-400">
            © 2026 CareerNest. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span className="hover:text-violet-400 cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="hover:text-violet-400 cursor-pointer transition">
              Terms of Service
            </span>

            <span className="hover:text-violet-400 cursor-pointer transition">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;