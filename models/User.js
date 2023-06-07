const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        versionKey: false,
    }
);

userSchema.pre("save", async function (next) {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
