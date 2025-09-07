import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './Db/Db.js';
import userRoutes from './routes/user.routes.js';
import phoneRoutes from './routes/phone.routes.js';
import selloutRoutes from './routes/sellout.routes.js';
import authRoutes from './routes/auth.routes.js';
import { verifyToken } from './controllers/user.controller.js';
import { getNeedToBuyPhones } from './controllers/phone.controller.js';

dotenv.config();

const app = express();

app.use(cors({ origin: 'https://mama-frontend-theta.vercel.app' }));
app.use(express.json());

connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/verify-token', verifyToken);
app.get('/api/threehold', getNeedToBuyPhones);
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/phone', phoneRoutes);
app.use('/api/delete', selloutRoutes);
app.use('/api/sellouts', selloutRoutes);
app.use('/api/needtobuy', phoneRoutes);

app.listen(8080, () => {
    console.log(`Listening on port http://localhost:8080`);
});