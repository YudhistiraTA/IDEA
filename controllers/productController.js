const { User, Product, History } = require('../models');

module.exports = class ProductController {
    static async createProduct(req, res, next) {
        try {
            const { name, description, price, stock, imgUrl, categoryId } = req.body;
            const authorId = req.additionalData.id;
            const submittedData = await Product.create({ name, description, price, stock, imgUrl, categoryId, authorId });
            const newHistory = await History.create({name:"POST", description:`New Product with ID ${submittedData.id} created`, updatedBy:authorId});
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
                },
                order: [['id', 'ASC']]
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
            const newHistory = await History.create({name:"PATCH", 
                description:`Product status with ID ${id} has been archived`, 
                updatedBy:req.additionalData.id
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
            const foundProduct = await Product.findByPk(id, {attributes: ["authorId"]});
            if (!foundProduct) throw { name: "notFound"};
            const { name, description, price, stock, imgUrl, categoryId } = req.body;
            const updatedData = await Product.update({ name, description, price, stock, imgUrl, categoryId, authorId:foundProduct.authorId }, {
                where: {id}
            });
            const newHistory = await History.create({name:"PUT", description:`Product with ID ${id} updated`, updatedBy:foundProduct.authorId});
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
            const updatedData = await Product.update({status: newStatus}, {where: {id}});
            const newHistory = await History.create({name:"PATCH", description:`Product status with ID ${id} has been updated from ${currentStatus} to ${newStatus}`, updatedBy:foundProduct.authorId});
            res.status(200).json({
                message: `Product status with ID ${id} has been updated from ${currentStatus} into ${newStatus}`
            });
        } 
        catch (err) {
            next(err);
        }
    }
}