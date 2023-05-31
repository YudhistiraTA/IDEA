const express = require('express');
const authentication = require('../middlewares/authentication');
const CustomerController = require('../controllers/customerController');
const ProductController = require('../controllers/productController');
const router = express.Router()

router.post('/register', CustomerController.createUser);
router.post('/login', CustomerController.login);
router.post('/gsign', CustomerController.gSign);
router.get('/products', CustomerController.paginatedDisplay);
router.get('/products/:id', ProductController.readProductById);
router.get('/wishlist/add/:id', authentication, CustomerController.addToWishlist);

module.exports = router;