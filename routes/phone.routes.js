import express from 'express';
import { 
    createPhone, 
    getAllPhones, 
    getNeedToBuyPhones 
} from '../controllers/phone.controller.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, authorizeRole('admin'), createPhone);
router.get('/', getAllPhones);
router.get('/', getNeedToBuyPhones);

export default router;