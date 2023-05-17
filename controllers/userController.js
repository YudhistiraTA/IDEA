const { User, Category, Product } = require('../models');
const { generateToken, verifyToken } = require('../helpers/jwt.js');
const bcrypt = require("bcryptjs");

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
                email: foundUser.email,
                role: foundUser.role
            })
        }
        catch (err) {
            next(err);
        }
    }
}