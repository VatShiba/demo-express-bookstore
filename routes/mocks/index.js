const router = require("express").Router();

const { backdoorAuthMiddleware } = require("../../middlewares/auth");
const Book = require("../../models/Book");

/**
 * Mock books
 */
router.post("/book", async (req, res, next) => {
    const types = [
        "fiction",
        "non-fiction",
        "educational",
        "thriller",
        "romance",
        "science",
        "history",
        "biography",
        "poetry",
        "drama",
        "adventure",
        "horror",
        "mystery",
        "crime",
        "advertising",
        "marketing",
        "law",
        "economics",
        "finance",
        "art",
        "photography",
    ];
    const titles = [
        "The Catcher in the Rye",
        "To Kill a Mockingbird",
        "1984",
        "Pride and Prejudice",
        "The Great Gatsby",
        "Moby-Dick",
        "The Lord of the Rings",
        "Brave New World",
        "The Hobbit",
        "Animal Farm",
    ];
    const authors = [
        "Stephen King",
        "J. K. Rowling",
        "J. R. R. Tolkien",
        "James Patterson",
        "William Shakespeare",
    ];
    const descriptions = [
        "Lorem ipsum dolor sit amet",
        "consectetur adipiscing elit",
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "Ut enim ad minim veniam",
        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex e",
    ];
    const prices = [199, 299, 399, 499, 599, 699, 799, 899, 999];

    const book_create_list = [];
    for (let i = 0; i <= 200; i++) {
        book_create_list.push({
            title: titles[Math.floor(Math.random() * titles.length)],
            author: authors[Math.floor(Math.random() * authors.length)],
            description:
                descriptions[Math.floor(Math.random() * descriptions.length)],
            type: types[Math.floor(Math.random() * types.length)],
            price: prices[Math.floor(Math.random() * prices.length)],
        });
    }
    await Book.insertMany(book_create_list);
    return res.send({
        message: "success",
    });
});

module.exports = router;
