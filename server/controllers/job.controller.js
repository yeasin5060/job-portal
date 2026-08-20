import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { SavedJob } from "../models/savedJob.model.js";
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
            'company',
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
        const {userId} = req.query;

        const job = await Job.findById(req.params.id).populate("company" , "name companyName companyLogo");

        if(!job) {
            return res.status(404).json({message : "Job not found"});
        }

        let applicationStatus = [];

        if(userId) {
            const application = await Application.findOne({
                job : job._id,
                applicant : userId
            }).select('status');

            if(application) {
                applicationStatus = application.status;
            }
        }

        res.json({
            ...job.toObject(),
            applicationStatus
        });
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


export const updateJob = async (req , res) => {
    try {
        const job = await Job.findById(req.params.id);

        if(!job) {
            return res.status(404).json({message : "Job not found"});
        }

        if(job.company.toString() !== req.user._id.toString()) {
            return resizeBy.status(403).json({message : "Not authorized to update this job"});
        }

        Object.assign(job , req.body);

        const update = await job.save();

        res.json({message : "Job update successfully" , update});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


export const deleteJob = async (req , res) => {
    try {
        const job = await Job.findById(req.params.id);

        if(!job) {
            return res.status(404).json({message : "Job not found"});
        }

         if(job.company.toString() !== req.user._id.toString()) {
            return resizeBy.status(403).json({message : "Not authorized to delete this job"});
        }

        await job.deleteOne();

        res.json({message : "Job delete successfully"});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


export const toggleCloseJob = async (req , res) => {
    try {
        const job = await Job.findById(req.params.id);

        if(!job) {
            return res.status(404).json({message : "Job not found"});
        }

         if(job.company.toString() !== req.user._id.toString()) {
            return resizeBy.status(403).json({message : "Not authorized to close this job"});
        }

        job.isClosed = !job.isClosed;

        await job.save();

        res.json({message : "Job market is closed"})
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

export const getJobsEmployer = async (req , res) => {
    try {
        const userId = req.user._id;
        const {role} = req.user;

        if(role !== "employer") {
            return res.status(403).json({message : "Access denied"});
        }

        // get all jobs posted by employer
        const jobs = await Job.find({company : userId}).populate("company" , "name companyName companyLogo").lean(); //lean() makes jobs plain js uobjects so we can add new field

        //count application for eacj job
        const jobsWithApplicationCount = await Promise.all(
            jobs.map(async (job) => {
                const applicatioCount = await Application.countDocuments({
                    job : job._id
                });
                return {
                    ...job,
                    applicatioCount,
                };
            })
        );

        res.status(200).json(jobsWithApplicationCount);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

