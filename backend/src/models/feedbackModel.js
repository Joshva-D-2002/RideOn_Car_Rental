const db = require('../config/db.config.js');

exports.getAllFeedbacks = async () => {
    const [results] = await db.promise().query('SELECT * FROM feedback');
    return results;
}

exports.addFeedback = async (feedback) => {
    const { rental_id, user_id, rating, title, comment } = feedback;
    const [result] = await db.promise().query('INSERT INTO feedback (rental_id, user_id, rating, title, comment) VALUES (?, ?, ?, ?, ?)', [ rental_id, user_id, rating, title, comment]);
    return result.insertId;
}