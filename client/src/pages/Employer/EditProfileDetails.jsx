
import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Save, X , Mail , Building2} from "lucide-react";

const EditProfileDetails = ({
  formData,
  handleImageChange,
  handleInputChange,
  handleCancel,
  handleSave,
  saving = false,
  uploading = {},
}) => {
  // Input change handler
  const onInputChange = (field, value) => {
    handleInputChange(field, value);
  };

  return (
    <DashboardLayout activeMenu="company-profile">
      {!formData ? (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-9 w-9 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-500">
              প্রোফাইল লোড হচ্ছে...
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">

            {/* ================= MAIN CARD ================= */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* ================= HEADER ================= */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 px-6 py-8 sm:px-8">

                {/* Decorative Circles */}
                <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
                <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

                <div className="relative">
                  <div className="mb-2 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 backdrop-blur-sm">
                    প্রোফাইল সেটিংস
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-white">
                    প্রোফাইল সম্পাদনা করুন
                  </h1>

                  <p className="mt-1 max-w-xl text-sm text-blue-100">
                    আপনার ব্যক্তিগত এবং কোম্পানির তথ্য আপডেট করুন
                  </p>
                </div>
              </div>

              {/* ================= FORM CONTENT ================= */}
              <div className="p-5 sm:p-8">

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                  {/* =====================================================
                      PERSONAL INFORMATION
                  ====================================================== */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">

                    {/* Section Header */}
                    <div className="mb-7 flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-semibold text-slate-800">
                          ব্যক্তিগত তথ্য
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          আপনার ব্যক্তিগত অ্যাকাউন্টের তথ্য
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Mail className="h-5 w-5" />
                      </div>
                    </div>

                    {/* ================= Avatar ================= */}
                    <div className="mb-7 rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center gap-4">

                        <div className="relative shrink-0">

                          <img
                            src={
                              formData.avatar ||
                              "https://via.placeholder.com/100"
                            }
                            alt="প্রোফাইল ছবি"
                            className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-sm"
                          />

                          {uploading?.avatar && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
                              <div className="h-6 w-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-700">
                            প্রোফাইল ছবি
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            আপনার একটি পরিষ্কার প্রোফাইল ছবি আপলোড করুন
                          </p>

                          <label className="mt-3 inline-block">
                            <span className="sr-only">
                              প্রোফাইল ছবি নির্বাচন করুন
                            </span>

                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploading?.avatar}
                              onChange={(e) =>
                                handleImageChange(e, "avatar")
                              }
                              className="
                                block
                                w-full
                                text-xs
                                text-slate-500
                                file:mr-3
                                file:rounded-lg
                                file:border-0
                                file:bg-blue-50
                                file:px-3
                                file:py-2
                                file:text-xs
                                file:font-semibold
                                file:text-blue-600
                                hover:file:bg-blue-100
                                disabled:opacity-50
                                cursor-pointer
                              "
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* ================= Full Name ================= */}
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        পূর্ণ নাম
                      </label>

                      <input
                        id="name"
                        type="text"
                        value={formData.name || ""}
                        onChange={(e) =>
                          onInputChange("name", e.target.value)
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-4
                          py-3
                          text-sm
                          text-slate-700
                          outline-none
                          transition-all
                          placeholder:text-slate-400
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                      />
                    </div>

                    {/* ================= Email ================= */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        ই-মেইল ঠিকানা
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={formData.email || ""}
                        disabled
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          py-3
                          text-sm
                          text-slate-500
                          outline-none
                          cursor-not-allowed
                        "
                      />

                      <p className="mt-2 text-xs text-slate-400">
                        নিরাপত্তার কারণে ই-মেইল ঠিকানা পরিবর্তন করা যাবে না।
                      </p>
                    </div>
                  </div>

                  {/* =====================================================
                      COMPANY INFORMATION
                  ====================================================== */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">

                    {/* Section Header */}
                    <div className="mb-7 flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-semibold text-slate-800">
                          কোম্পানির তথ্য
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          আপনার কোম্পানি বা প্রতিষ্ঠানের তথ্য
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Building2 className="h-5 w-5" />
                      </div>
                    </div>

                    {/* ================= Company Logo ================= */}
                    <div className="mb-7 rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center gap-4">

                        <div className="relative shrink-0">

                          <img
                            src={
                              formData.companyLogo ||
                              "https://via.placeholder.com/100"
                            }
                            alt="কোম্পানির লোগো"
                            className="h-20 w-20 rounded-2xl border-4 border-white bg-white object-contain p-1 shadow-sm"
                          />

                          {uploading?.logo && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
                              <div className="h-6 w-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-700">
                            কোম্পানির লোগো
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            আপনার কোম্পানির লোগো আপলোড করুন
                          </p>

                          <label className="mt-3 inline-block">
                            <span className="sr-only">
                              কোম্পানির লোগো নির্বাচন করুন
                            </span>

                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploading?.logo}
                              onChange={(e) =>
                                handleImageChange(e, "logo")
                              }
                              className="
                                block
                                w-full
                                text-xs
                                text-slate-500
                                file:mr-3
                                file:rounded-lg
                                file:border-0
                                file:bg-indigo-50
                                file:px-3
                                file:py-2
                                file:text-xs
                                file:font-semibold
                                file:text-indigo-600
                                hover:file:bg-indigo-100
                                disabled:opacity-50
                                cursor-pointer
                              "
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* ================= Company Name ================= */}
                    <div className="mb-5">
                      <label
                        htmlFor="companyName"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        কোম্পানির নাম
                      </label>

                      <input
                        id="companyName"
                        type="text"
                        value={formData.companyName || ""}
                        onChange={(e) =>
                          onInputChange(
                            "companyName",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-4
                          py-3
                          text-sm
                          text-slate-700
                          outline-none
                          transition-all
                          placeholder:text-slate-400
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                        placeholder="কোম্পানির নাম লিখুন"
                      />
                    </div>

                    {/* ================= Company Description ================= */}
                    <div>
                      <label
                        htmlFor="companyDescription"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        কোম্পানি সম্পর্কে
                      </label>

                      <textarea
                        id="companyDescription"
                        value={formData.companyDescription || ""}
                        onChange={(e) =>
                          onInputChange(
                            "companyDescription",
                            e.target.value
                          )
                        }
                        rows={5}
                        className="
                          w-full
                          resize-none
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-4
                          py-3
                          text-sm
                          leading-6
                          text-slate-700
                          outline-none
                          transition-all
                          placeholder:text-slate-400
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                        placeholder="আপনার কোম্পানি বা প্রতিষ্ঠান সম্পর্কে সংক্ষিপ্ত বিবরণ লিখুন..."
                      />

                      <p className="mt-2 text-xs text-slate-400">
                        চাকরিপ্রার্থীদের জন্য আপনার কোম্পানি সম্পর্কে সংক্ষিপ্ত ও পরিষ্কার তথ্য দিন।
                      </p>
                    </div>
                  </div>
                </div>

                {/* ================= ACTION BUTTONS ================= */}
                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

                  {/* Cancel */}
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-6
                      py-3
                      text-sm
                      font-semibold
                      text-slate-600
                      transition-all
                      hover:bg-slate-50
                      hover:border-slate-300
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <X className="h-4 w-4" />
                    বাতিল করুন
                  </button>

                  {/* Save */}
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={
                      saving ||
                      uploading?.avatar ||
                      uploading?.logo
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      px-7
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition-all
                      hover:from-blue-700
                      hover:to-indigo-700
                      hover:shadow-md
                      active:scale-[0.98]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {saving ? (
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}

                    <span>
                      {saving ? "সংরক্ষণ করা হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EditProfileDetails;
