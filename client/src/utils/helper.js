// validation functions
export const validateEmail = (email) => {
    if(!email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(email)) return 'Please inter a valid email address';
    return '';
  }
