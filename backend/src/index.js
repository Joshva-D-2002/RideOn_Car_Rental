const express = require('express');
const carRoutes = require('./routes/carRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { verifyToken } = require('./middlewares/auth.js');
const featureRoutes = require('./routes/featureRoutes');
const locationRoutes = require('./routes/locationRoutes.js');
const discountRoutes = require('./routes/discountRoutes.js');
const rentalRoutes = require('./routes/rentalRoutes.js');
const feedbackRoutes = require('./routes/feedbackRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');

const app = express();

app.use(express.json());

const corsOption = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}

app.use(cors(corsOption))

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>My express server running</h1>');
});

app.use('/api', authRoutes);

app.use('/api/car', verifyToken, carRoutes);

app.use('/api/feature', verifyToken, featureRoutes);

app.use('/api/location', verifyToken, locationRoutes);

app.use('/api/discount', verifyToken, discountRoutes);

app.use('/api/rental', verifyToken, rentalRoutes);

app.use('/api/feedback', verifyToken, feedbackRoutes);

app.use('/api/user', verifyToken, userRoutes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});