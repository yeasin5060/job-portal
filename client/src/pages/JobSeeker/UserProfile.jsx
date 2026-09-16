import {useState , useEffect} from 'react'
import {Save , X , Trash2 , Users} from 'lucide-react'
import axiosInstance from '../../utils/axiosinstance'
import { useAuth } from '../../context/AuthContext'
import { API_PATHS } from '../../utils/apiPaths'
import uploadImage from '../../utils/uploadImage'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'


const UserProfile = () => {

  
const { user, updateUser } = useAuth();

const [profileData, setProfileData] = useState({
  name: user?.name || "",
  email: user?.email || "",
  avatar: user?.avatar || "",
  resume: user?.resume || "",
});

const [formData, setFormData] = useState({
  ...profileData,
});

const [uploading, setUploading] = useState({
  avatar: false,
  resume: false,
});

const [saving, setSaving] = useState(false);


// =========================
// Input Change
// =========================
const handleInputChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};


// =========================
// Upload File
// =========================
const handleImageUpload = async (file, type) => {
  if (!file) return;

  setUploading((prev) => ({
    ...prev,
    [type]: true,
  }));

  try {
    const imgUploadRes = await uploadImage(file);

    const fileUrl = imgUploadRes?.imageUrl || "";

    if (!fileUrl) {
      throw new Error("File URL not found");
    }

    // Set uploaded URL
    handleInputChange(type, fileUrl);

    // Success message
    if (type === "resume") {
      toast.success("Resume uploaded successfully!");
    } else if (type === "avatar") {
      toast.success("Profile photo uploaded successfully!");
    }

  } catch (error) {
    console.error(
      "Upload failed:",
      error?.response?.data || error.message
    );

    if (type === "resume") {
      toast.error("Resume upload failed!");
    } else {
      toast.error("Profile photo upload failed!");
    }

  } finally {
    setUploading((prev) => ({
      ...prev,
      [type]: false,
    }));
  }
};


// =========================
// File Change
// =========================
const handleImageChange = (e, type) => {
  const file = e.target.files?.[0];

  if (!file) return;

  // Avatar preview
  if (type === "avatar") {
    const previewUrl = URL.createObjectURL(file);
    handleInputChange(type, previewUrl);
  }

  // Upload actual file
  handleImageUpload(file, type);
};


// =========================
// Save Profile
// =========================
const handleSave = async () => {
  setSaving(true);

  try {
    const response = await axiosInstance.put(
      API_PATHS.AUTH.UPDATE_PROFILE,
      formData
    );

    if (response.status === 200) {
      toast.success("Profile details updated successfully");

      setProfileData({
        ...formData,
      });

      updateUser({
        ...formData,
      });
    }

  } catch (error) {
    console.error(
      "Profile details update failed:",
      error?.response?.data || error.message
    );

    toast.error("Failed to update profile");

  } finally {
    setSaving(false);
  }
};


// =========================
// Cancel
// =========================
const handleCancel = () => {
  setFormData({
    ...profileData,
  });
};


// =========================
// Delete Resume
// =========================
const DeleteResume = async () => {
  if (!formData?.resume) return;

  setSaving(true);

  try {
    const response = await axiosInstance.delete(
      API_PATHS.AUTH.DELETE_RESUME,
      {
        data: {
          resumeUrl: formData.resume,
        },
      }
    );

    if (response.status === 200) {
      toast.success("Resume deleted successfully");

      const updatedData = {
        ...formData,
        resume: "",
      };

      setProfileData(updatedData);
      setFormData(updatedData);
      updateUser(updatedData);
    }
  } catch (error) {
    console.error(
      "Resume delete failed:",
      error?.response?.data || error.message
    );

    toast.error(
      error?.response?.data?.message ||
      "Failed to delete resume"
    );
  } finally {
    setSaving(false);
  }
};


