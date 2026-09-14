
import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Save, X } from "lucide-react";

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

              {/* ================= HEADER ================= */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
                <h1 className="text-lg md:text-xl font-medium text-white">
                  Edit Profile
                </h1>

                <p className="text-blue-100 text-sm mt-1">
                  Update your personal and company information
                </p>
              </div>

              {/* ================= FORM ================= */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                  {/* =====================================================
                      PERSONAL INFORMATION
                  ====================================================== */}
                  <div className="space-y-6">

                    <h2 className="text-lg font-medium text-gray-800 border-b pb-2">
                      Personal Information
                    </h2>

                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">

                        <img
                          src={
                            formData.avatar ||
                            "https://via.placeholder.com/100"
                          }
                          alt="Avatar"
                          className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 bg-gray-200"
                        />

                        {uploading?.avatar && (
                          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <label className="block">
                          <span className="sr-only">
                            Choose Avatar
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
                              text-sm
                              text-gray-500
                              file:mr-4
                              file:py-2
                              file:px-4
                              file:rounded-full
                              file:border-0
                              file:text-sm
                              file:font-semibold
                              file:bg-blue-50
                              file:text-blue-700
                              hover:file:bg-blue-100
                              disabled:opacity-50
                              cursor-pointer
                            "
                          />
                        </label>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
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
                          px-4
                          py-3
                          border
                          border-gray-300
                          rounded-lg
                          outline-none
                          focus:ring-2
                          focus:ring-blue-500
                          focus:border-blue-500
                          transition-all
                        "
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={formData.email || ""}
                        disabled
                        className="
                          w-full
                          px-4
                          py-3
                          border
                          border-gray-300
                          rounded-lg
                          bg-gray-50
                          text-gray-600
                          cursor-not-allowed
                        "
                      />

                      <p className="text-xs text-gray-400 mt-1">
                        Email address cannot be changed.
                      </p>
                    </div>
                  </div>

                  {/* =====================================================
                      COMPANY INFORMATION
                  ====================================================== */}
                  <div className="space-y-6">

                    <h2 className="text-lg font-medium text-gray-800 border-b pb-2">
                      Company Information
                    </h2>

                    {/* Company Logo */}
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">

                        <img
                          src={
                            formData.companyLogo ||
                            "https://via.placeholder.com/100"
                          }
                          alt="Company Logo"
                          className="w-20 h-20 rounded-lg object-cover border-4 border-gray-200 bg-gray-100"
                        />

                        {uploading?.logo && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <label className="block">
                          <span className="sr-only">
                            Choose company logo
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
                              text-sm
                              text-gray-500
                              file:mr-4
                              file:py-2
                              file:px-4
                              file:rounded-full
                              file:border-0
                              file:text-sm
                              file:font-semibold
                              file:bg-green-50
                              file:text-green-700
                              hover:file:bg-green-100
                              disabled:opacity-50
                              cursor-pointer
                            "
                          />
                        </label>
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Company Name
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
                          px-4
                          py-3
                          border
                          border-gray-300
                          rounded-lg
                          outline-none
                          focus:ring-2
                          focus:ring-blue-500
                          focus:border-blue-500
                          transition-all
                        "
                        placeholder="Enter company name"
                      />
                    </div>

                    {/* Company Description */}
                    <div>
                      <label
                        htmlFor="companyDescription"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Company Description
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
                          px-4
                          py-3
                          border
                          border-gray-300
                          rounded-lg
                          outline-none
                          focus:ring-2
                          focus:ring-blue-500
                          focus:border-blue-500
                          transition-all
                          resize-none
                        "
                        placeholder="Describe your company..."
                      />
                    </div>
                  </div>
                </div>

                {/* ================= ACTION BUTTONS ================= */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t">

                  {/* Cancel */}
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="
                      px-6
                      py-3
                      border
                      border-gray-300
                      text-gray-700
                      rounded-lg
                      hover:bg-gray-50
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      transition-colors
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
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
                      px-6
                      py-3
                      bg-blue-600
                      text-white
                      rounded-lg
                      hover:bg-blue-700
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      transition-colors
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}

                    <span>
                      {saving ? "Saving..." : "Save Changes"}
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
