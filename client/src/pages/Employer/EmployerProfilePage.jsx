
import React, { useState } from "react";
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
      <div className="min-h-screen bg-gray-50 px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 flex items-center justify-between">
              <h1 className="text-xl font-medium text-white">
                Employer Profile
              </h1>

              <button
                type="button"
                className="bg-white/10 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                onClick={() => {
                  setFormData({
                    ...profileData,
                  });

                  setEditMode(true);
                }}
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Profile Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Profile Information
                  </h2>

                  <div className="flex items-center space-x-4">

                    {/* Avatar */}
                    {profileData.avatar ? (
                      <img
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-50"
                        src={profileData.avatar}
                        alt="avatar"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-blue-100 border-4 border-blue-50 flex items-center justify-center text-blue-600 font-semibold text-xl">
                        {profileData.name
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.name || "User Name"}
                      </h3>

                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{profileData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Company Information
                  </h2>

                  <div className="flex items-center space-x-4">

                    {/* Company Logo */}
                    {profileData.companyLogo ? (
                      <img
                        className="w-20 h-20 rounded-lg object-cover border-4 border-gray-50"
                        src={profileData.companyLogo}
                        alt="company logo"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-gray-100 border-4 border-gray-50 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-gray-400" />
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.companyName ||
                          "Company Name"}
                      </h3>

                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Building2 className="w-4 h-4 mr-2" />
                        <span>Company</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Description */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-2">
                  About Company
                </h2>

                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg">
                  {profileData.companyDescription ||
                    "No company description available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfilePage;

