
import {
  Briefcase,
  ArrowRight
} from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white text-gray-900">

      {/* Background Decoration */}
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-12 border-b border-gray-200 pb-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-3">

              {/* Logo */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-2xl shadow-lg shadow-blue-200">
                💼
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Job<span className="text-blue-600">Portal</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-gray-600">
              আপনার স্বপ্নের ক্যারিয়ার শুরু হোক সঠিক সুযোগের মাধ্যমে।
              যোগ্য প্রার্থীদের সেরা কোম্পানির সাথে সংযুক্ত করাই আমাদের
              প্রধান লক্ষ্য।
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 font-bold transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
              >
                𝕏
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm font-bold transition hover:border-blue-700 hover:bg-blue-700 hover:text-white"
              >
                in
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-lg transition hover:border-pink-500 hover:bg-pink-500 hover:text-white"
              >
                ◎
              </a>

            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              🔗 দ্রুত লিংক
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-blue-600"
                >
                  → হোম
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-blue-600"
                >
                  → সব চাকরি
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-blue-600"
                >
                  → কোম্পানি
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-blue-600"
                >
                  → চাকরি খুঁজুন
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-blue-600"
                >
                  → আমাদের সম্পর্কে
                </a>
              </li>

            </ul>
          </div>


          {/* Job Seekers */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              👨‍💼 চাকরিপ্রার্থীদের জন্য
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-purple-600"
                >
                  → প্রোফাইল তৈরি করুন
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-purple-600"
                >
                  → সিভি তৈরি করুন
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-purple-600"
                >
                  → সেভ করা চাকরি
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-purple-600"
                >
                  → চাকরির আবেদন
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-purple-600"
                >
                  → ক্যারিয়ার গাইড
                </a>
              </li>

            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              📞 যোগাযোগ করুন
            </h3>

            <div className="space-y-4 text-sm">

              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>

                <p className="leading-6 text-gray-600">
                  ঢাকা, বাংলাদেশ
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">✉️</span>

                <a
                  href="mailto:info@jobportal.com"
                  className="text-gray-600 transition hover:text-blue-600"
                >
                  info@jobportal.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">📱</span>

                <a
                  href="tel:+8801700000000"
                  className="text-gray-600 transition hover:text-blue-600"
                >
                  +৮৮০ ১৭০০-০০০০০০
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">🕐</span>

                <p className="text-gray-600">
                  শনি - বৃহস্পতি: সকাল ৯টা - সন্ধ্যা ৬টা
                </p>
              </div>

            </div>
          </div>

        </div>


        {/* Newsletter */}
        <div className="border-b border-gray-200 py-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                📩 নতুন চাকরির আপডেট পেতে চান?
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                আপনার ইমেইলে সর্বশেষ চাকরির বিজ্ঞপ্তি পান।
              </p>
            </div>

            <div className="flex w-full max-w-md">

              <input
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                className="w-full rounded-l-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
              />

              <button
                type="button"
                className="rounded-r-xl bg-gradient-to-r from-blue-500 to-purple-600 px-5 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-purple-700"
              >
                সাবস্ক্রাইব
              </button>

            </div>
          </div>

        </div>


        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 py-6 text-sm md:flex-row md:items-center md:justify-between">

          <p className="text-gray-500">
            © {currentYear}{" "}
            <span className="font-semibold text-gray-800">
              JobPortal
            </span>
            । সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex flex-wrap gap-5">

            <a
              href="#"
              className="text-gray-500 transition hover:text-blue-600"
            >
              গোপনীয়তা নীতি
            </a>

            <a
              href="#"
              className="text-gray-500 transition hover:text-blue-600"
            >
              ব্যবহারের শর্তাবলি
            </a>

            <a
              href="#"
              className="text-gray-500 transition hover:text-blue-600"
            >
              সহায়তা
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



