const express = require('express');
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const CustomerController = require('../controllers/customerController');
const router = express.Router()

router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.post('/gsign', UserController.gSign);
router.get('/products', authentication, CustomerController.paginatedDisplay);

module.exports = router;