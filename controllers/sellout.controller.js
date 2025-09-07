import Delete from '../Model/Delete.model.js';
import Phone from '../Model/Phone.model.js';

export const createSellout = async (req, res) => {
    try {
        console.log(req.body);
        const deletePhone = await Delete.create(req.body);
        const phone = await Phone.findById(req.body.id);
        
        if (!phone) {
            return res.status(404).json({ message: 'Phone not found' });
        }
        
        const data = phone.quantity - req.body.quantity;
        
        const updatedPhone = await Phone.findByIdAndUpdate(
            req.body.id, 
            { quantity: data },
            { new: true }
        );
        
        res.status(200).json({ deletePhone, updatedPhone });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllSellouts = async (req, res) => {
    try {
        const allDeletePhone = await Delete.find();
        res.status(200).json(allDeletePhone);
    } catch (error) {
        res.status(500).json(error);
    }
};