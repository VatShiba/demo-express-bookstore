const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true,},
        author: {type: String, required: true, default: 'Anonymous'},
        description: { type: String, default: ''},
        type: { type: String, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        versionKey: false,
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