// =========================
// Sync User
// =========================
useEffect(() => {
  const userData = {
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    resume: user?.resume || "",
  };

  setProfileData(userData);
  setFormData(userData);
}, [user]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none">

            {/* Top Banner */}
            <div className="relative h-36 sm:h-44 overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">

              <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

              <div className="relative z-10 px-6 pt-6 sm:px-8">
                <p className="text-sm font-medium text-blue-100">
                  অ্যাকাউন্ট সেটিংস
                </p>

                <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
                  প্রোফাইল
                </h1>

                <p className="mt-1 text-sm text-blue-100">
                  আপনার প্রোফাইলের তথ্য ও ছবি আপডেট করুন
                </p>
              </div>
            </div>

            {/* Profile Content */}
            <div className="relative px-5 pb-7 sm:px-8 sm:pb-9">

              {/* Avatar */}
              <div className="-mt-14 sm:-mt-16">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

                  <div className="flex flex-col sm:flex-row sm:items-end gap-4">

                    {/* Avatar */}
                    <div className="relative w-fit">

                      <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 shadow-xl overflow-hidden">

                        {formData.avatar ? (
                          <img
                            src={formData.avatar}
                            alt="প্রোফাইল ছবি"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Users className="h-14 w-14 text-slate-400" />
                          </div>
                        )}
                        {/* Upload Loading */}
                        {uploading?.avatar && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                            <div className="h-8 w-8 rounded-full border-3 border-white/30 border-t-white animate-spin" />
                          </div>
                        )}
                      </div>

                      {/* Online Dot */}
                      <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-white dark:border-slate-900 bg-emerald-500" />
                    </div>

                    {/* Avatar Info */}
                    <div className="pb-1 sm:pb-2">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        প্রোফাইল ছবি
                      </h2>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        JPG, PNG অথবা WEBP ফরম্যাট ব্যবহার করুন। প্রস্তাবিত সাইজ ৪০০×৪০০ পিক্সেল।
                      </p>
                    </div>
                  </div>

                  {/* Upload Button */}
                  <div>
                    <label className="group inline-flex items-center justify-center gap-2 cursor-pointer rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">

                      <span className="text-base transition-transform group-hover:-translate-y-0.5">
                        📷
                      </span>

                      <span>ছবি নির্বাচন করুন</span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(e, "avatar")
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                  {/* Full Name */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Email address cannot be changed.
                    </p>
                  </div>

                 {/* Resume */}
                <div className="lg:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Resume
                  </label>

                  {formData?.resume ? (
                    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900/50">

                      <div className="flex min-w-0 items-center gap-3">
                        {/* Resume Icon */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                          📄
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Resume
                          </p>

                          <a
                            href={formData.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block max-w-[250px] truncate text-xs text-blue-600 hover:underline sm:max-w-[400px] dark:text-blue-400"
                          >
                            View Resume
                          </a>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {/* View */}
                        <a
                          href={formData.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400"
                        >
                          👁
                          <span>View</span>
                        </a>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={DeleteResume}
                          disabled={saving}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />

                          <span>
                            {saving ? "Deleting..." : "Delete"}
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition-all hover:border-blue-400 hover:bg-blue-50/50 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-blue-500 dark:hover:bg-blue-950/20">

                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-950/50 dark:text-blue-400">

                        {uploading.resume ? (
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 16V4m0 0L8 8m4-4 4 4M5 20h14"
                            />
                          </svg>
                        )}
                      </div>

                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {uploading.resume
                          ? "Uploading Resume..."
                          : "Choose Resume"}
                      </span>

                      <span className="mt-1 text-xs text-slate-400">
                        PDF, DOC or DOCX
                      </span>

                      <input
                        className="hidden"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        disabled={uploading.resume}
                        onChange={(e) => handleImageChange(e, "resume")}
                      />
                    </label>
                  )}
                </div>

                </div>
                
              </div>

              {/* Divider */}
              <div className="my-8 border-t border-slate-100 dark:border-slate-800" />

              {/* Bottom Actions */}
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">

                {/* Info */}
                <div className="text-center sm:text-left">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    সংরক্ষণ করার আগে আপনার তথ্যগুলো সঠিকভাবে যাচাই করুন।
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center sm:justify-end gap-3">

                  {/* Cancel */}
                  <Link
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
                    onClick={handleCancel}
                    to="/find-jobs"
                  >
                    <X className="h-4 w-4" />
                    <span>বাতিল</span>
                  </Link>

                  {/* Save */}
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none transition-all duration-200"
                    onClick={handleSave}
                    disabled={
                      saving ||
                      uploading.avatar ||
                      uploading.logo
                    }
                  >
                    {saving ? (
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}

                    <span>
                      {saving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
                    </span>
                  </button>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default UserProfile