const db = require('../config/db.config.js');
const bcrypt = require('bcrypt');

exports.registerUser = async (user) => {
    const { first_name, last_name, email, password, user_type, phone_number } = user;
    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await db.promise().query('INSERT INTO users (first_name, last_name, email, password_hash, user_type, phone_number) VALUES (?, ?, ?, ?, ?, ?)', [first_name, last_name, email, password_hash, user_type, phone_number]);
    return result.insertId;
}

exports.loginUser = async (user) => {
    const { email, password } = user;
    const [results] = await db.promise().query('SELECT * FROM users WHERE email = ? AND user_type = ?', [email, 'customer']);
    if (results.length === 0) {
        return null;
    }
    const result = results[0];
    const isMatch = await bcrypt.compare(password, result.password_hash);
    if (!isMatch) {
        return null;
    }
    return result;
}

exports.loginAdminUser = async (user) => {
    const { email, password } = user;
    const [results] = await db.promise().query('SELECT * FROM users WHERE email = ? AND user_type = ?', [email, 'admin']);
    if (results.length === 0) {
        return null;
    }
    const result = results[0];
    const isMatch = await bcrypt.compare(password, result.password_hash);
    if (!isMatch) {
        return null;
    }
    return result;
}