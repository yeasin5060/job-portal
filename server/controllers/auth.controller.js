import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

// generate token

const generateToken =  (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}
 
//@desc Register new user
export const register = async (req , res) => {
    try {
        
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