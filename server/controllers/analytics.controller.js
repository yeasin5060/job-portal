import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";


const getTrend = (current , previous) => {
    if(previous === 0) return current > 0 ? 100 : 0 ;
    return Math.round(((current - previous) / previous) * 100);
};

export const getEmployerAnalytics = async (req , res) => {
    try {
        if(req.user.role !== "employer") {
            return res.status(403).json({message : "Access denied"});
        }

        const companyId = req.user._id;

        const now = new Date();
        const last7Days = new Date(now);
        last7Days.setDate(now.getDate() - 7);
        const prev7Days = new Date();
        prev7Days.setDate(now.getDate() - 14);

        //==== counts ====
        const totalActiveJobs = await Job.countDocuments({company : companyId, isClosed : false});
        const jobs = await Job.find({company : companyId}).select('_id').lean();
        const jobIds = jobs.map(job => job._id);

        const totalApplications = await Application.countDocuments({job : {$in : jobIds}});
        const totalHired = await Application.countDocuments({
            job : {$in : jobIds},
            status : "Accepted"
        });


        //=== trends
        // active jobs post trens
        const activeJobLast7 = await Job.countDocuments({
            company : companyId,
            createdAt : {$gte : last7Days, $lte : now},
        });

        const activeJobPrev7 = await Job.countDocuments({
            company : companyId,
            createdAt : {$gte : prev7Days, $lte : last7Days},
        });

        const activeJobTrand = getTrend( activeJobLast7 , activeJobPrev7);

        //application trend 
        const applicationLast7  = await Application.countDocuments({
            job : {$in : jobIds},
            createdAt : {$gte : last7Days, $lte : now},
        });

        const applicationPrev7 = await Application.countDocuments({
            job : {$in : jobIds},
            createdAt : {$gte : prev7Days, $lte : last7Days},
        });

        const applicantTrend = getTrend(applicationLast7 , applicationPrev7);

        const hiredLast7 = await Application.countDocuments({
            job : {$in : jobIds},
            status : "Accepted",
            createdAt : {$gte : last7Days, $lte : now},
        });

        const hiredPrev7 = await Application.countDocuments({
            job : {$in : jobIds},
            status : "Accepted",
            createdAt : {$gte : prev7Days, $lte : last7Days},
        });

        const hiredTrend = getTrend(hiredLast7 , hiredPrev7);

        // === data ===
        const recendJobs = await Job.find({company : companyId}).sort({createdAt : -1}).limit(5).select("title location type createdAt isclosed");

        const recentApllications = await Application.find({
            job : {$in : jobIds}
        }).sort({createdAt : -1}).limit('5').populate("applicant" , "name email avatar").populate("job", "title");

        res.json({
            counts : {
                totalActiveJobs,
                totalApplications,
                totalHired,
                trends : {
                    activeJobs : activeJobTrand,
                    totalApplications : applicantTrend,
                    totalHired : hiredTrend,

                }   
            },
            data : {
                recendJobs,
                recentApllications
            }
        });

    } catch (error) {
        res.status(500).json({message : error.message}); 
    }
}