const validateUser = (req, res, next) => {
    const admin = true;
    if (admin != false) {
        req.isCorrect = true;
        return next();
    }
    const error = {
        "id": -1,
        "description": "route: api/products method: POST no autorizado",
    }
    throw new Error(JSON.stringify(error));
};

module.exports = validateUser;