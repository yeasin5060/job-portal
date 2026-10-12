import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  TrendingUp,
  Users,
  Target,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Analytics = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  const stats = [
    {
      icon: Users,
      title: "সক্রিয় ব্যবহারকারী",
      value: "২.৪M+",
      growth: "+১৫%",
      iconBg: "bg-blue-50 text-blue-600 border border-blue-200/50",
      accent: "hover:border-blue-300",
    },
    {
      icon: Briefcase,
      title: "নিবন্ধিত কোম্পানি",
      value: "১৫০K+",
      growth: "+২২%",
      iconBg: "bg-purple-50 text-purple-600 border border-purple-200/50",
      accent: "hover:border-purple-300",
    },
    {
      icon: Target,
      title: "সফল নিয়োগ",
      value: "৮০K+",
      growth: "+১৮%",
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/50",
      accent: "hover:border-emerald-300",
    },
    {
      icon: TrendingUp,
      title: "চাকরি মেলার হার",
      value: "৯৫%",
      growth: "+৮%",
      iconBg: "bg-amber-50 text-amber-600 border border-amber-200/50",
      accent: "hover:border-amber-300",
    },
  ];

  useGSAP(
    () => {
      // Header animation
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          y: 25,
          opacity: 0.3,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // Cards staggered entrance with pop
      if (cardsRef.current?.children) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          y: 20,
          opacity: 0.4,
          scale: 0.97,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-50 text-purple-700 border border-purple-200/60 mb-4">
            রিয়েল-টাইম মেট্রিক্স
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            প্ল্যাটফর্মের{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              পরিসংখ্যান ও বিশ্লেষণ
            </span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            আমাদের প্ল্যাটফর্মের কার্যক্রম, ব্যবহারকারী এবং সফল নিয়োগের
            গুরুত্বপূর্ণ তথ্য ও পরিসংখ্যান এক নজরে দেখুন।
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${stat.accent}`}
            >
              {/* Icon & Growth Pill */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-13 h-13 p-3 rounded-2xl flex items-center justify-center ${stat.iconBg} group-hover:scale-105 transition-transform`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>

                <span className="inline-flex items-center gap-0.5 text-emerald-700 text-xs font-bold bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {stat.growth}
                </span>
              </div>

              {/* Value */}
              <div className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {stat.value}
              </div>

              {/* Title */}
              <p className="text-gray-600 font-medium text-sm">
                {stat.title}
              </p>
            </div>
          ))}
        </div>

        {/* Callout banner */}
        <div className="mt-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold">
              আপনিও কি আপনার ক্যারিয়ারে নতুন মাইলফলক অর্জন করতে প্রস্তুত?
            </h3>
            <p className="text-blue-100 text-sm">
              আজই ফ্রি একাউন্ট তৈরি করুন এবং শত শত জব অফারে সরাসরি আবেদন করুন।
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/signup")}
            className="px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold text-sm hover:bg-blue-50 shadow-md hover:shadow-lg transition-all hover:scale-105 whitespace-nowrap"
          >
            এখনই শুরু করুন
          </button>
        </div>

      </div>
    </section>
  );
};

export default Analytics;

