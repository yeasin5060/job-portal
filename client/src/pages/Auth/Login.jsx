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

  }

  const validatePassword = (password) => {

  }

  //Handle  input changes
  const handleInputChange = (e) => {

  }

  const validateForm = () => {

  }

  const handleSubmit = async (e) => {

  }
  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-gray-50'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
      >
        <div className='text-center mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Wellcome back
          </h2>
          <p className='text-gray-600'>
            Sign in to your Jobportal accounts
          </p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'/>
              <input className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors`} type='email' name='email' value={formData.email} placeholder='Enter your email' onChange={handleInputChange}/>
            </div>
            {formState.errors.email && (
              <p className='text-sm text-red-500 mt-1 flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1'/>
                {formState.errors.email}
              </p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'/>
              <input className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors`} type={formState.showPassword ? 'text' :'password'} name='password' value={formData.password} placeholder='Enter your password' onChange={handleInputChange}/>
              <button className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500' type='button' onClick={()=> setFormState((prev) => ({...prev , showPassword : !prev.showPassword}))}>
                {formState.showPassword ? <EyeOff className='w-5 h-5'/> : <Eye className='w-5 h-5'/>}
              </button>
            </div>
            {formState.errors.password && (
              <p className='text-sm text-red-500 mt-1 flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1'/>
                {formState.errors.password}
              </p>
            )}
          </div>
          {/* submit error */}
          {formState.errors.submit && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                <p className='text-sm text-red-700 flex items-center'>
                  <AlertCircle className='w-4 h-4 mr-2'/>
                  {formState.errors.password}
                </p>
              </div>
          )}

          {/* submit button */}
          <button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-3 font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2' type='submit' disabled = {formState.loading}>
            {
              formState.loading ? (
                <>
                  <Loader className='w-5 h-5 animate-spin'/>
                  <span>Sign in...</span>
                </>
              ) 
              : 
              (
                <span>Sign in</span>
              )
            }
          </button>

          {/* sign up link*/}
          <div className='text-center'>
            <p className='text-gray-600'>
              Don't have account? {' '}
              <a href='/signup' className='text-blue-600 hover:text-blue-700 font-medium'>
                Create One here
              </a>
            </p>
          </div>

        </form>
      </motion.div>
    </div>
  )
}

export default Login