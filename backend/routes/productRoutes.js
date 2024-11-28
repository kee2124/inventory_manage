const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require('../controllers/productController');

const router = express.Router();


// POST request to create a product
router.post('/products', createProduct);

// GET request to fetch all products
router.get('/products', getAllProducts);

// GET request to fetch a single product by ID
router.get('/products/:productId', getProductById);

// PUT request to update a product by ID
router.put('/products/:productId', updateProduct);


// DELETE request to delete a product by ID
router.delete('/products/:productId',deleteProduct);

router.get('/products/search', searchProducts);




module.exports = router;
