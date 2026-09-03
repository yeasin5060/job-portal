import { API_PATHS } from "../../utils/apiPaths"
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosinstance"
import { CATEGORIES , JOB_TYPES } from "../../utils/data"
import toast from 'react-hot-toast'
import DashboardLayout from "../../components/layout/DashboardLayout"
import { useState } from "react"

const JobPostingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const [formData , setFormData] = useState({
    jobTitle : "",
    location : "",
    category : "",
    jobType : "",
    description : "",
    requirements : "",
    salaryMin : "",
    salaryMax : ""
  });

  const [errors , setErros] = useState({});
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [isPreview , setIsPreview] = useState(false);

  const handleInputChange = (field , value) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  //Form validation halper
  const validateForm = (formData) => {
    const errors = {}

    return errors
  }

  const isFormValid = () => {
    const validationErrors = validateForm(formData);
    return Object.keys(validationErrors).length === 0 ;
  }

  return (
    <DashboardLayout activeMenu="post-job">JobPostingForm</DashboardLayout>
  )
}

export default JobPostingForm