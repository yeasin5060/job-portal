import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { saveJob, unsaveJob , getMySavedJobs } from '../controllers/savedJobs.controller.js';


const router = express.Router();

router.post('/:jobId', protect , saveJob);
router.post('/:jobId', protect , unsaveJob);
router.post('/my', protect , getMySavedJobs);


export default router;