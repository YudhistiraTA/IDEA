const { User, Category, Product } = require('../models');

module.exports = class UserController {
    static async createUser(req, res) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body;
            const submittedData = await User.create({ username, email, password, role, phoneNumber, address });
            res.status(201).json({
                code: 201,
                message: "Input success",
                submittedData
            })
        }
        catch(err) {
            if(err.name === "SequelizeValidationError") {
                res.status(400).json({
                    code: 400,
                    error: err.errors
                })
            } else {
                res.status(500).json({
                    code: 500,
                    message: "Internal server error"
                })
            }
        }
    }
}