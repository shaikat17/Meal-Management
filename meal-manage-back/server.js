const express = require('express');
// const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
// connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/meals', require('./routes/mealRoutes'));

app.get('/', (req, res) => res.send('Welcome to Meal Management API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));