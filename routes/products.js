const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController.js');
const deleteAuthorization = require('../middlewares/deleteAuthorization.js');

router.get('/', ProductController.readProducts);
router.post('/add', ProductController.createProduct);
router.delete('/:id', deleteAuthorization, ProductController.deleteProduct);
router.get('/:id', ProductController.readProductById);

module.exports = router;