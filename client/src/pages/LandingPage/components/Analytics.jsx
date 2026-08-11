
import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      icon: Users,
      title: "সক্রিয় ব্যবহারকারী",
      value: "২.৪M+",
      growth: "+১৫%",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Briefcase,
      title: "নিবন্ধিত কোম্পানি",
      value: "১৫০K+",
      growth: "+২২%",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Target,
      title: "সফল নিয়োগ",
      value: "৮০K+",
      growth: "+১৮%",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: TrendingUp,
      title: "চাকরি মেলার হার",
      value: "৯৫%",
      growth: "+৮%",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            প্ল্যাটফর্মের

            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pt-5">
              পরিসংখ্যান ও বিশ্লেষণ
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            আমাদের প্ল্যাটফর্মের কার্যক্রম, ব্যবহারকারী এবং সফল নিয়োগের
            গুরুত্বপূর্ণ তথ্য ও পরিসংখ্যান এক নজরে দেখুন।
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Icon & Growth */}
              <div className="flex items-center justify-between mb-4">

                <div
                  className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${stat.iconColor}`}
                  />
                </div>

                <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
                  {stat.growth}
                </span>
              </div>

              {/* Value */}
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>

              {/* Title */}
              <p className="text-gray-600">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Analytics;

