import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"

    // apply to a job
export const applyToJob = async (req, res) => {
    try {
        if(req.user.role !== "jobseeker") {
            return res.satus(403).json({message : "Only job seeker can apply"});
        }

        const existing = await Application.findOne({
            job : req.params.jobId,
            applicant : req.user._id,
        });

        if(existing) {
            return res.status(403).json({mesage : "Already applied to this job"});
        }

        const application = await Application.create({
            job : req.params.jobId,
            applicant : req.user._id,
            resume : req.user.resume
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

//get logged-in user's application
export const getMyApplications = async (req, res) => {
    try {
        const apps = await Application.find({applicant : req.user._id}).populate('job', 'title company location type').sort({createdAt : -1});

        res.json(apps)
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// get all application for a job (Employer)
export const getApplicantForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if(!job) {
            return res.status(404).json({message : "Job not found"});
        }

        if(job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({message : "Not authorized to view application"});
        }

        const applications = await Application.find({job : req.params.jobId}).populate('job',"title category lication type").populate("applicant","name email avatar resume");

        res.json(applications);
    } catch (error) {
       res.status(500).json({message : error.message});  
    }
}

export const getApplicationById = async (req, res) => {
    try {
        const app = await Application.findById(req.user.id).populate('job',"title").populate("applicant","name email avatar resume");

        if(!app) {
            return res.status(404).json({message : "Application not found" , id : req.params.id});
        }

        const isOwner = app.applicant._id.toString() ===  req.user._id.toString() || app.job.company ===  req.user._id.toString();

        if(!isOwner) {
            return res.status(404).json({message : "Not authorized to view this application"});
        }

        res.json(app);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

export const updateStatus = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message : error.message}); 
    }
}