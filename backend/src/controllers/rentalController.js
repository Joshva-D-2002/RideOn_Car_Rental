const e = require('express');
const rentalModel = require('../models/rentalModel.js');

const joi = require('joi');

const rentalSchema = joi.object({
    user_id: joi.number().required(),
    car_id: joi.number().required(),
    start_date: joi.date().iso().required(),
    end_date: joi.date().iso().greater(joi.ref('start_date')).required(),
    total_price: joi.number().required(),
    discount_id: joi.number().optional(),
    status: joi.string().valid('active', 'completed', 'canceled').required(),
})

exports.addRental = async (req, res) => {
    try {
        const { error } = rentalSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const rentalId = await rentalModel.addRental(req.body);
        res.status(201).json({ message: 'Rental added successfully', rentalId });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getRentalsByUser = async (req, res) => {
    try {
        const rental = await rentalModel.getRentalsByUser(req.params.id);
        if (!rental) {
            return res.status(404).json({ error: 'Rentals not found' });
        }
        res.json(rental);
    }
    catch {
        res.status(500).json({ error: 'Internal server error' });
    }
}
