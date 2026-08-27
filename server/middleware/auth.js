const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token') || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const secret = process.env.JWT_SECRET || 'mysecrettoken';
        const decoded = jwt.verify(token, secret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
