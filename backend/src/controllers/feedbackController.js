const feedbackModel = require('../models/feedbackModel');
const joi = require('joi');

const feedbackSchema = joi.object({
    rental_id: joi.number().required(),
    user_id: joi.number().required(),
    rating: joi.number().min(1).max(5).required(),
    title: joi.string().required(),
    comment: joi.string().required(),
})

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await feedbackModel.getAllFeedbacks();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addFeedback = async (req, res) => {
    try {
        const { error } = feedbackSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const feedbackId = await feedbackModel.addFeedback(req.body);
        res.status(201).json({ message: 'Feedback added successfully', feedbackId });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}