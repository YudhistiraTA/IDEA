const { verifyToken } = require('../helpers/jwt.js');
const { Customer } = require('../models');
module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) throw { name: "invalidToken" };
        const payload = verifyToken(access_token);
        if (!payload) throw { name: "invalidToken" };
        const customerData = await Customer.findByPk(payload.id);
        if (!customerData) throw { name: "invalidToken" };
        req.additionalData = {
            id: payload.id,
            role: payload.role,
        };
        next();
    } catch (err) {
        next(err)
    }
}