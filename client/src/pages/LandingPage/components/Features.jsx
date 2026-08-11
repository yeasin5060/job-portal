
import React from "react";
import {
  employerFeatures,
  jonSeekerFeatures,
} from "../../../utils/data";

const Features = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">

                {/* Section Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        সফলতার জন্য আপনার যা কিছু প্রয়োজন

                        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-5 pt-2 pb-5">
                        সবকিছু এক প্ল্যাটফর্মে
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        আপনি যদি নতুন চাকরির সুযোগ খুঁজে থাকেন অথবা আপনার প্রতিষ্ঠানের জন্য
                        উপযুক্ত প্রার্থী নিয়োগ করতে চান, তাহলে আমাদের প্ল্যাটফর্মের
                        প্রয়োজনীয় সব টুল ও সুবিধা আপনার কাজকে আরও সহজ করে তুলবে।
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24">

                    {/* Job Seeker Section */}
                    <div>
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                চাকরিপ্রার্থীদের জন্য
                            </h3>

                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full" />
                        </div>

                        <div className="space-y-8">
                            {jonSeekerFeatures.map((feature, index) => (
                                <div
                                key={index}
                                className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                        <feature.icon className="w-6 h-6 text-blue-600" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Employer Section */}
                    <div>
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                নিয়োগদাতাদের জন্য
                            </h3>

                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto rounded-full" />
                        </div>

                        <div className="space-y-8">
                            {employerFeatures.map((feature, index) => (
                                <div
                                key={index}
                                className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-purple-50 transition-all duration-300 cursor-pointer"
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                        <feature.icon className="w-6 h-6 text-purple-600" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                            {feature.title}
                                        </h4>

                                        <p className="text-gray-600 leading-relaxed">
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
