const express = require('express');
const carRoutes = require('./routes/carRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { verifyToken } = require('./middlewares/auth.js');
const rentalRoutes = require('./routes/rentalRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors())

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>My express server running</h1>');
});

app.use('/api', authRoutes);

app.use('/api/car', verifyToken, carRoutes);

app.use('/api/rental', verifyToken, rentalRoutes);

app.use('/api/user', verifyToken, userRoutes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});