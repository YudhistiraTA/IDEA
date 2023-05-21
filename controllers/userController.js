const { User, Category, Product } = require('../models');
const { generateToken, verifyToken } = require('../helpers/jwt.js');
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require('google-auth-library');

module.exports = class UserController {
    static async createUser(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body;
            const submittedData = await User.create({ username, email, password, phoneNumber, address, role: "Admin" });
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
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw { name: "invalidLogin" };
            const foundUser = await User.findOne({ where: { "email": email } });
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
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.email.split('@')[0],
                    email: payload.email,
                    password: "GOOGLE_AUTH",
                    phoneNumber: '',
                    address: '',
                    role: "Staff"
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
                username: user.username
            })
        }
        catch (err) {
            next(err);
        }
    }
}