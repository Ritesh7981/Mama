import express from 'express';
import userRoutes from './user.routes.js';
import phoneRoutes from './phone.routes.js';
import selloutRoutes from './sellout.routes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/phone', phoneRoutes);
router.use('/delete', selloutRoutes);
router.use('/sellouts', selloutRoutes);

router.post('/login', userRoutes);

export default router;