const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/categoryController.js');
const categoryDeleteAuthorization = require('../middlewares/categoryDeleteAuthorization.js');

router.get('/', CategoryController.readCategories);
router.post('/add', CategoryController.createCategory);
router.delete('/:id', categoryDeleteAuthorization, CategoryController.deleteCategory);

module.exports = router;