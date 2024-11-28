const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {
        type: String,  // Make it a String to allow alphanumeric IDs
        required: [true, 'Product ID is required'],
        unique: true,   // Ensure the productId is unique
      },
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
