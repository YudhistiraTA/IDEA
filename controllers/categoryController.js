const { User, Category, Product } = require('../models');

module.exports = class CategoryController {
    static async createCategory(req, res, next) {
        try {
            const { name } = req.body;
            const submittedData = await Category.create({ name });
            res.status(201).json({
                message: "Input success",
                submittedData
            })
        }
        catch (err) {
            next(err);
        }
    }
    static async readCategories(req, res, next) {
        try {
            const requestedData = await Category.findAll();
            res.status(200).json({
                message: "Request success",
                requestedData
            })
        }
        catch (err) {
            next(err);
        }
    }
}