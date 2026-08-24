import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { saveJob, unsaveJob , getMySavedJobs } from '../controllers/savedJobs.controller.js';


const router = express.Router();

router.post('/:jobId', protect , saveJob);
router.delete('/:jobId', protect , unsaveJob);
router.get('/my', protect , getMySavedJobs);


export default router;