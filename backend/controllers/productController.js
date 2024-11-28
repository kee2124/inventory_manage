const Product = require('../models/productModel');

// Create Product
const createProduct = async (req, res) => {
  const { productId,name, price, stock, category } = req.body;

  if (!productId || !name || !price || !stock || !category) {
    return res.status(400).json({ message: 'All fields (name, price, stock, category) are required' });
  }

  try {
    const newProduct = new Product({
      productId,
      name,
      price,
      stock,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      message: 'Error creating product',
      error: error.message,
    });
  }
};

// Get all Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      message: 'Error fetching products',
      error: error.message,
    });
  }
};

// Get a single Product
const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findOne({ productId: new RegExp(`^${productId}$`) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      message: 'Error fetching product',
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
    try {
      const {productId }= req.params;
      const updatedData = req.body;
  
      // Validate input data if necessary
      if (!updatedData.productId || !updatedData.name || !updatedData.price || !updatedData.stock || !updatedData.category) {
        return res.status(400).json({ message: 'All fields (name, price, stock, category) are required.' });
      }
  
      // Find the product by ID and update it
      const updatedProduct = await Product.findOneAndUpdate({productId: new RegExp(`^${productId}$`)}, updatedData, {
        new: true, // Return the updated product object
        runValidators: true, // Ensure validations run again for the updated data
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  };

const deleteProduct = async (req, res) => {
    try {
      const {productId }= req.params;
      const deletedProduct = await Product.findOneAndDelete({ productId: new RegExp(`^${productId}$`) });
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  };
  const searchProducts = async (req, res) => {
    const { query } = req.query; // Query will be passed as a parameter
  
    try {
      const products = await Product.find({
        $or: [
          { productId: new RegExp(`^${query}$`,'i') }, // Case-insensitive match for productId
          { name: new RegExp(`^${query}$`, 'i') }, // Case-insensitive match for name
        ],
      });
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
  
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: 'Error searching products', error: error.message });
    }
  };
  


  






module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};
