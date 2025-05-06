const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authModel = require('../models/authModel');
const joi = require('joi');
dotenv.config();

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.user_type }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

const userSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    user_type: joi.string().valid('admin', 'user').required(),
    phone_number: joi.string().pattern(/^[0-9]{10}$/).required()
})

const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

exports.registerUser = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const userId = await authModel.registerUser(req.body);
        const token = generateToken(req.body);
        res.status(201).json({ message: "User Registered Successfully", user_id: userId, token: 'Bearer ' + token });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { error } = userLoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const user = await authModel.loginUser(req.body);

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = generateToken(user);
        res.status(200).json({
            message: 'User logged in successfully',
            token: 'Bearer ' + token
        });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginAdminUser = async (req, res) => {
    try {
        const { error } = userLoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const user = await authModel.loginAdminUser(req.body);

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = generateToken(user);
        res.status(200).json({
            message: 'Admin logged in successfully',
            token: 'Bearer ' + token
        });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
