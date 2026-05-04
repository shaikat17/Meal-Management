require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/meals', require('./routes/mealRoutes'));

app.get('/', (req, res) => res.status(200).json({ msg: 'Welcome to Meal Management API' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

