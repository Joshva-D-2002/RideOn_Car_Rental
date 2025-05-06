const db = require('../config/db.config.js');

exports.getAllRentals = async () => {
    const [results] = await db.promise().query('SELECT * FROM rental');
    return results;
}
exports.getRentalById = async (id) => {
    const [results] = await db.promise().query('SELECT * FROM rental WHERE id = ?', [id]);
    return results[0];
}
exports.addRental = async (rental) => {
    const { car_id, user_id, start_date, end_date, total_price, discount_id, status, pickup_location_id, dropoff_location_id } = rental;
    const [result] = await db.promise().query('INSERT INTO rental (car_id, user_id, start_date, end_date, total_price, discount_id, status, pickup_location_id, dropoff_location_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [car_id, user_id, start_date, end_date, total_price, discount_id, status, pickup_location_id, dropoff_location_id]);
    return result.insertId;
}
exports.updateRentalById = async (id, rental) => {
    const { car_id, user_id, start_date, end_date, total_price, discount_id, status, pickup_location_id, dropoff_location_id } = rental;
    const [result] = await db.promise().query('UPDATE rental SET car_id = ?, user_id = ?, start_date = ?, end_date = ?, total_price = ?, discount_id = ?, status = ?, pickup_location_id = ?, dropoff_location_id = ? WHERE id = ?', [car_id, user_id, start_date, end_date, total_price, discount_id, status, pickup_location_id, dropoff_location_id, id]);
    return result.affectedRows;
}