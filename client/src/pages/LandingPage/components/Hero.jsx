import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Search,
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Hero = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const floatingOrb1 = useRef(null);
  const floatingOrb2 = useRef(null);
  const floatingOrb3 = useRef(null);

  const stats = [
    {
      icon: Users,
      label: "সক্রিয় ব্যবহারকারী",
      value: "২.৪M+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Building2,
      label: "নিবন্ধিত কোম্পানি",
      value: "৫০K+",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: TrendingUp,
      label: "প্রকাশিত চাকরি",
      value: "১৫০K+",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  useGSAP(
    () => {
      // Floating ambient background orbs animation
      if (floatingOrb1.current) {
        gsap.to(floatingOrb1.current, {
          x: 40,
          y: -30,
          scale: 1.15,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (floatingOrb2.current) {
        gsap.to(floatingOrb2.current, {
          x: -50,
          y: 40,
          scale: 0.9,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (floatingOrb3.current) {
        gsap.to(floatingOrb3.current, {
          scale: 1.25,
          rotation: 45,
          duration: 11,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Master entrance timeline using fromTo with clearProps to avoid stuck invisible state
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: -25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, clearProps: "all" }
        );
      }

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, clearProps: "all" },
          "-=0.4"
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, clearProps: "all" },
          "-=0.4"
        );
      }

      if (ctaRef.current?.children) {
        tl.fromTo(
          ctaRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, clearProps: "all" },
          "-=0.3"
        );
      }

      if (statsRef.current?.children) {
        tl.fromTo(
          statsRef.current.children,
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, clearProps: "all" },
          "-=0.3"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-gray-50/60"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Premium Announcement Pill */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 shadow-sm text-sm text-blue-800 mb-8 font-medium hover:border-blue-400 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>বাংলাদেশের শীর্ষস্থানীয় এআই-পাওয়ার্ড জব প্ল্যাটফর্ম</span>
          </div>

          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-[1.15] tracking-tight"
          >
            আপনার স্বপ্নের চাকরি খুঁজুন অথবা{" "}
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-3 pb-2">
              সেরা প্রার্থী নিয়োগ করুন
            </span>
          </h1>

          {/* Sub Heading */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            দক্ষ চাকরিপ্রার্থীদের সাথে উদ্ভাবনী কোম্পানিগুলোর সরাসরি সংযোগ।
            সহজেই আবেদন করুন, ট্র্যাকিং করুন এবং আপনার ক্যারিয়ারকে এগিয়ে নিয়ে যান আধুনিক প্রযুক্তির মাধ্যমে।
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16"
          >
            {/* Find Jobs Button */}
            <button
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              onClick={() => navigate("/find-jobs")}
            >
              <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>চাকরি খুঁজুন</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Post Job Button */}
            <button
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-gray-800 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              onClick={() =>
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                )
              }
            >
              <Zap className="w-5 h-5 text-purple-600" />
              <span>চাকরি পোস্ট করুন</span>
            </button>
          </div>

          {/* Statistics Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200/80 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${stat.color} flex items-center justify-center shadow-md mb-4 text-white transform group-hover:scale-105 transition-transform`}
                >
                  <stat.icon className="w-7 h-7" />
                </div>

                {/* Value */}
                <div className="text-3xl font-black text-gray-900 tracking-tight">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm font-semibold text-gray-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-14 pt-8 border-t border-gray-200/60 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> ভেরিফায়েড কোম্পানি
            </span>
            <span>•</span>
            <span>১০০% নিরাপদ প্রক্রিয়া</span>
            <span>•</span>
            <span>রিয়েল-টাইম ট্র্যাকিং</span>
          </div>

        </div>
      </div>

      {/* GSAP Driven Ambient Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={floatingOrb1}
          className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-300/10 rounded-full blur-3xl"
        />
        <div
          ref={floatingOrb2}
          className="absolute bottom-10 right-0 w-[420px] h-[420px] bg-gradient-to-br from-purple-400/20 to-pink-300/10 rounded-full blur-3xl"
        />
        <div
          ref={floatingOrb3}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-200/15 via-indigo-200/15 to-purple-200/10 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default Hero;


