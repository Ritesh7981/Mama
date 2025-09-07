import Phone from '../Model/Phone.model.js';

export const createPhone = async (req, res) => {
    try {
        const phone = await Phone.create(req.body);
        res.status(200).json(phone);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllPhones = async (req, res) => {
    try {
        const allPhone = await Phone.find();
        res.status(200).json(allPhone);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getNeedToBuyPhones = async (req, res) => {
    try {
        const phone = await Phone.find({ quantity: { $lt: 5 } });
        res.status(200).json(phone);
    } catch (error) {
        res.status(500).json(error);
    }
};
export const updatePhone = async (req, res) => {
    try {
        const phone = await Phone.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(phone);
    } catch (error) {
        res.status(500).json(error);
    }
}
