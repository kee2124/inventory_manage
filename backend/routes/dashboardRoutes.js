// routes/dashboardRoutes.js
const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

// Dashboard route
router.get('/', getDashboardData);

module.exports = router;
