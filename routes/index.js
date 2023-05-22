const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController.js');
const categoriesRouters = require('./categories.js');
const productsRouters = require('./products.js');
const authentication = require('../middlewares/authentication.js');

router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.post('/gsign', UserController.gSign);

router.use('/categories', authentication, categoriesRouters);
router.use('/products', authentication, productsRouters);

module.exports = router;