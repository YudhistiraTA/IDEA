const { User, Category, Product } = require('../models');

module.exports = class CategoryController {
    static async createCategory(req, res) {
        try {
            const { name } = req.body;
            const submittedData = await Category.create({ name });
            res.status(201).json({
                message: "Input success",
                submittedData
            })
        }
        catch (err) {
            if (err.name === "SequelizeValidationError") {
                res.status(400).json({
                    error: err.errors
                })
            } else {
                res.status(500).json({
                    message: "Internal server error"
                })
            }
        }
    }
    static async readCategories(req, res) {
        try {
            const requestedData = await Category.findAll();
            res.status(200).json({
                message: "Request success",
                requestedData
            })
        }
        catch (err) {
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}