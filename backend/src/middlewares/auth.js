const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.verifyToken = async (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {
        console.error('JWT Verification Error:', err);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};