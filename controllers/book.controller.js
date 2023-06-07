const { body, validationResult } = require("express-validator");

const BookRepository = require("../repositories/book.repo");

exports.validate = (method) => {
    switch (method) {
        case "createBook": {
            return [
                body("title").exists().isString(),
                body("author").exists().isString(),
                body("description").exists().isString(),
                body("type").exists().isString(),
                body("price").exists().isNumeric(),
            ];
        }
        case "editBook": {
            return [
                body("title").optional().isString(),
                body("author").optional().isString(),
                body("description").optional().isString(),
                body("type").optional().isString(),
                body("price").optional().isNumeric(),
            ];
        }
        default: {
            return [];
        }
    }
};

exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await BookRepository.getAll();
        return res.send(books);
    } catch (err) {
        next(err);
    }
};

exports.getBookById = async (req, res, next) => {
    try {
        const book = await BookRepository.getById(req.params.id);
        if (!book) throw { message: "Book not found", status: 404 };
        return res.send(book);
    } catch (err) {
        next(err);
    }
};

exports.createBook = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({
            message: "validation error",
            status: 422,
            errors: errors.array(),
        });
    }
    try {
        const book = await BookRepository.create(req.body);
        return res.status(201).send(book);
    } catch (err) {
        next(err);
    }
};

exports.editBook = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({
            message: "validation error",
            status: 422,
            errors: errors.array(),
        });
    }
    try {
        const book = await BookRepository.edit(req.params.id, req.body);
        return res.send(book);
    } catch (err) {
        next(err);
    }
};
