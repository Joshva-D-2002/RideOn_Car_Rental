const e = require('express');
const rentalModel = require('../models/rentalModel');

const joi = require('joi');

const rentalSchema = joi.object({
    user_id: joi.number().required(),
    car_id: joi.number().required(),
    start_date: joi.date().required(),
    end_date: joi.date().required(),
    total_price: joi.number().required(),
    discount_id: joi.number().optional(),
    status: joi.string().valid('active', 'completed', 'cancelled').required(),
    pickup_location_id: joi.number().required(),
    dropoff_location_id: joi.number().required(),
})

exports.getAllRentals = async (req, res) => {
    try {
        const rentals = await rentalModel.getAllRentals();
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRentalById = async (req, res) => {
    try {
        const rental = await rentalModel.getRentalById(req.params.id);
        if (!rental) {
            return res.status(404).json({ error: 'Rental not found' });
        }
        res.json(rental);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

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

exports.updateRentalById = async (req, res) => {
    try {
        const { error } = rentalSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const affectedRows = await rentalModel.updateRentalById(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Rental not found' });
        }
        res.json({ message: 'Rental updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
