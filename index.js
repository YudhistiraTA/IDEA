require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const ProductController = require('./controllers/productController.js');
const UserController = require('./controllers/userController.js');
const CategoryController = require('./controllers/categoryController.js');
const cors = require('cors');
const errorHandling = require('./middlewares/errorHandling.js');
const authentication = require('./middlewares/authentication.js');
const deleteAuthorization = require('./middlewares/deleteAuthorization.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', UserController.createUser);
app.post('/login', UserController.login);
app.post('/gsign', UserController.gSign);


app.get('/categories', authentication, CategoryController.readCategories);
app.post('/categories/add', authentication, CategoryController.createCategory);

app.post('/products/add', authentication, ProductController.createProduct);
app.delete('/products/:id', authentication, deleteAuthorization, ProductController.deleteProduct);
app.get('/products/:id', authentication, ProductController.readProductById);
app.get('/products', authentication, ProductController.readProducts);

app.use(errorHandling);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})