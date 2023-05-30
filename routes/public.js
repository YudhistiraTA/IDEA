const express = require('express');
const UserController = require('../controllers/userController');
const ProductController = require('../controllers/productController');
const authentication = require('../middlewares/authentication');
const router = express.Router()

router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.post('/gsign', UserController.gSign);
router.get('/products', authentication, ProductController.paginatedDisplay);

module.exports = router;