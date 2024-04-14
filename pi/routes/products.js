var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");

router.get("/product", productController.product);

router.get("/product-add", productController.add);

module.exports = router;