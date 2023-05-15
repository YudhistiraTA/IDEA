const express = require('express')
const app = express()
const port = 3000
const ProductController = require('./controllers/productController.js');
const UserController = require('./controllers/userController.js');
const CategoryController = require('./controllers/categoryController.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/users/add', UserController.createUser);

app.post('/categories/add', CategoryController.createCategory);
app.get('/categories', CategoryController.readCategories);

app.post('/products/add', ProductController.createProduct);
app.delete('/products/:id', ProductController.deleteProduct);
app.get('/products/:id', ProductController.readProductById);
app.get('/products', ProductController.readProducts);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})