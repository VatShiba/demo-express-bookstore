/**
 * Error handler middleware
 * format error message and send to client
 */
const errorHandler = (err, req, res, next) => {
    console.error(err);
    const code = err.status || 500;
    const message = err.message || "Internal Server Error";
    const errors = err.errors || [];
    return res.status(code).json({ message, errors });
};

module.exports = errorHandler;
