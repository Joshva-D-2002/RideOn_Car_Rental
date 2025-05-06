const db = require('../config/db.config.js');

exports.getAllFeatures = async () => {
    const [results] = await db.promise().query('SELECT * FROM car_feature');
    return results;
}

exports.addFeature = async (feature) => {
    const { feature_name, description } = feature;
    const [result] = await db.promise().query('INSERT INTO car_feature (feature_name, description) VALUES (?, ?)', [feature_name, description]);
    return result.insertId;
};

exports.updateFeatureById = async (id, feature) => {
    const { feature_name, description } = feature;
    const [result] = await db.promise().query('UPDATE car_feature SET feature_name = ?, description = ? WHERE id = ?', [feature_name, description, id]);
    return result.affectedRows;
}

exports.deleteFeatureById = async (id) => {
    const [result] = await db.promise().query('DELETE FROM car_feature WHERE id = ?', [id]);
    return result.affectedRows;
}


