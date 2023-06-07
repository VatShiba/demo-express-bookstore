const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const authUtil = require('../utils/auth.util')
const User = require("../models/user");

/**
 * Register by username, password
 */
router.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return next({ message: "username or password missing", code: 400 });
        if (await User.findOne({ username }))
            return next({ message: `User ${username} is already created`, code: 409 });

        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        await user.save();
        return res.status(201).send({
            message: "user created successfully",
        });
    } catch (error) {
        return next(error);
    }
});

/**
 * Login to get Token
 */
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return next({ message: "username or password missing", code: 400 });

        const user = await User.findOne({ username });

        if (!user) return next({ message: "user not found", code: 404 });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next({ message: "not authorized", code: 401 });

        const token = authUtil.signJwt(user)
        return res.send({ token });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
