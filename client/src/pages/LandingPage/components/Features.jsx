import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  employerFeatures,
  jonSeekerFeatures,
} from "../../../utils/data";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const seekerListRef = useRef(null);
  const employerListRef = useRef(null);

  useGSAP(
    () => {
      // Gentle entrance without keeping opacity 0
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          y: 25,
          opacity: 0.3,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      if (seekerListRef.current?.children) {
        gsap.from(seekerListRef.current.children, {
          scrollTrigger: {
            trigger: seekerListRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          y: 20,
          opacity: 0.4,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        });
      }

      if (employerListRef.current?.children) {
        gsap.from(employerListRef.current.children, {
          scrollTrigger: {
            trigger: employerListRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          y: 20,
          opacity: 0.4,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Heading */}
        <div ref={headerRef} className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/60 mb-4">
            আমাদের ফিচারসমূহ
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            সফলতার জন্য আপনার যা কিছু প্রয়োজন{" "}
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
              সবকিছু এক প্ল্যাটফর্মে
            </span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            আপনি যদি নতুন চাকরির সুযোগ খুঁজে থাকেন অথবা আপনার প্রতিষ্ঠানের জন্য
            উপযুক্ত প্রার্থী নিয়োগ করতে চান, তাহলে আমাদের প্ল্যাটফর্মের
            প্রয়োজনীয় সব টুল ও সুবিধা আপনার কাজকে আরও সহজ করে তুলবে।
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

          {/* Job Seeker Section */}
          <div className="bg-gradient-to-b from-blue-50/40 to-transparent p-8 md:p-10 rounded-3xl border border-blue-100/70 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-blue-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                ১
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  চাকরিপ্রার্থীদের জন্য
                </h3>
                <p className="text-sm text-gray-500">সহজে চাকরি খুঁজুন এবং ক্যারিয়ার গড়ুন</p>
              </div>
            </div>

            <div ref={seekerListRef} className="space-y-4">
              {jonSeekerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-all duration-300 shadow-sm">
                    <feature.icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employer Section */}
          <div className="bg-gradient-to-b from-purple-50/40 to-transparent p-8 md:p-10 rounded-3xl border border-purple-100/70 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-purple-100">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                ২
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  নিয়োগদাতাদের জন্য
                </h3>
                <p className="text-sm text-gray-500">সেরা প্রতিভা খুঁজে নিন নিখুঁতভাবে</p>
              </div>
            </div>

            <div ref={employerListRef} className="space-y-4">
              {employerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white text-purple-600 transition-all duration-300 shadow-sm">
                    <feature.icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
