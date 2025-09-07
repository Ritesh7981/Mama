import express from 'express';
import { 
    createSellout, 
    getAllSellouts 
} from '../controllers/sellout.controller.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createSellout);
router.get('/', getAllSellouts);

export default router;