import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { SavedJob } from "../models/savedJob.model";
import { User } from "../models/user.model.js";

// Crate a new job  (Employer Only)
export const createJob = async (req , res) => {
    try {
        if(req.user.role !== 'employer') {
            return res.status(403).json({message : "Only employers can job post"});
        }

        const job = await Job.create({...req.body, company : req.user._id});

        res.status(201).json({ message : "Job create successfully" , job});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


export const getJobds = async (req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}



export const getJobById = async (req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


export const updateJob = async (req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


export const deleteJob = async (req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


export const toggleCloseJob = async (req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

export const getJobsEmployer = async (req , res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

