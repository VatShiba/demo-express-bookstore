const CartRepository = require("../repositories/cart.repo");
const BookRepository = require("../repositories/book.repo");

exports.getCart = async (req, res, next) => {
    try {
        const cart = await CartRepository.getCart(req.user._id);
        return res.send(cart);
    } catch (err) {
        return next(err);
    }
};

exports.addToCart = async (req, res, next) => {
    try {
        const book = await BookRepository.getById(req.body.bookId);
        if (!book) throw { status: 404, message: "Book not found" };
        const cart = await CartRepository.addToCart(
            req.user._id,
            req.body.bookId,
            req.body.quantity
        );
        return res.send(cart);
    } catch (err) {
        return next(err);
    }
};

exports.summarize = async (req, res, next) => {
    try {
        const cart = await CartRepository.getCart(req.user._id);
        const populatedCart = await cart.populate("items.bookId");

        let totalPrice = 0;
        for (let item of populatedCart.items) {
            totalPrice += item.bookId.price * item.quantity;
        }

        return res.send({
            totalPrice,
            items: populatedCart.items.map((item) => item.bookId),
        });
    } catch (err) {
        return next(err);
    }
};
