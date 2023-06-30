const { Category } = require('../models');

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
    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const deletedData = await Category.findByPk(id);
            const deletionStatus = await Category.destroy({ where: { id } });
            if (!deletionStatus) throw { name: "notFound" };
            res.status(200).json({
                message: `Category with ID ${id} was successfully deleted`,
                deletedData
            })
        }
        catch (err) {
            next(err);
        }
    }
}