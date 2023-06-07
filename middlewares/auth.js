const authUtil = require("../utils/auth.util");

module.exports.authMiddleware = async (req, res, next) => {
    const token =
        req.headers.authorization || req.query?.token || req.cookies?.token;

    if (!token) return next({ message: "No token provided", status: 401 });
    try {
        const decoded = authUtil.decodeJwt(token.replace("Bearer ", ""));
        req.user = decoded.user;
        return next();
    } catch (error) {
        return next({ message: "Invalid token", status: 401 });
    }
};

/**
 * For backdoor APIs
 */
module.exports.backdoorAuthMiddleware = async (req, res, next) => {
    const token = req.headers["backdoor-api-key"];

    if (!token) return next({ message: "Forbidden", status: 403 });
    if (token !== process.env.BACKDOOR_API_KEY)
        return next({ message: "Forbidden", status: 403 });

    return next();
};
