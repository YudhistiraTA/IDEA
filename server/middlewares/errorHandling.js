module.exports = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            let emailEmpty = false;
            res.status(400).json({
                message: err.errors.flatMap((el) => {
                    if (el.message === 'Email is required') emailEmpty = true;
                    return emailEmpty && el.message === 'Invalid email format' ? [] : el.message;
                })
            })
            break;
        case "invalidLogin":
            res.status(401).json({ message: "Invalid email or password" })
            break;
        case "invalidToken":
        case "JsonWebTokenError":
            res.status(401).json({ message: "Invalid Token" })
            break;
        case "TokenExpiredError":
            res.status(401).json({ message: "Token expired" })
            break;
        case "forbidden":
            res.status(403).json({ message: "Forbidden" })
            break;
        case "notFound":
            res.status(404).json({ message: "Not found" })
            break;
        case "SequelizeUniqueConstraintError":
            res.status(409).json({
                message: "Email is already in use"
            })
            break;
        case "SequelizeForeignKeyConstraintError":
            res.status(409).json({
                message: "This category is not available/still in use!"
            })
            break;
        default:
            console.log(err);
            res.status(500).json({ message: "Internal server error" })
            break;
    }
}