var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");

router.get("/product-add", productController.add);

router.get("/buscador", productController.search);

router.get("/product/:id", productController.product);

module.exports = router;