const { User, Category, Product } = require('../models');

module.exports = class ProductController {
    static async createProduct(req, res) {
        try {
            const { id, name, description, price, stock, imgUrl, categoryId, authorId } = req.body;
            const submittedData = await Product.create({ id, name, description, price, stock, imgUrl, categoryId, authorId });
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
    static async readProducts(req, res) {
        try {
            const requestedData = await Product.findAll();
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
    static async readProductById(req, res) {
        try {
            const { id } = req.params;
            const requestedData = await Product.findByPk(id);
            // handle data null
            if (!requestedData) throw { code: 404, msg: `Product with ID ${id} not found` };
            res.status(200).json({
                message: "Request success",
                requestedData
            })
        }
        catch (err) {
            if (err.code === 404) {
                res.status(err.code).json({
                    message: err.msg
                })
            }
            else {
                res.status(500).json({
                    message: "Internal server error",
                })
            }
        }
    }
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const deletedData = await Product.findByPk(id);
            if (!deletedData) throw { code: 404, msg: `Product with ID ${id} not found` };
            const deletionStatus = await Product.destroy({ where: { id } });
            if (!deletionStatus) throw { code: 404, msg: "Deletion failed" };
            res.status(200).json({
                message: `Product with ID ${id} was successfully deleted`,
                deletedData
            })
        }
        catch (err) {
            if (err.code === 404) {
                res.status(err.code).json({
                    message: err.msg
                })
            }
            else {
                res.status(500).json({
                    message: "Internal server error",
                })
            }
        }
    }
}