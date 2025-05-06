const Location = require('../models/locationModel');

const joi = require('joi');

const locationSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    pin_code: joi.string().length(6).required(),
    country: joi.string().required(),
    phone_number: joi.string().pattern(/^[0-9]{10}$/).required()
   
})

exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.getAllLocations();
        res.json(locations);
    }
    catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.getLocationById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        console.error('Error fetching location:', error);
        throw error;
    }
}
exports.addLocation = async (req, res) => {
    try {
        const { error } = locationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const locationId = await Location.addLocation(req.body);
        res.status(201).json({ message: 'Location added successfully', locationId });

    } catch (error) {
        console.error('Error adding location:', error);
        throw error;
    }
}
exports.updateLocationById = async (req, res) => {
    try {
        const { error } = locationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const affectedRows = await Location.updateLocationById(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json({ message: 'Location updated successfully' });
    } catch (error) {
        console.error('Error updating location:', error);
        throw error;
    }
}

exports.deleteLocationById = async (req, res) => {
    try {
        const affectedRows = await Location.deleteLocationById(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        console.error('Error deleting location:', error);
        throw error;
    }
}

