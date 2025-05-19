const CarModel = require('../models/carModel.js');
const joi = require('joi');


const carSchema = joi.object({
    brand: joi.string().required(),
    model: joi.string().required(),
    year: joi.number().integer().min(1947).max(new Date().getFullYear()).required(),
    color: joi.string().required(),
    image: joi.string().required(),
    price_per_day: joi.number().positive().required(),
    status: joi.string().valid('available', 'rented', 'unavailable').required(),
    type: joi.string().valid('sedan', 'suv', 'hatchback', 'convertible', 'truck', 'van').required(),
    registration_number: joi.string().required(),
    location_id: joi.number().integer().required()
});

exports.getAllCars = async (req, res) => {
    try {
        const cars = await CarModel.getAllCars();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getCarById = async (req, res) => {
    try {
        const car = await CarModel.getCarById(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateRentalstatus = async (req, res) => {
    try {
        const affectedRows = await CarModel.updateRentalstatus(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
