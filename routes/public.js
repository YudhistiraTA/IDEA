const express = require('express');
const customerAuthentication = require('../middlewares/customerAuthentication');
const CustomerController = require('../controllers/customerController');
const ProductController = require('../controllers/productController');
const router = express.Router()

router.post('/register', CustomerController.createUser);
router.post('/login', CustomerController.login);
router.post('/gsign', CustomerController.gSign);
router.get('/products', CustomerController.paginatedDisplay);
router.get('/products/:id', ProductController.readProductById);
router.get('/wishlist/add/:id', customerAuthentication, CustomerController.readWishlist);
router.post('/wishlist/add/:id', customerAuthentication, CustomerController.addToWishlist);

module.exports = router;