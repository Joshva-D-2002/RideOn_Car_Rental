const featureModel = require('../models/featureModel');
const joi = require('joi');

const featureSchema = joi.object({
    feature_name: joi.string().required(), 
    description: joi.string().required()
})

exports.getAllFeatures = async (req, res) => {
    try {
        const features = await featureModel.getAllFeatures();
        res.json(features);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addFeature = async (req, res) => {
    try {
        const { error } = featureSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const feature_id = await featureModel.addFeature(req.body);
        res.status(201).json({ message: 'Feature added successfully', feature_id: feature_id });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateFeatureById = async (req, res) => {
    try {
        const { error } = featureSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const affectedRows = await featureModel.updateFeatureById(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Feature not found' });
        }
        res.json({ message: 'Feature updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteFeatureById = async (req, res) => {
    try {
        const affectedRows = await featureModel.deleteFeatureById(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Feature not found' });
        }
        res.json({ message: 'Feature deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};