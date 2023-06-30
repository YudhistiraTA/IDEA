const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController.js');
const HistoryController = require('../controllers/historyController.js');
const categoriesRouters = require('./categories.js');
const productsRouters = require('./products.js');
const publicRouters = require('./public.js');
const authentication = require('../middlewares/authentication.js');

router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.post('/gsign', UserController.gSign);

router.get('/history', authentication, HistoryController.readHistory);

router.use('/categories', authentication, categoriesRouters);
router.use('/products', authentication, productsRouters);
router.use('/public', publicRouters);

module.exports = router;