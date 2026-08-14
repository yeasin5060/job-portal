import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

// generate token

const generateToken =  (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}
 
//@desc Register new user
export const register = async (req , res) => {
    try {
        const {name , email , password , avatar , role} = req.body;
        const userExists = await User.findOne({email});

        if(userExists) {
            return res.status(401).json({message : "User already exists"})
        }

        const user = await User.create({
            name , email , password , avatar , role
        });

        res.status(200).json( {
            _id : user._id,
            name : user.name,
            email : user.email,
            avatar : user.avatar,
            role : user.role,
            token : generateToken(user._id),
            companyName  : user.companyName || '',
            companyDescription : user.companyDescription || '',
            companyLogo : user.companyLogo || '',
            resume : user.resume || ''
        });
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

//@desc Login user
export const login = async (req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

//@desc Get logged-in user
export const getMe = async (req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}