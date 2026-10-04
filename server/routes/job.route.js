import express from 'express';
import { createJob, getJobs , getJobById, updateJob, deleteJob, getJobsEmployer, toggleCloseJob } from '../controllers/job.controller.js';
import { protect, optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/create', protect, createJob);
router.get('/' , optionalAuth , getJobs);
router.get('/get-jobs-employer', protect , getJobsEmployer);
router.route('/:id').get(optionalAuth, getJobById).put(protect, updateJob).delete(protect, deleteJob);
router.put('/:id/toggle-close' , protect , toggleCloseJob);




export default router;
