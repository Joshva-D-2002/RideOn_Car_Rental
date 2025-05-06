const e = require('express');
const discountModel = require('../models/discountModel.js');

const joi = require('joi');

const discountSchema = joi.object({
    code: joi.string().required(),
    description: joi.string().required(),
    discount_type: joi.string().valid('percentage', 'fixed').required(),
    value: joi.number().required(),
    valid_from: joi.date().iso().required(),
    valid_to: joi.date().iso().greater(joi.ref('valid_from')).required(),
    is_active: joi.boolean().required()
})

exports.getAllDiscounts = async (req, res) => {
    try {
        const discounts = await discountModel.getAllDiscounts();
        res.json(discounts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getDiscountById = async (req, res) => {
    try {
        const discount = await discountModel.getDiscountById(req.params.id);
        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        res.json(discount);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.addDiscount = async (req, res) => {
    try {
        const { error } = discountSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const discountId = await discountModel.addDiscount(req.body);
        res.status(201).json({ message: 'Discount added successfully', discountId });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateDiscountById = async (req, res) => {
    try {
        const { error } = discountSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const affectedRows = await discountModel.updateDiscountById(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        res.json({ message: 'Discount updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });

    }
};


exports.deleteDiscountById = async (req, res) => {
    try {
        const affectedRows = await discountModel.deleteDiscountById(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        res.json({ message: 'Discount deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};