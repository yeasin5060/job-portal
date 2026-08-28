
import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Hero = () => {
  const {user , isAuthenticated} = useAuth()
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      label: "সক্রিয় ব্যবহারকারী",
      value: "২.৪M+",
    },
    {
      icon: Building2,
      label: "নিবন্ধিত কোম্পানি",
      value: "৫০K+",
    },
    {
      icon: TrendingUp,
      label: "প্রকাশিত চাকরি",
      value: "১৫০K+",
    },
  ];

  return (
    <section className="relative pt-24 pb-16 bg-white min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight pt-1"
          >
            আপনার স্বপ্নের চাকরি খুঁজুন অথবা

            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-5 pt-2">
              সেরা প্রার্থী নিয়োগ করুন
            </span>
          </motion.h1>

          {/* Sub Heading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            দক্ষ চাকরিপ্রার্থীদের সাথে উদ্ভাবনী কোম্পানিগুলোর সংযোগ তৈরি করুন।
            আপনার ক্যারিয়ারের পরবর্তী সুযোগ অথবা প্রতিষ্ঠানের জন্য উপযুক্ত
            প্রার্থী খুঁজে পাওয়া এখন মাত্র এক ক্লিকের দূরত্বে।
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-center mb-16"
          >

            {/* Find Jobs Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
              onClick={() => navigate("/find-jobs")}
            >
              <Search className="w-5 h-5" />

              <span>চাকরি খুঁজুন</span>

              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Post Job Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
              onClick={() =>
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                )
              }
            >
              চাকরি পোস্ট করুন
            </motion.button>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.8,
                }}
                className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mt-2">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>

                {/* Value */}
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30" />

        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30" />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-3xl opacity-20" />

      </div>
    </section>
  );
};

export default Hero;

