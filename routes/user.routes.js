import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getAllUsers, 
    getUserProfile, 
    verifyToken
} from '../controllers/user.controller.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/', authenticateToken, getUserProfile);
// router.get('/', verifyToken);

// router.get('/', authenticateToken, authorizeRole('admin'), getAllUsers);

export default router;