import React, { useState } from 'react'
import { motion } from "framer-motion";
import {
  Mail , Lock, Eye, EyeOff , Loader , AlertCircle , CheckCircle
} from "lucide-react";

const Login = () => {
  const [formData , setFormData] = useState({
    email : '',
    password : '' , 
    rememberMe : false
  });

  const [formState , setFormState] = useState({
    loading : false,
    errors : {},
    showPassword : false,
    success : false
  });

  // validation functions

  const validateEmail = (email) => {
    if(!email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(email)) return 'Please inter a valid email address';
    return '';
  }

  const validatePassword = (password) => {
    if(!password.trim()) return "Password is required";
    return '';
  }

  //Handle  input changes
  const handleInputChange = (e) => {
    const {name , value} = e.target;
    setFormData(prev => ({...prev,[name]:value}));

    //clear error when user starts typeing
    if(formState.errors[name]) {
      setFormState(prev => ({...prev, errors : {...prev.errors,[name] : ''}}))
    }
  };

  const validateForm = () => {
    const errors = {
      email : validateEmail(formData.email),
      password : validatePassword(formData.password)
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
      
    } catch (error) {
      setFormState(prev => ({...prev , loading : false , errors : {
        submit : error.response?.data?.message || "Login failed , Please check your credentials"
      }}))
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
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
            Welcome Back 👋
          </h2>

          <p className="text-sm text-gray-500">
            আপনার JobPortal অ্যাকাউন্টে সাইন ইন করুন
          </p>

        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
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
                      : "border-gray-200 focus:border-blue-500"
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

            <div className="flex items-center justify-between mb-2">

              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <a
                href="/forgot-password"
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </a>

            </div>

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
              disabled:hover:translate-y-0
            "
          >

            {formState.loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
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


          {/* Sign Up */}
          <div className="text-center">

            <p className="text-sm text-gray-600">
              আপনার কি এখনো অ্যাকাউন্ট নেই?{" "}

              <a
                href="/signup"
                className="font-semibold text-blue-600 transition hover:text-purple-600"
              >
                নতুন অ্যাকাউন্ট তৈরি করুন
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login