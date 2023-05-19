const { User, Category, Product } = require('../models');

module.exports = class ProductController {
    static async createProduct(req, res, next) {
        try {
            const { id, name, description, price, stock, imgUrl, categoryId } = req.body;
            const authorId = req.additionalData.id;
            const submittedData = await Product.create({ id, name, description, price, stock, imgUrl, categoryId, authorId });
            res.status(201).json({
                message: "Input success",
                submittedData
            })
        }
        catch (err) {
            next(err);
        }
    }
    static async readProducts(req, res, next) {
        try {
            const { username } = req.additionalData;
            console.log(req.additionalData);
            const requestedData = await Product.findAll({
                include: {
                    model: User,
                    attributes: { exclude: ['password'] }
                }
            });
            res.status(200).json({
                message: "Request success",
                requestedData,
                username
            })
        }
        catch (err) {
            next(err);
        }
    }
    static async readProductById(req, res, next) {
        try {
            const { id } = req.params;
            const requestedData = await Product.findByPk(id);
            if (!requestedData) throw { name: "notFound" };
            res.status(200).json({
                message: "Request success",
                requestedData
            })
        }
        catch (err) {
            next(err);
        }
    }
    static async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const deletedData = await Product.findByPk(id);
            const deletionStatus = await Product.destroy({ where: { id } });
            if (!deletionStatus) throw { name: "notFound" };
            res.status(200).json({
                message: `Product with ID ${id} was successfully deleted`,
                deletedData
            })
        }
        catch (err) {
            next(err);
        }
    }
}