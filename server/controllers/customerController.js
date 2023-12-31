const { Customer, CustomerProduct, Product, Category } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken, verifyToken } = require('../helpers/jwt.js');
const { OAuth2Client } = require('google-auth-library');
const { Op } = require('sequelize');

module.exports = class CustomerController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw { name: "invalidLogin" };
            const foundUser = await Customer.findOne({ where: { "email": email } });
            if (!foundUser) throw { name: "invalidLogin" };
            if (!bcrypt.compareSync(password, foundUser.password)) throw { name: "invalidLogin" };
            res.status(200).json({
                message: "Login success",
                access_token: generateToken({
                    id: foundUser.id,
                    role: foundUser.role
                }),
                // id: foundUser.id,
                // role: foundUser.role,
                // username: foundUser.username
            })
        }
        catch (err) {
            next(err);
        }
    }
    static async createUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const submittedData = await Customer.create({ email, password, role: 'Customer' });
            res.status(201).json({
                message: "Registration success",
                access_token: generateToken({
                    id: submittedData.id,
                    role: submittedData.role
                })
            })
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
    static async gSign(req, res, next) {
        try {
            const { token } = req.body;
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            const [user, created] = await Customer.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    email: payload.email,
                    password: "GOOGLE_AUTH",
                    role: 'Customer'
                }
            });
            const status = created ? 201 : 200;
            res.status(status).json({
                message: "Login success",
                access_token: generateToken({
                    id: user.id,
                    role: user.role
                }),
                // id: user.id,
                // role: user.role,
                // username: user.username
            })
        }
        catch (err) {
            next(err);
        }
    }
    static async paginatedDisplay(req, res, next) {
        try {
            const { search = '', filter } = req.query;
            const limit = 8;
            let offset = +req.query.page ? +req.query.page - 1 : 0;
            if (offset > 0) offset *= limit;
            else offset = 0;
            let options = {
                limit,
                offset,
                include: {
                    model: Category
                },
            }
            if (filter) options.where = {
                name: { [Op.iLike]: `%${search}%` },
                categoryId: filter
            }
            else if (search && !filter) options.where = {
                name: { [Op.iLike]: `%${search}%` }
            }
            const data = await Product.findAndCountAll(options);
            const response = {
                totalItems: data.count,
                products: data.rows,
                totalPages: Math.ceil(data.count / limit),
                currentPage: +req.query.page > 0 ? +req.query.page : 1
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async addToWishlist(req, res, next) {
        try {
            const { id:CustomerId } = req.additionalData;
            const { id:ProductId } = req.params;
            const foundProduct = await Product.findByPk(ProductId);
            if (!foundProduct) throw {name: "notFound"};
            await CustomerProduct.create({CustomerId, ProductId});
            res.status(201).json({message: `Product with ID ${ProductId} added to wishlist`});
        } 
        catch (error) {
            next(error)    
        }
    }
    static async readWishlist(req, res, next) {
        try {
            const { id:CustomerId } = req.additionalData;
            const requestedData = await CustomerProduct.findAll({
                where: {CustomerId},
                include: {
                    model: Product,
                    include: {
                        model: Category
                    }
                }
            });
            res.status(200).json({
                message: "Request success",
                requestedData
            });
        } 
        catch (error) {
            next(error);    
        }
    }
}