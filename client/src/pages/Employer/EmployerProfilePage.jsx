
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Building2, Mail, Edit3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";
import EditProfileDetails from "./EditProfileDetails";

const EmployerProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    companyName: user?.companyName || "",
    companyDescription: user?.companyDescription || "",
    companyLogo: user?.companyLogo || "",
  });

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    companyName: user?.companyName || "",
    companyDescription: user?.companyDescription || "",
    companyLogo: user?.companyLogo || "",
  });

  const [uploading, setUploading] = useState({
    avatar: false,
    logo: false,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    const updatedProfile = {
      name: user.name || "",
      email: user.email || "",
      avatar: user.avatar || "",
      companyName: user.companyName || "",
      companyDescription: user.companyDescription || "",
      companyLogo: user.companyLogo || "",
    };

    setProfileData(updatedProfile);

    if (!editMode) {
      setFormData(updatedProfile);
    }
  }, [user, editMode]);

  // ============================================================
  // HANDLE INPUT CHANGE
  // ============================================================
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ============================================================
  // HANDLE IMAGE UPLOAD
  // ============================================================
  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({
      ...prev,
      [type]: true,
    }));

    try {
      const imgUploadingRes = await uploadImage(file);

      const imageUrl = imgUploadingRes?.imageUrl;

      if (!imageUrl) {
        throw new Error("Image URL not found");
      }

      const field = type === "avatar" ? "avatar" : "companyLogo";

      handleInputChange(field, imageUrl);
    } catch (error) {
      console.error("Image uploading failed:", error);
      toast.error("Image upload failed");
    } finally {
      setUploading((prev) => ({
        ...prev,
        [type]: false,
      }));
    }
  };

  // ============================================================
  // HANDLE IMAGE CHANGE
  // ============================================================
  const handleImageChange = async (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Temporary preview
    const previewUrl = URL.createObjectURL(file);

    const field = type === "avatar" ? "avatar" : "companyLogo";

    // Show preview immediately
    handleInputChange(field, previewUrl);

    // Upload image
    await handleImageUpload(file, type);

    // Clear input so same image can be selected again
    e.target.value = "";
  };

  // ============================================================
  // SAVE PROFILE
  // ============================================================
  const handleSave = async () => {
    if (uploading.avatar || uploading.logo) {
      toast.error("Please wait for image upload to finish");
      return;
    }

    setSaving(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        toast.success("Profile details updated successfully");

        // Use server response if available
        const updatedUser = response?.data?.user || formData;

        setProfileData({
          ...updatedUser,
        });

        setFormData({
          ...updatedUser,
        });

        updateUser({
          ...updatedUser,
        });

        setEditMode(false);
      }
    } catch (error) {
      console.error("Profile update failed:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // CANCEL EDIT
  // ============================================================
  const handleCancel = () => {
    setFormData({
      ...profileData,
    });

    setEditMode(false);
  };

  // ============================================================
  // EDIT MODE
  // ============================================================
  if (editMode) {
    return (
      <EditProfileDetails
        formData={formData}
        handleImageChange={handleImageChange}
        handleInputChange={handleInputChange}
        handleCancel={handleCancel}
        handleSave={handleSave}
        saving={saving}
        uploading={uploading}
      />
    );
  }

  // ============================================================
  // PROFILE VIEW
  // ============================================================
  return (
   <DashboardLayout activeMenu="company-profile">
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* ================= Header ================= */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 px-6 py-8 sm:px-8">

            {/* Background Decoration */}
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 backdrop-blur-sm">
                  নিয়োগকর্তার অ্যাকাউন্ট
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-white">
                  কোম্পানি প্রোফাইল
                </h1>

                <p className="mt-1 text-sm text-blue-100">
                  আপনার ব্যক্তিগত ও কোম্পানির তথ্য পরিচালনা করুন
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...profileData,
                  });

                  setEditMode(true);
                }}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-200 hover:bg-blue-50 hover:shadow-md active:scale-95"
              >
                <Edit3 className="h-4 w-4" />
                প্রোফাইল সম্পাদনা
              </button>
            </div>
          </div>

          {/* ================= Profile Content ================= */}
          <div className="p-5 sm:p-8">

            {/* ================= Top Cards ================= */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* -------- Personal Profile -------- */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-md">

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-slate-800">
                      ব্যক্তিগত তথ্য
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      আপনার অ্যাকাউন্টের তথ্য
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex items-center gap-4">

                  {/* Avatar */}
                  <div className="shrink-0">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt="প্রোফাইল ছবি"
                        className="h-20 w-20 rounded-2xl border-4 border-blue-50 object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-blue-50 bg-gradient-to-br from-blue-100 to-indigo-100 text-2xl font-bold text-blue-600">
                        {profileData.name
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-slate-800">
                      {profileData.name || "ব্যবহারকারীর নাম"}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <Mail className="h-4 w-4 shrink-0 text-blue-500" />

                      <span className="truncate">
                        {profileData.email || "ই-মেইল পাওয়া যায়নি"}
                      </span>
                    </div>

                    <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                      ● সক্রিয় নিয়োগকর্তা
                    </div>
                  </div>
                </div>
              </div>

              {/* -------- Company Profile -------- */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-md">

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-slate-800">
                      কোম্পানির তথ্য
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      আপনার কোম্পানির বিস্তারিত তথ্য
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex items-center gap-4">

                  {/* Company Logo */}
                  <div className="shrink-0">
                    {profileData.companyLogo ? (
                      <img
                        src={profileData.companyLogo}
                        alt="কোম্পানির লোগো"
                        className="h-20 w-20 rounded-2xl border border-slate-200 bg-white object-contain p-2 shadow-sm"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                        <Building2 className="h-9 w-9 text-slate-400" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-slate-800">
                      {profileData.companyName || "কোম্পানির নাম"}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <Building2 className="h-4 w-4 shrink-0 text-indigo-500" />
                      <span>কোম্পানি / প্রতিষ্ঠান</span>
                    </div>

                    <div className="mt-2 inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                      কোম্পানি প্রোফাইল
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= About Company ================= */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-md sm:p-7">

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Building2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-800">
                    কোম্পানি সম্পর্কে
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    আপনার প্রতিষ্ঠান সম্পর্কে সংক্ষিপ্ত বিবরণ
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm leading-7 text-slate-600">
                  {profileData.companyDescription ||
                    "কোম্পানি সম্পর্কে কোনো বিবরণ দেওয়া হয়নি। চাকরিপ্রার্থীদের আপনার প্রতিষ্ঠান সম্পর্কে জানাতে একটি সংক্ষিপ্ত বিবরণ যোগ করুন।"}
                </p>
              </div>
            </div>

            {/* ================= Profile Summary ================= */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* Account Type */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">
                  অ্যাকাউন্টের ধরন
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  নিয়োগকর্তা
                </p>
              </div>

              {/* Profile Status */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">
                  প্রোফাইলের অবস্থা
                </p>

                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  সক্রিয়
                </p>
              </div>

              {/* Company */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">
                  কোম্পানি
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                  {profileData.companyName || "যোগ করা হয়নি"}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
  );
};

export default EmployerProfilePage;

