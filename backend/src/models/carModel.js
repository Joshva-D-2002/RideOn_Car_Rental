const db = require('../config/db.config.js');

exports.getAllCars = async () => {
    const [results] = await db.promise().query('SELECT * FROM cars');
    return results;
};

exports.getCarById = async (id) => {
    const [results] = await db.promise().query('SELECT * FROM cars WHERE id = ?', [id]);
    return results[0];
};

exports.addCar = async (car) => {
    const { brand, model, year, color, price_per_day, status, type, registration_number, location_id } = car;
    const [result] = await db.promise().query('INSERT INTO cars (brand, model, year, color, price_per_day, status, type, registration_number, location_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [brand, model, year, color, price_per_day, status, type, registration_number, location_id]);
    return result.insertId;
}

exports.updateCarById = async (id, car) => {
    const { brand, model, year, color, price_per_day, status, type, registration_number, location_id } = car;
    const [result] = await db.promise().query('UPDATE cars SET brand = ?, model = ?, year = ?, color = ?, price_per_day = ?, status = ?, type = ?, registration_number = ?, location_id = ? WHERE id = ?', [brand, model, year, color, price_per_day, status, type, registration_number, location_id, id]);
    return result.affectedRows;
}

exports.deleteCarById = async (id) => {
    const [result] = await db.promise().query('DELETE FROM cars WHERE id = ?', [id]);
    return result.affectedRows;
}

exports.addFeaturesToCar = async (carId, featureIds) => {
    const insertPromises = featureIds.map(featureId => {
        return db.promise().query(
            'INSERT INTO car_has_features (car_id, feature_id) VALUES (?, ?)', 
            [carId, featureId]
        );
    });
    const results = await Promise.all(insertPromises);
    return results;
};

exports.removeFeaturesFromCar = async (carId, featureIds) => {
    const deletePromises = featureIds.map(featureId => {
        return db.promise().query(
            'DELETE FROM car_has_features WHERE car_id = ? AND feature_id = ?', 
            [carId, featureId]
        );
    });
    const results = await Promise.all(deletePromises);
    return results;
}

exports.getCarImagesById = async (id) => {
    const [results] = await db.promise().query('SELECT * FROM car_images WHERE car_id = ?', [id]);
    return results;
}   

exports.uploadCarImage = async (carId, imageUrl) => {
    const [result] = await db.promise().query('INSERT INTO car_images (car_id, image_url) VALUES (?, ?)', [carId, imageUrl]);
    return result.insertId;
}

exports.deleteCarImage = async (carId, imageUrl) => {
    const [result] = await db.promise().query('DELETE FROM car_images WHERE car_id = ? AND image_url = ?', [carId, imageUrl]);
    return result.affectedRows;
}

