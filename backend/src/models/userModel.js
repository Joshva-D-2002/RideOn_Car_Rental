const db = require('../config/db.config.js');


exports.getUserById = async (userId) => {
    const results = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
    return results[0];
}