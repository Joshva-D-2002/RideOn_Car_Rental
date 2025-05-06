const CarModel = require('../models/carModel.js');
const joi = require('joi');


const carSchema = joi.object({
    brand: joi.string().required(),
    model: joi.string().required(),
    year: joi.number().integer().min(1947).max(new Date().getFullYear()).required(),
    color: joi.string().required(),
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

exports.addCar = async (req, res) => {
    try {
        const { error } = carSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const carId = await CarModel.addCar(req.body);
        res.status(201).json({ message: 'Car added successfully', carId });

    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateCarById = async (req, res) => {
    try {
        const { error } = carSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const affectedRows = await CarModel.updateCarById(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });

    }
};

exports.deleteCarById = async (req, res) => {
    try {
        const affectedRows = await CarModel.deleteCarById(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addFeaturesToCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const featureIds = req.body.feature_ids;
        if (!Array.isArray(featureIds) || featureIds.length === 0) {
            return res.status(400).json({ error: 'Feature IDs must be a non-empty array' });
        }
        const result = await CarModel.addFeaturesToCar(carId, featureIds);
        res.json({ message: 'Features added to car successfully', insertedCount: result.length });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.removeFeaturesFromCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const featureIds = req.params.featureIds;
        const result = await CarModel.removeFeaturesFromCar(carId, featureIds);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Feature not found for this car' });
        }
        res.json({ message: 'Feature removed from car successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getCarImagesById = async (req, res) => {
    try {
        const carId = req.params.id;
        const images = await CarModel.getCarImagesById(carId);
        if (!images) {
            return res.status(404).json({ error: 'Images not Uploaded Yet' });
        }
        res.json(images);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.uploadCarImage = async (req, res) => {
    try {
        const carId = req.params.id;
        const imageUrl = req.body.image_url;
        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }
        const result = await CarModel.uploadCarImage(carId, imageUrl);
        res.json({ message: 'Image uploaded successfully', imageUrl: result.insertId });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteCarImage = async (req, res) => {
    try {
        const carId = req.params.id;
        const imageUrl = req.params.imgurl;
        const result = await CarModel.deleteCarImage(carId, imageUrl);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
