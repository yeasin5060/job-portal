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


export const getJobs = async (req , res) => {

    const {
        keyword,
        location,
        category,
        type,
        minSalary,
        maxSalary,
        userId
    } = req.query;

    const query = {
        isClosed : false,
        ...(keyword && {title : { $regex : keyword, $options : 'i' }}),
        ...(location && {location : { $regex : location, $options : 'i' }}),
        ...(keyword && {category }),
        ...(type && { type }),
    };

    if(minSalary || maxSalary) {
        query.$and = [];

        if(minSalary) {
            query.$and.push({salaryMax : {$gte : Number(minSalary)}});
        }

        if(maxSalary) {
            query.$and.push({salaryMin : {$gte : Number(maxSalary)}});
        }

        if( query.$and.length === 0 ) {
            delete query.$and;
        }
    }
    try {
        const jobs = await Job.find(query).populate(
            'companyName',
            'name companyName companyLogo'
        );

        let savedJobIds = [];
        let appliedJobStatusMap = [];

        if(userId) {
            //saved job
            const savedJobs = await SavedJob.find({jobseeker : userId}).select('job');
            savedJobIds = savedJobs.map((s) => String(s.job));

             //saved job
            const applications = await Application.find({applicant : userId}).select('job status');
            applications.forEach((app) => {
                appliedJobStatusMap[String(app.job)] = app.status;
            });
        }


        const jobsWithExtras = jobs.map((job)=> {
            const jobIdStr = String(job._id);

            return {
                ...job.toObject(),
                isSaved : savedJobIds.includes(jobIdStr),
                applicationStatus : appliedJobStatusMap[jobIdStr] || null
            };
        });

        res.json(jobsWithExtras);

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

