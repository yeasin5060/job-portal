import fs from 'fs';
import path from 'path';
import { User } from '../models/user.model.js';

export const updateProfile = async(req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

export const deleteResume = async(req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

export const getPublicProfile = async(req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}