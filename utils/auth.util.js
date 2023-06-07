const jwt = require("jsonwebtoken");
const util = require("util");

/**
 * @param {Object} user The user
 */
module.exports.signJwt = (user) =>
    jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });

/**
 * @param {Object} token The jwt token
 */
module.exports.decodeJwt = (token) => jwt.verify(token, process.env.JWT_SECRET);
