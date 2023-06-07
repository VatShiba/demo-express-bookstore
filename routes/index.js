const router = require("express").Router();
const { backdoorAuthMiddleware, authMiddleware } = require("../middlewares/auth");

router.all("/healthcheck", (req, res) => {
    res.status(200).send({
        status: "alive",
        version: process.env.VERSION,
    });
});

router.use("/auth", require("./auth"));
router.use("/api", authMiddleware, require("./apis"));
router.use("/mock", backdoorAuthMiddleware, require("./mocks"));

router.use(require("../middlewares/error.handler"));

module.exports = router;
