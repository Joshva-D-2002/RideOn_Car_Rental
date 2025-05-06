const db = require('../config/db.config.js');

exports.getAllDiscounts = async () => {
    const [results] = await db.promise().query('SELECT * FROM discount');
    return results;
}

exports.getDiscountById = async (id) => {
    const [results] = await db.promise().query('SELECT * FROM discount WHERE id = ?', [id]);
    return results[0];
}

exports.addDiscount = async (discount) => {
    const { code, description, discount_type, value, valid_from, valid_to, is_active } = discount;
    const [result] = await db.promise().query('INSERT INTO discounts (code, description, discount_type, value, valid_from, valid_to , is_active) VALUES (?, ?, ?, ?, ?, ?, ?)', [code, description, discount_type, value, valid_from, valid_to, is_active]);
    return result.insertId;
}

exports.updateDiscountById = async (id, discount) => {
    const { code, description, discount_type, value, valid_from, valid_to, is_active } = discount;
    const [result] = await db.promise().query('UPDATE discounts SET code = ?, description = ?, discount_type = ?, value = ?, valid_from = ?, valid_to = ?, is_active = ? WHERE id = ?', [code, description, discount_type, value, valid_from, valid_to, is_active, id]);
    return result.affectedRows;
}

exports.deleteDiscountById = async (id) => {
    const [result] = await db.promise().query('DELETE FROM discounts WHERE id = ?', [id]);
    return result.affectedRows;
}