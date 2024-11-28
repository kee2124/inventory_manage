const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
// Middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB
connectDB();

// Routes
app.use('/api', productRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
