import express from 'express';
import { applyToJob, getMyApplications, getApplicantForJob, getApplicationById , updateStatus } from '../controllers/application.controller.js';
import { protect } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/:jobId', protect, applyToJob);
router.get('/my' , protect , getMyApplications);
router.get('/job/:jobId' , protect , getApplicantForJob);
router.get('/:id' , protect , getApplicationById);
router.put('/:id/status' , protect , updateStatus);

export default router;