const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },
        items: [
            {
                bookId: {
                    type: mongoose.Types.ObjectId,
                    ref: "Book",
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                _id: false
            },
        ]
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        versionKey: false,
    }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
