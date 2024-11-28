const Product = require('../models/productModel');

// Function to calculate Dashboard statistics
const getDashboardData = async (req, res) => {
  try {
    // Total number of products
    const totalProducts = await Product.countDocuments();

    // Total inventory value (price * stock for all products)
    const totalInventoryValue = await Product.aggregate([
      { $group: { _id: null, totalValue: { $sum: { $multiply: ['$price', '$stock'] } } } },
    ]);

    // Low stock products (e.g., stock less than 5)
    const lowStockThreshold = 5;
    const lowStockProducts = await Product.find({ stock: { $lt: lowStockThreshold } });

    res.status(200).json({
      totalProducts,
      totalInventoryValue: totalInventoryValue[0]?.totalValue || 0,
      lowStockProducts: lowStockProducts.length,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      message: 'Error fetching dashboard data',
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};
