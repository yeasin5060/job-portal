import { SavedJob } from "../models/savedJob.model.js";


// save a job

export const saveJob = async (req , res) => {
    try {
        const exists = await SavedJob.findOne({job : req.params.jobId , jobseeker : req.user._id});

        if(exists) {
            return res.status(403).json({message : "Job already saved"});
        }

        const saved = await SavedJob.create({job : req.params.jobId , jobseeker : req.user._id});

        res.status(200).json(saved);

    } catch (error) {
        res.status(500).json({message :  "Failed to save job" , error : error.message});
    }
}

export const unsaveJob = async (req , res) => {
    try {
        await SavedJob.findOneAndDelete({job : req.params.jobId , jobseeker : req.user._id});

        res.json({message : "Job remove for saved list"});

    } catch (error) {
        res.status(500).json({message :  "Failed to remove saved job" , error : error.message});
    }
}

export const getMySavedJobs = async (req , res) => {
    try {
        const savedJobs = await SavedJob.find({jobseeker : req.user._id}).populate({
            path : "job",
            populate : {
                path : "company",
                select : "name companyName companyLogo"
            },
        });

        res.json(savedJobs);
        
    } catch (error) {
        res.status(500).json({message :"Failed to fetch saved jobs", error : error.message});
    }
}