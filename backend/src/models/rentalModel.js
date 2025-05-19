const db = require('../config/db.config.js');

exports.addRental = async (rental) => {
    const { car_id, user_id, start_date, end_date, total_price, discount_id, status, pickup_location_id, dropoff_location_id } = rental;
    const [result] = await db.promise().query('INSERT INTO rental (car_id, user_id, start_date, end_date, total_price, discount_id, status, pickup_location_id, dropoff_location_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [car_id, user_id, start_date, end_date, total_price, discount_id, status, pickup_location_id, dropoff_location_id]);
    return result.insertId;
}

exports.getRentalsByUser = async (id) => {
    const [results] = await db.promise().query(` SELECT 
            rental.*, 
            cars.brand, 
            cars.model, 
            cars.image,
            cars.color,
            cars.year,
            cars.price_per_day,
            cars.type,
            cars.registration_number
        FROM rental
        JOIN cars ON rental.car_id = cars.id
        WHERE rental.user_id = ?` , [id]);
    return results;
}
