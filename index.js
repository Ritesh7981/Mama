import express from 'express';
import Phone from './Model/Phone.model.js';
import connect from './Db/Db.js';
import Delete from './Model/Delete.model.js';
import cors from 'cors';
const app = express();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
connect();
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.post('/api/phone', async (req, res) => {
    try {
        const phone = await Phone.create(req.body);
        res.status(200).json(phone);
    } catch (error) {
        res.status(500).json(error);
    }
})
app.get('/api/phone', async (req, res) => {
    try {
        const allPhone = await Phone.find()
        res.status(200).json(allPhone);
    } catch (error) {
        res.status(500).json(error);
    }
})
app.post('/api/delete', async (req, res) => {
    try {
        console.log(req.body);
        const deletePhone = await Delete.create(req.body);
        const phone = await Phone.findById(req.body.id);
        const data = phone.quantity-req.body.quantity
        if (phone) {
            const allPhone = await Phone.findByIdAndUpdate(req.body.id, {
                quantity: data
            })
            res.status(200).json({deletePhone,allPhone});
        }
        if (allPhone) {
            res.status(200).json("sfedgfg");
        } else {
            res.status(404).json({ message: 'Phone not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})
app.get('/api/sellouts', async (req, res) => {
    try {
        const allDeletePhone = await Delete.find();
        res.status(200).json(allDeletePhone);
    } catch (error) {
        res.status(500).json(error);
    }
})
app.get('/api/needtobuy', async (req, res) => {
    try {
        const phone = await Phone.find({quantity: { $lt: 60 } })
        res.status(200).json(phone);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.listen(8080, () => {
    console.log(`Listening on port http://localhost:8080`);
});
