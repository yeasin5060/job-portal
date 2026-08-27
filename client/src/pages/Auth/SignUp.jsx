import React from 'react';
import { motion } from "framer-motion";
import {
  Users, Mail, Lock, Upload, Eye, EyeOff, Loader, AlertCircle, CheckCircle, UserCheck, Building2
} from "lucide-react";
import { useState } from 'react';
import { validateAvatar, validateEmail, validatePassword } from '../../utils/helper';
import uploadImage from '../../utils/uploadImage';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useAuth } from '../../context/AuthContext';


const SignUp = () => {

  const {login} = useAuth();

  const [formData , setFormData] = useState({
    fullName : '',
    email : '',
    password : '' , 
    role : '',
    avatar : null
  });

  const [formState , setFormState] = useState({
    loading : false,
    errors : {},
    showPassword : false,
    success : false,
    avatarPreview : null
  });

    //Handle  input changes
  const handleInputChange = (e) => {
    const {name , value} = e.target;
    setFormData(prev => ({...prev,[name]:value}));

    //clear error when user starts typeing
    if(formState.errors[name]) {
      setFormState(prev => ({...prev, errors : {...prev.errors,[name] : ''}}))
    }
  };

  const handleRoleChange = (role) => {
      setFormData(prev => ({...prev, role}));
      if(formState.errors.role) {
        setFormState(prev => ({...prev, errors : {...prev.errors, role : ''}}));
      }
  };

  const handleAvatarChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const error = validateAvatar(file);

  if (error) {
    setFormState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        avatar: error,
      },
    }));
    return;
  }

  setFormData((prev) => ({
    ...prev,
    avatar: file,
  }));

  const reader = new FileReader();

  reader.onload = (e) => {
    setFormState((prev) => ({
      ...prev,
      avatarPreview: e.target.result,
      errors: {
        ...prev.errors,
        avatar: "",
      },
    }));
  };

  reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const errors = {
      fullName : !formData.fullName ? 'Enter your full name' : '',
      email : validateEmail(formData.email),
      password : validatePassword(formData.password),
      role : !formData.role ? 'Please select a role' : '',
      avatar : ''
    };

    //remove empty errors
    Object.keys(errors).forEach( key => {
      if(!errors[key]) delete errors[key];
    });

    setFormState(prev => ({...prev, errors}));
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) return;

    setFormState(prev => ({...prev , loading : true}));
    try {
      let avatarUrl = '';

      if(formData.avatar) {
        const imgUploadRes = await uploadImage(formData.avatar);
        avatarUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name : formData.fullName,
        email : formData.email,
        password : formData.password,
        role : formData.role,
        avatar : avatarUrl || ''
      });

      setFormState(prev => ({
        ...prev,
        loading : false,
        success : true,
        errors : {}
      }));

      const {token} = response.data;

      if(token) {
        login(response.data , token);

        //redirect based on role
        setTimeout(() => {
          window.location.href = formData.role === "employer" ? "/employer-dashboard" : "/find-jobs"
        },2000);
      }
      
    } catch (error) {
      setFormState(prev => ({...prev , loading : false , errors : {
        submit : error.response?.data?.message || "Registration failed , Please try again"
      }}))
    }
  }

  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl"
        >

          {/* সফলতার আইকন */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50"
          >
            <CheckCircle className="h-14 w-14 text-green-500" />
          </motion.div>

          {/* শিরোনাম */}
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি হয়েছে! 🎉
          </h2>

          {/* বার্তা */}
          <p className="mb-6 text-gray-600 leading-6">
            JobPortal-এ আপনাকে স্বাগতম! আপনার অ্যাকাউন্ট সফলভাবে
            তৈরি হয়েছে।
          </p>

          {/* লোডিং */}
          <div className="flex justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>

          <p className="mt-3 text-sm text-gray-500">
            আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-xl p-8"
      >

        {/* Header */}
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-2xl shadow-lg shadow-blue-200">
            💼
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            অ্যাকাউন্ট তৈরি করুন 👋
          </h2>
          <p className="text-sm text-gray-500 leading-6">
            আপনার ক্যারিয়ারের জন্য সেরা চাকরির সুযোগ খুঁজে পেতে
            JobPortal-এ যোগ দিন।
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              পুরো নাম <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="আপনার পুরো নাম লিখুন"
                onChange={handleInputChange}
                className={`
                  w-full rounded-lg border bg-gray-50
                  py-3.5 pl-11 pr-4 text-sm text-gray-900
                  outline-none transition-colors
                  placeholder:text-gray-400
                  focus:bg-white focus:ring-2 focus:ring-blue-500/20
                  ${
                    formState.errors.fullName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }
                `}
              />
            </div>
            {formState.errors.fullName && (
              <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                {formState.errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ইমেইল ঠিকানা <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="আপনার ইমেইল লিখুন"
                onChange={handleInputChange}
                className={`
                  w-full rounded-xl border bg-gray-50
                  py-3.5 pl-11 pr-4 text-sm text-gray-900
                  outline-none transition-all
                  placeholder:text-gray-400
                  focus:bg-white focus:ring-2 focus:ring-blue-500/20
                  ${
                    formState.errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }
                `}
              />
            </div>
            {formState.errors.email && (
              <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                {formState.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              পাসওয়ার্ড <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                onChange={handleInputChange}
                className={`
                  w-full rounded-xl border bg-gray-50
                  py-3.5 pl-11 pr-12 text-sm text-gray-900
                  outline-none transition-all
                  placeholder:text-gray-400
                  focus:bg-white focus:ring-2 focus:ring-blue-500/20
                  ${
                    formState.errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }
                `}
              />
              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
              >
                {formState.showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>
            {formState.errors.password && (
              <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                {formState.errors.password}
              </p>
            )}

          </div>

          {/* Avatar Upload - Optional */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              প্রোফাইল ছবি
              <span className="ml-2 text-xs font-normal text-gray-400">
                (Optional)
              </span>
            </label>
            <div className="flex items-center gap-4">
              {/* Avatar Preview */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100">
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="প্রোফাইল ছবি"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl">
                    <Users/>
                  </div>
                )}
              </div>

              {/* Upload */}
              <div>
                <label
                  htmlFor="avatar"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Upload className=''/>
                  ছবি নির্বাচন করুন
                </label>
                <input
                  id="avatar"
                  type="file"
                  name="avatar"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <p className="mt-2 text-xs text-gray-400">
                  ছবি না দিলেও অ্যাকাউন্ট তৈরি করতে পারবেন
                </p>
              </div>
            </div>
          </div>
          {formState.errors.avatar && (
            <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" />
              {formState.errors.avatar}
            </p>
          )}

         {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              আপনি কে? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Job Seeker */}
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`
                  group rounded-xl border-2 p-4 text-left
                  transition-all duration-200
                  ${
                    formData.role === "jobseeker"
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50/50"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                      flex h-11 w-11 shrink-0 justify-center rounded-lg
                      ${
                        formData.role === "jobseeker"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-white text-gray-500"
                      }
                    `}
                  >
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      চাকরিপ্রার্থী
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      আপনার পছন্দের চাকরির সুযোগ খুঁজুন
                    </p>
                  </div>
                </div>
              </button>

              {/* Employer */}
              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`
                  group rounded-xl border-2 p-4 text-left
                  transition-all duration-200
                  ${
                    formData.role === "employer"
                      ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm"
                      : "border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-300 hover:bg-purple-50/50"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                      flex h-11 w-11 shrink-0  justify-center rounded-lg
                      ${
                        formData.role === "employer"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-white text-gray-500"
                      }
                    `}
                  >
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      নিয়োগকর্তা
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      যোগ্য প্রার্থী খুঁজে নিয়োগ দিন
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Role Error */}
            {formState.errors.role && (
              <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                {formState.errors.role}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {formState.errors.submit && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3.5">

              <p className="flex items-center gap-2 text-sm text-red-700">
                <AlertCircle className="h-5 w-5 shrink-0" />
                {formState.errors.submit}
              </p>

            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl bg-gradient-to-r from-blue-600 to-purple-600
              py-3.5 font-semibold text-white
              shadow-md shadow-blue-200
              transition-all duration-300
              hover:-translate-y-0.5
              hover:from-blue-700 hover:to-purple-700
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0 cursor-pointer
            "
          >

            {formState.loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
              </>
            ) : (
              <>
                <span>অ্যাকাউন্ট তৈরি করুন</span>
                <span>→</span>
              </>
            )}

          </button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">
                অথবা
              </span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">

            <p className="text-sm text-gray-600">
              আপনার কি ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}

              <a
                href="/login"
                className="font-semibold text-blue-600 transition hover:text-purple-600"
              >
                লগইন করুন
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default SignUp