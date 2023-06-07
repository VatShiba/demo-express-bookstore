const router = require("express").Router();

const BookController = require("../../controllers/book.controller");

router.get("/", BookController.getAllBooks);
router.get("/:id", BookController.getBookById);

// ! These routes are for admin only, need to custom jwt
router.post(
    "/",
    BookController.validate("createBook"),
    BookController.createBook
);
router.patch(
    "/:id",
    BookController.validate("editBook"),
    BookController.editBook
);

module.exports = router;
