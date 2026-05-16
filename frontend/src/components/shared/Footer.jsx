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
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="bg-black text-white p-2 rounded-xl">
                <Send size={18} />
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight">
                Career<span className="text-violet-600">Nest</span>
              </h1>
            </div>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Discover opportunities, connect with companies, and build your
              future career with confidence.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-violet-100 hover:text-violet-600 transition-all duration-300"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-violet-100 hover:text-violet-600 transition-all duration-300"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-violet-100 hover:text-violet-600 transition-all duration-300"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-violet-100 hover:text-violet-600 transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-lg font-semibold mb-5">Company</h2>

            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-violet-600 cursor-pointer transition">
                About Us
              </li>
              <li className="hover:text-violet-600 cursor-pointer transition">
                Careers
              </li>
              <li className="hover:text-violet-600 cursor-pointer transition">
                Contact
              </li>
              <li className="hover:text-violet-600 cursor-pointer transition">
                Blog
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-5">Quick Links</h2>

            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-violet-600 cursor-pointer transition">
                Find Jobs
              </li>
              <li className="hover:text-violet-600 cursor-pointer transition">
                Companies
              </li>
              <li className="hover:text-violet-600 cursor-pointer transition">
                Dashboard
              </li>
              <li className="hover:text-violet-600 cursor-pointer transition">
                Support
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold mb-5">Subscribe Newsletter</h2>

            <p className="text-sm text-gray-600 mb-4">
              Get the latest job updates and career tips directly in your inbox.
            </p>

            <div className="flex items-center bg-white border rounded-xl overflow-hidden shadow-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 outline-none text-sm"
              />

              <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 transition-all duration-300">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 CareerNest. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="hover:text-violet-600 cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="hover:text-violet-600 cursor-pointer transition">
              Terms of Service
            </span>

            <span className="hover:text-violet-600 cursor-pointer transition">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
