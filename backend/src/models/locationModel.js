const e = require('express');
const db = require('../config/db.config.js');

exports.getAllLocations = async () => {
    const [results] = await db.promise().query('SELECT * FROM locations');
    return results;
};

exports.getLocationById = async (id) => {
    const [results] = await db.promise().query('SELECT * FROM locations WHERE id = ?', [id]);
    return results[0];
}

exports.addLocation = async (location) => {
    const { name, address, city, state, pin_code, country, phone_number} = location;
    const [result] = await db.promise().query('INSERT INTO locations (name, address, city, state, pin_code, country, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, address, city, state, pin_code, country, phone_number]);
    return result.insertId;
}

exports.updateLocationById = async (id, location) => {
    const { name, address, city, state, pin_code, country, phone_number } = location;
    const [result] = await db.promise().query('UPDATE locations SET name = ?, address = ?, city = ?, state = ?, pin_code = ?, country = ? phone_number = ? WHERE id = ?', [name, address, city, state, pin_code, country, phone_number, id]);
    return result.affectedRows;
}
exports.deleteLocationById = async (id) => {
    const [result] = await db.promise().query('DELETE FROM locations WHERE id = ?', [id]);
    return result.affectedRows;
}