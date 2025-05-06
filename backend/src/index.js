const express = require('express');
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes');
const { verifyToken } = require('./middlewares/auth');
const featureRoutes = require('./routes/featureRoutes');
const locationRoutes = require('./routes/locationRoutes');
const discountRoutes = require('./routes/discountRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>My express server running</h1>');
});

app.use('/api', authRoutes);

app.use(verifyToken);

app.use('/api/car', carRoutes);

app.use('/api/feature', featureRoutes);

app.use('/api/location' , locationRoutes);

app.use('api/discount', discountRoutes);

app.use('/api/rental', rentalRoutes);

app.use('/api/rental', feedbackRoutes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});