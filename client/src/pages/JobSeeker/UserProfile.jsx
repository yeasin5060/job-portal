import {useState , useEffect} from 'react'
import {Save , X , Trash2} from 'lucide-react'
import axiosInstance from '../../utils/axiosinstance'
import { useAuth } from '../../context/AuthContext'
import { API_PATHS } from '../../utils/apiPaths'
import uploadImage from '../../utils/uploadImage'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'


const UserProfile = () => {

  const {user , updateUser } = useAuth();

  const [profileData , setProfileData] = useState({
    name : user?.name || "",
    email : user?.email || "",
    avatar : user?.avatar || "",
    resume : user?.resume || "",
  });

  const [formData , setFormData ] = useState({...profileData});
  const [uploading , setUploading ] = useState({avatar : false , logo : false});
  const [saving , setSaving ] = useState(false);

  const handleInputChange = (field , value) => {
    setFormData((prev) => ({
      ...prev , [field] : value
    }));
  };

  const handleImageUpload = async (file , type) => {};

  const handleImageChange = (e , type) => {
    const file = e.target.files[0];

    if(file) {
      const previewUrl = URL.createObjectURL(file);
      handleInputChange(type , previewUrl);

      handleImageUpload(type , file);
    }
  };

  const handleSave = async () => {

  };

  const handleCancel =  () => {
    setFormData({...profileData})
  };

  const DeleteResume =  async () => {
    setSaving(true);
    try {
      const response = await axiosInstance.delete(API_PATHS.AUTH.DELETE_RESUME, {resumeUrl : user.resume || ""});

      if(response.status === 200) {
        toast.success("Resume Delete successfully");
        setProfileData({...profileData , resume : ""});
        updateUser({...profileData , remuse : ""});
      }
    } catch (error) {
      console.error("Profile error failed:", error);
    }finally {
      setSaving(false)
    }
  }

  useEffect (() => {
    const userData = {
      name : user?.name || "",
      email : user?.email || "",
      avatar : user?.avatar || "",
      resume : user?.resume || "",
    }
    setProfileData({...userData});
    setFormData({...userData})

    return () => {};
  },[user])

  return (
    <div>UserProfile</div>
  )
}

export default UserProfile