var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");
const {body} = require ("express-validator");

let addValidation = [

    body("imagen").notEmpty().withMessage("Debes subir una imagen"),
    body("nombre").notEmpty.withMessage("Debes completar el nombre"),
    body("descripcion").notEmpty.withMessage("Debes completar la descripción"),
];

let editValidation = [
    body("imagen").notEmpty().withMessage("Debes subir una imagen"),
    body("nombre").notEmpty().withMessage("Debes completar el nombre"),
    body("descripcion").notEmpty().withMessage("Debes completar la descripción"),
];

let commentValidation = [
    body("comentario")
        .notEmpty().withMessage("Debes completar el comentario").bail()
        .isLength({min: 3}).withMessage("El comentario debe tener al menos 3 caracteres"),
];

router.get("/product-add", productController.validateAdd);
router.post("/product-add",addValidation, productController.add);

router.get("/buscador", productController.search);

router.get("/product/:id", productController.product);

router.post("/comment-add/:id", commentValidation, productController.addComment)

router.get("/product-edit/:id", productController.validateEdit);
router.post("/product-edit/:id", editValidation, productController.edit);

router.get("/product-delete/:id", productController.delete);

module.exports = router;