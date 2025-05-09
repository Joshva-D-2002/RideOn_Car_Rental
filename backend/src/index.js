const express = require('express');
const carRoutes = require('./routes/carRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { verifyToken } = require('./middlewares/auth.js');
const featureRoutes = require('./routes/featureRoutes');
const locationRoutes = require('./routes/locationRoutes.js');
const discountRoutes = require('./routes/discountRoutes.js');
const rentalRoutes = require('./routes/rentalRoutes.js');
const feedbackRoutes = require('./routes/feedbackRoutes.js');
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

app.use(verifyToken);

app.use('/api/car', carRoutes);

app.use('/api/feature', featureRoutes);

app.use('/api/location', locationRoutes);

app.use('/api/discount', discountRoutes);

app.use('/api/rental', rentalRoutes);

app.use('/api/feedback', feedbackRoutes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});