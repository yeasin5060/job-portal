import express from 'express';
import { createJob, getJobds , getJobById, updateJob, deleteJob, getJobsEmployer, toggleCloseJob } from '../controllers/job.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/create', protect, createJob);
router.get('/' , protect , getJobds);
router.get('/get-jobs-employer', protect , getJobsEmployer);
router.route('/:id').get(protect, getJobById).put(protect, updateJob).delete(protect, deleteJob);
router.put('/:id/toggle-close' , protect , toggleCloseJob);




export default router;
