const { verifyToken } = require('../helpers/jwt.js');
const { User } = require('../models');
module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) throw { name: "invalidToken" };
        const payload = verifyToken(access_token);
        if (!payload) throw { name: "invalidToken" };
        const userData = await User.findByPk(payload.id);
        if (!userData) throw { name: "invalidToken" };
        req.additionalData = {
            id: payload.id,
            role: payload.role
        };
        next();
    } catch (err) {
        next(err)
    }
}