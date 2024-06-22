var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");
const {body} = require ("express-validator");

let addValidation = [

    body("imagen").notEmpty().withMessage("Debes subir una imagen"),
    body("nombre").notEmpty.withMessage("Debes completar el nombre"),
    body("descripcion").notEmpty.withMessage("Debes completar la descripción"),
];

router.get("/product-add", productController.validateAdd);
router.post("/product-add",addValidatio, productController.add);

router.get("/buscador", productController.search);

router.get("/product/:id", productController.product);

module.exports = router;