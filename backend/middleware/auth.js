const jwt = require('jsonwebtoken');
const{jwtsecret}=require("../config")

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // console.log(token);
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, jwtsecret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};