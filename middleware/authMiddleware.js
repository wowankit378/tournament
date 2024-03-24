const { request } = require('express');
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {

const token = req.header('authorization');
console.log(token);
    if (!token) return res.status(401).json({ error: 'Access denied' });
try {
const jwtToken = token.split(" ")[1];
 const decoded = jwt.verify(jwtToken, 'your-secret-key');
 req.userId = decoded.userId;
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;