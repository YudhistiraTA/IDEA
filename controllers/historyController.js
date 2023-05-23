const { History } = require('../models');

module.exports = class HistoryController {
    static async readHistory(req, res, next) {
        try {
            const requestedData = await History.findAll({ order: [['createdAt', 'DESC']] });
            res.status(200).json({
                requestedData
            })
        }
        catch (err) {
            next(err)
        }

    }
}