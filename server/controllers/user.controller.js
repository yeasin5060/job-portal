import fs from 'fs';
import path from 'path';
import { User } from '../models/user.model.js';


// update user profile  {name , avatar , company details}
export const updateProfile = async(req , res) => {
    try {

        const {name , avatar , companyName , companyDescription , companyLogo , resume} = req.body;
        
        const user = await User.findById(req.user._id);

        if(!user) {
            return res.status(404).json({message : "User not found"});
        }

        user.name = name || user.name;
        user.avatar = avatar || user.avatar;
        user.resume = resume || user.resume;

        if(user.role === 'employer') {
            user.companyName = companyName || user.companyName;
            user.companyDescription = companyDescription || user.companyDescription;
            user.companyLogo = companyLogo || user.companyLogo;
        }

        await user.save();

        res.status(200).json( {
            _id : user._id,
            name : user.name,
            avatar : user.avatar ,
            role : user.role,
            companyName  : user.companyName,
            companyDescription : user.companyDescription,
            companyLogo : user.companyLogo,
            resume : user.resume || '' ,
            message : "User profile update successfully"
        });

    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


// delete resume file {jobseeker only}
export const deleteResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    if (!resumeUrl) {
      return res.status(400).json({
        message: "Resume URL is required",
      });
    }

    // Extract file name from URL
    const fileName = resumeUrl.split("/").pop();

    if (!fileName) {
      return res.status(400).json({
        message: "Invalid resume URL",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "jobseeker") {
      return res.status(403).json({
        message: "Only jobseeker can delete resume",
      });
    }

    // uploads folder path
    const filePath = path.join(
      process.cwd(),
      "uploads",
      fileName
    );

    console.log("Resume URL:", resumeUrl);
    console.log("File name:", fileName);
    console.log("File path:", filePath);

    // Delete physical file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Resume file deleted:", filePath);
    } else {
      console.log("Resume file not found:", filePath);
    }

    // Remove resume URL from database
    user.resume = "";

    await user.save();

    return res.status(200).json({
      message: "Resume deleted successfully",
    });

  } catch (error) {
    console.error("Delete resume error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
//get user public profile
export const getPublicProfile = async(req , res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if(!user) {
            return res.status(404).json({message : "User not found"});
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}