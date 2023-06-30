const { Product } = require('../models');
module.exports = async (req, res, next) => {
    try {
        const requestedProduct = await Product.findByPk(req.params.id);
        if (!requestedProduct) throw { name: "notFound" };
        if (req.additionalData.role === "Admin") {
            req.additionalData.currentStatus = requestedProduct.status;
            next();
        }
        else throw { name: "forbidden" };
    } catch (err) {
        next(err)
    }
}