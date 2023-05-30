const { Customer, CustomerProduct } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken, verifyToken } = require('../helpers/jwt.js');
const { OAuth2Client } = require('google-auth-library');

module.exports = class CustomerController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw { name: "invalidLogin" };
            const foundUser = await Customer.findOne({ where: { "email": email } });
            if (!foundUser) throw { name: "invalidLogin" };
            if (!bcrypt.compareSync(password, foundUser.password)) throw { name: "invalidLogin" };
            res.status(201).json({
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
                id: submittedData.id,
                email: submittedData.email
            })
        }
        catch (err) {
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
            res.status(201).json({
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
            const limit = 8;
            const offset = req.params.page || 0;
            offset *= limit;
            const options = {
                limit,
                offset,
                where: {}, // conditions
                include: {
                    model: User,
                    attributes: { exclude: ['password'] }
                },
            }
        }
        catch (error) {
            next(error);
        }
    }
}