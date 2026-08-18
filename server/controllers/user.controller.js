import fs from 'fs';
import path from 'path';
import { User } from '../models/user.model.js';


// update user profile  {name , avatar , company details}
export const updateProfile = async(req , res) => {
    try {
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


//delete resume file {jobseeker only}
export const deleteResume = async(req , res) => {
    try {
        const {resumeUrl} = req.body; //expecr resumeUrl to be the Url of the resume

        //Extract file name from the Url
        const fileName = resumeUrl?.split('/')?.pop();

        const user = await User.findById(req.user._id);

        if(!user) {
            return res.status(404).json({message : "User not found"});
        }

        if(user.role !== 'jobseeker') {
            return res.status(403).json({message : "Only jobseeker can delete resume"});
        }

        //construct the full file path
        const filePath = path.join(__dirname, '../uploads', fileName);

        //check if the file exists and than delete
        if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        user.resume = '';

        await user.save();

        res.json({message : 'Resume delete successfully'})

    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

//get user public profile
export const getPublicProfile = async(req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}