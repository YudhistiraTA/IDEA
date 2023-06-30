const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController.js');
const deleteAuthorization = require('../middlewares/deleteAuthorization.js');
const adminAuthorization = require('../middlewares/adminAuthorization.js');

router.get('/', ProductController.readProducts);
router.post('/add', ProductController.createProduct);
router.delete('/delete/:id', deleteAuthorization, ProductController.deleteProduct);
router.put('/:id', ProductController.updateProduct)
router.patch('/:id',adminAuthorization ,ProductController.toggleStatusProduct)
router.get('/:id', ProductController.readProductById);

module.exports = router;