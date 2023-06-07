const router = require("express").Router();

const CartController = require("../../controllers/cart.controller");

router.get("/", CartController.getCart);
router.post("/add", CartController.addToCart)
router.get("/summarize", CartController.summarize)

module.exports = router;
