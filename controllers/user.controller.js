import User from '../Model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: hashedPassword
        });
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            "akV4y*hWOsdbfhhjbh",
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );
        res.status(200).json({ 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role 
            }, 
            token 
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            "akV4y*hWOsdbfhhjbh",
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );
        
        res.status(200).json({ 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role 
            }, 
            token 
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find().select('-password');
        res.status(200).json(allUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const verifyToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing or invalid format' });
        }
        
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, "akV4y*hWOsdbfhhjbh");
        res.status(200).json({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired', expiredAt: error.expiredAt });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json(error);
    }
};