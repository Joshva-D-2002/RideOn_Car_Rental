const db = require('../config/db.config.js');

exports.getAllCars = async () => {
    const [results] = await db.promise().query('SELECT * FROM cars');
    return results;
};

exports.getCarById = async (id) => {
    const [results] = await db.promise().query('SELECT * FROM cars WHERE id = ?', [id]);
    return results[0];
};

exports.updateRentalstatus = async (id, rentalstatus) => {
    const { status } = rentalstatus;
    const [result] = await db.promise().query('UPDATE cars SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
}

