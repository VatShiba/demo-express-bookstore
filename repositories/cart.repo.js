const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Cart = require("../models/Cart");

exports.getCart = async (userId) =>
    Cart.findOneAndUpdate(
        { userId },
        { $setOnInsert: { items: [] } },
        { upsert: true, new: true }
    );

exports.addToCart = async (userId, bookId, quantity) => {
    const session = await Cart.startSession();
    try {
        session.startTransaction();
        const cart = await this.getCart(userId);
        const item = cart.items.find(
            (item) => String(item.bookId) == String(bookId)
        );
        if (item) {
            item.quantity += quantity;
        } else {
            cart.items.push({ bookId, quantity });
        }
        const updated_cart = await cart.save({ session, new: true });
        await session.commitTransaction();
        await session.endSession();
        return updated_cart;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }
};

exports.summarizeCart = async (userId) => {
    const result = await Cart.aggregate([
        {
            $match: {
                userId: new ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "$books",
                foreignField: "_id",
                localField: "books",
                as: "books",
            },
        },
    ]);
    return result.length ? result[0] : null;
};
