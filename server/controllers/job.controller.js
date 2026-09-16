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


export const getJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      category,
      type,
      minSalary,
      maxSalary,
      experience,
      remoteOnly,
      userId,
      user,
    } = req.query;

    const query = {
      isClosed: false,
    };

    // =========================
    // Keyword Search
    // =========================
    if (keyword?.trim()) {
      query.$or = [
        {
          title: {
            $regex: keyword.trim(),
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword.trim(),
            $options: "i",
          },
        },
      ];
    }

    // =========================
    // Location
    // =========================
    if (location?.trim()) {
      query.location = {
        $regex: location.trim(),
        $options: "i",
      };
    }

    // =========================
    // Category
    // =========================
    if (category?.trim()) {
      query.category = category;
    }

    // =========================
    // Job Type
    // =========================
    if (type?.trim()) {
      query.type = type;
    }

    // =========================
    // Experience
    // =========================
    if (experience?.trim()) {
      query.experience = experience;
    }

    // =========================
    // Salary
    // =========================
    if (minSalary || maxSalary) {
      query.$and = [];

      if (minSalary) {
        query.$and.push({
          salaryMax: {
            $gte: Number(minSalary),
          },
        });
      }

      if (maxSalary) {
        query.$and.push({
          salaryMin: {
            $lte: Number(maxSalary),
          },
        });
      }

      if (query.$and.length === 0) {
        delete query.$and;
      }
    }

    // =========================
    // Remote Only
    // =========================
    if (remoteOnly === "true") {
      query.location = {
        $regex: "remote",
        $options: "i",
      };
    }

    console.log("Job Query:", query);

    const jobs = await Job.find(query)
      .populate(
        "company",
        "name companyName companyLogo"
      )
      .sort({ createdAt: -1 });

    // =========================
    // User ID
    // =========================
    const currentUserId = userId || user;

    let savedJobIds = [];
    let appliedJobStatusMap = {};

    if (currentUserId) {
      // Saved Jobs
      const savedJobs = await SavedJob.find({
        jobseeker: currentUserId,
      }).select("job");

      savedJobIds = savedJobs.map((saved) =>
        String(saved.job)
      );

      // Applications
      const applications = await Application.find({
        applicant: currentUserId,
      }).select("job status");

      applications.forEach((application) => {
        appliedJobStatusMap[String(application.job)] =
          application.status;
      });
    }

    // =========================
    // Add Extra Information
    // =========================
    const jobsWithExtras = jobs.map((job) => {
      const jobIdStr = String(job._id);

      return {
        ...job.toObject(),

        isSaved: savedJobIds.includes(jobIdStr),

        applicationStatus:
          appliedJobStatusMap[jobIdStr] || null,
      };
    });

    res.status(200).json(jobsWithExtras);
  } catch (error) {
    console.error("Get jobs error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};



export const getJobById = async (req, res) => {
    try {
        const { userId } = req.query;

        const job = await Job.findById(req.params.id).populate(
            "company",
            "name companyName companyLogo"
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        let applicationStatus = null;

        if (userId) {
            const application = await Application.findOne({
                job: job._id,
                applicant: userId,
            }).select("status");

            if (application) {
                applicationStatus = application.status;
            }
        }

        res.status(200).json({
            ...job.toObject(),
            applicationStatus,
        });
    } catch (error) {
        console.error("Get job by ID error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateJob = async (req , res) => {
    try {
        const job = await Job.findById(req.params.id);

        if(!job) {
            return res.status(404).json({message : "Job not found"});
        }

        if(job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({message : "Not authorized to update this job"});
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
            return res.status(403).json({message : "Not authorized to delete this job"});
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
            return res.status(403).json({message : "Not authorized to close this job"});
        }

        job.isClosed = !job.isClosed;

        await job.save();

        res.json({message : "Job market is closed"})
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

export const getJobsEmployer = async (req, res) => {
    try {
        const userId = req.user._id;
        const { role } = req.user;

        if (role !== "employer") {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        // Get all jobs posted by employer
        const jobs = await Job.find({
            company: userId,
        })
            .populate(
                "company",
                "name companyName companyLogo"
            )
            .lean();

        // Count applications for each job
        const jobsWithApplicationCount = await Promise.all(
            jobs.map(async (job) => {
                const applicationCount =
                    await Application.countDocuments({
                        job: job._id,
                    });

                return {
                    ...job,
                    applicationCount,
                };
            })
        );

        res.status(200).json(jobsWithApplicationCount);
    } catch (error) {
        console.error("Get employer jobs error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

