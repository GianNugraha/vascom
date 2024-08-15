const express = require("express");
const ProductController = require("../components/products/ProductController");
const router = express.Router();
const Auth = require("../middlewares/Auth");
const { authentication, authorization } = Auth;

router.get("/", [authentication], ProductController.getProduct);
router.get("/unique/:id",[authentication], ProductController.getProductById);
router.post("/", [authorization], [authentication], ProductController.addProduct);
router.delete("/unique/:id", [authorization], [authentication], ProductController.deleteProduct);

module.exports = router;
