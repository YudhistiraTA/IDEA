const { CustomerProduct } = require('../models');
module.exports = class CustomerController {
    static async paginatedDisplay(req, res, next) {
        try {
            const limit = 8;
            const offset = req.params.page || 0;
            offset *= limit;
            const options = {
                limit,
                offset,
                where: {}, // conditions
                include: {
                    model: User,
                    attributes: { exclude: ['password'] }
                },
            }
        }
        catch (error) {
            next(error);
        }
    }
}