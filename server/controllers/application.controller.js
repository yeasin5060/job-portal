
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Apply to a job
export const applyToJob = async (req, res) => {
    try {
        if (req.user.role !== "jobseeker") {
            return res.status(403).json({
                message: "Only job seeker can apply",
            });
        }

        const existing = await Application.findOne({
            job: req.params.jobId,
            applicant: req.user._id,
        });

        if (existing) {
            return res.status(403).json({
                message: "Already applied to this job",
            });
        }

        const application = await Application.create({
            job: req.params.jobId,
            applicant: req.user._id,
            resume: req.user.resume,
        });

        res.status(201).json(application);

    } catch (error) {
        console.error("Apply to job error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};


// Get logged-in user's applications
export const getMyApplications = async (req, res) => {
    try {
        const apps = await Application.find({
            applicant: req.user._id,
        })
            .populate(
                "job",
                "title company location type"
            )
            .sort({ createdAt: -1 });

        res.status(200).json(apps);

    } catch (error) {
        console.error("Get my applications error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

export const getApplicantForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        if (job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to view applications",
            });
        }

        const applications = await Application.find({
            job: req.params.jobId,
        })
            .populate("job", "title category location type")
            .populate("applicant", "name email avatar resume")
            .sort({ createdAt: -1 });

        res.status(200).json(applications);

    } catch (error) {
        console.error("Get applicant for job error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};


// Get application by ID
export const getApplicationById = async (req, res) => {
    try {
        const app = await Application.findById(
            req.params.id
        )
            .populate(
                "job",
                "title company location type"
            )
            .populate(
                "applicant",
                "name email avatar resume"
            );

        if (!app) {
            return res.status(404).json({
                message: "Application not found",
                id: req.params.id,
            });
        }

        const isApplicant =
            app.applicant?._id.toString() ===
            req.user._id.toString();

        const isEmployer =
            app.job?.company?.toString() ===
            req.user._id.toString();

        if (!isApplicant && !isEmployer) {
            return res.status(403).json({
                message:
                    "Not authorized to view this application",
            });
        }

        res.status(200).json(app);

    } catch (error) {
        console.error(
            "Get application by ID error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};


// Update application status
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Applied",
            "In Review",
            "Rejected",
            "Accepted",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid application status",
            });
        }

        const app = await Application.findById(
            req.params.id
        ).populate("job");

        if (!app) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        if (
            app.job.company.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message:
                    "Not authorized to update this application",
            });
        }

        app.status = status;

        await app.save();

        res.status(200).json({
            message:
                "Application status updated successfully",
            status: app.status,
        });

    } catch (error) {
        console.error(
            "Update status error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};

