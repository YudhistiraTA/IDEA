const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'rahasia_dev';

// create token
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' })
}

// autentikasi token
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY)
}

module.exports = { generateToken, verifyToken }