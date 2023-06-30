const { Category } = require('../models');
module.exports = async (req, res, next) => {
    try {
        if (req.additionalData.role === "Admin") next();
        else throw { name: "forbidden" };
    } catch (err) {
        next(err)
    }
}