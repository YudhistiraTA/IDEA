const express = require('express');
const authentication = require('../middlewares/authentication');
const CustomerController = require('../controllers/customerController');
const router = express.Router()

router.post('/register', CustomerController.createUser);
router.post('/login', CustomerController.login);
router.post('/gsign', CustomerController.gSign);
router.get('/products', CustomerController.paginatedDisplay);

module.exports = router;