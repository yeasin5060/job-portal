import express from 'express';
import { updateProfile, deleteResume , getPublicProfile } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

protect


const router = express.Router();

router.put('/profile' , protect , updateProfile);
router.post('/resume' , protect , deleteResume);
router.get('/:id', getPublicProfile);



export default router;
