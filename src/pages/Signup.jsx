import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signup"); // signup or signin
  const [userType, setUserType] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-pink-500 p-4 font-sans">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full">
        {/* Left Panel */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-500 flex flex-col items-center justify-center p-8 relative rounded-br-[55px]">
          <img
            src="/images/nurse.png"
            alt="Healthcare worker"
            className="w-100 h-100 object-cover rounded-[50%]"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-white tracking-wide">
            My MDR Tracker
          </h2>
          <p className="text-sm opacity-90 text-white">
            Secure digital contact tracing
          </p>
          <p className="absolute bottom-4 text-center text-xs text-white/70">
            © 2025 MDR Tracker. All rights reserved.
          </p>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 bg-blue-600">
          <div className="bg-white p-10 rounded-tl-[60px] rounded-tr-2xl rounded-br-2xl shadow-md">
            {/* Tabs */}
            <div className="flex space-x-8 mb-8 border-b">
              <button
                onClick={() => setActiveTab("signup")}
                className={`pb-3 font-semibold transition ${
                  activeTab === "signup"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setActiveTab("signin")}
                className={`pb-3 font-semibold transition ${
                  activeTab === "signin"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Form */}
            {activeTab === "signup" ? (
              <form className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  />
                </div>

                {/* User Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    User Type
                  </label>
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select user type</option>
                    <option>Infection Control Officer</option>
                    <option>Ward Nurse / Floor Staff</option>
                    <option>Lab Technician</option>
                    <option>Hospital Admin / IT</option>
                    <option>Epidemiologist / Researcher</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:opacity-90 transition font-semibold"
                >
                  Sign Up
                </button>
              </form>
            ) : (
              <form className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* User Type (added here too) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    User Type
                  </label>
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select user type</option>
                    <option>Infection Control Officer</option>
                    <option>Ward Nurse / Floor Staff</option>
                    <option>Lab Technician</option>
                    <option>Hospital Admin / IT</option>
                    <option>Epidemiologist / Researcher</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:opacity-90 transition font-semibold"
                >
                  Sign In
                </button>

                <p className="text-center text-sm mt-4 text-gray-600">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("signup")}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            )}

            {/* Social Links */}
            <div className="mt-8 flex justify-center space-x-6 text-gray-400">
              <a href="#">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="w-6 h-6 hover:text-blue-600 transition-colors"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="w-6 h-6 hover:text-sky-500 transition-colors"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="w-6 h-6 hover:text-pink-500 transition-colors"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="w-6 h-6 hover:text-blue-800 transition-colors"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
