const { User, Product, History, Category } = require('../models');
const axios = require('axios');

module.exports = class ProductController {
    static async createProduct(req, res, next) {
        try {
            const { name, description, price, stock, imgUrl, categoryId } = req.body;
            const authorId = req.additionalData.id;
            const submittedData = await Product.create({ name, description, price, stock, imgUrl, categoryId, authorId });
            const newHistory = await History.create({ name: "POST", description: `New Product with ID ${submittedData.id} created`, updatedBy: authorId });
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
            const { role } = req.additionalData;
            console.log(req.additionalData);
            const requestedData = await Product.findAll({
                include: {
                    model: User,
                    attributes: { exclude: ['password'] }
                },
                order: [['id', 'ASC']]
            });
            res.status(200).json({
                message: "Request success",
                requestedData,
                role
            })
        }
        catch (err) {
            next(err);
        }
    }
    static async readProductById(req, res, next) {
        try {
            const { id } = req.params;
            const requestedData = await Product.findByPk(id, {
                include: {
                    model: Category,
                }
            });
            if (!requestedData) throw { name: "notFound" };
            const { data: qr } = await axios.post('https://api.qr-code-generator.com/v1/create?access-token=38_SU4JLulJi9Jp3-JJzK9FFxFJoiZgXgC4CBTRSyTYIo7MgsXylek8RPdbvZj9v', {
                frame_name: "no-frame",
                qr_code_text: `https://challenge1-387006.web.app/product/${id}`,
                image_format: "SVG",
            });
            res.status(200).json({
                message: "Request success",
                requestedData,
                qr
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
            const newHistory = await History.create({
                name: "DELETE",
                description: `Product status with ID ${id} has been deleted`,
                updatedBy: req.additionalData.id
            });
            res.status(200).json({
                message: `Product with ID ${id} was successfully deleted`,
                deletedData
            })
        }
        catch (err) {
            next(err);
        }
    }
    static async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const foundProduct = await Product.findByPk(id, { attributes: ["authorId"] });
            if (!foundProduct) throw { name: "notFound" };
            const { name, description, price, stock, imgUrl, categoryId } = req.body;
            const updatedData = await Product.update({ name, description, price, stock, imgUrl, categoryId, authorId: foundProduct.authorId }, {
                where: { id }
            });
            const newHistory = await History.create({ name: "PUT", description: `Product with ID ${id} updated`, updatedBy: foundProduct.authorId });
            res.status(200).json({
                message: `Product with ID ${id} updated`
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async toggleStatusProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { currentStatus } = req.additionalData;
            const { newStatus } = req.body;
            const updatedData = await Product.update({ status: newStatus }, { where: { id } });
            const newHistory = await History.create({ name: "PATCH", description: `Product status with ID ${id} has been updated from ${currentStatus} to ${newStatus}`, updatedBy: req.additionalData.id });
            res.status(200).json({
                message: `Product status with ID ${id} has been updated from ${currentStatus} into ${newStatus}`
            });
        }
        catch (err) {
            next(err);
        }
    }
}