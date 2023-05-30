const { Customer } = require('../models');
module.exports = async (req, res, next) => {
    try {
        next();
    } 
    catch (error) {
        next(error);    
    }
}