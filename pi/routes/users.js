var express = require("express");
var router = express.Router();
var userController = require("../controllers/usersController");
let { body } = require("express-validator");
const indexController = require("../controllers/indexController");
const db = require("../database/models");
const Usuario = db.Usuario;
const Op = db.Sequelize.Op;


let registerValidations = [
	body("email") //vas a login ejs y te fijas el nombre del campo
		.notEmpty().withMessage("El campo email no puede quedar vacío").bail()
		.isEmail().withMessage("Ingrese email válido")
		.custom(function (value) {
			//validar que el email exista en la base de datos
			return Usuario.findOne({
				where: { email: value },
			}).then(function (user) {
				if (user) {
					throw new Error("El email ya se encuentra registrado");
				}
			});
		}),


	body("usuario")
		.notEmpty().withMessage("por favor complete el campo nombre.").bail()
		.isLength({ min: 3 }).withMessage("el nombre debe tener al menos 3 caracteres").bail()
		.custom(function (value) {
			return Usuario.findOne({
				where: { usuario: value },
			}).then(function (user) {
				if (user) {
					throw new Error("El nombre ya se encuentra registrado");
				}
			});
		}),

	body("contrasenia")
		.notEmpty().withMessage("El campo contraseña no puede quedar vacío").bail()
		.isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),

	body("fecha")
		.notEmpty().withMessage("El campo fecha no puede quedar vacío"),

	body("dni")
		.notEmpty().withMessage("El campo dni no puede quedar vacío").bail()
		.isNumeric().withMessage("El campo dni debe ser numérico").bail()
		.isLength({ min: 7, max: 8 }).withMessage("El campo dni debe tener entre 7 y 8 caracteres"),

	body("fotoPerfil")
		.notEmpty().withMessage("El campo foto de perfil no puede quedar vacío"),
];

//AGREGAR PUNTO 11 



/* GET users listing. */
router.get("/login", userController.showLogin);

router.post("/login", loginValidation, userController.login) // Agregar validation

router.post("/logout", userController.logout);

router.get("/register", userController.register);


router.post("/store", registerValidations, userController.store);

router.get("/profile-edit", userController.profileEdit);
router.post("/profile-edit", profileEditValidation, userController.profileUpdate);

router.get("/profile/:id?", userController.profile); // El id es opcional porque puede que no se pasa (cuando queremos ver nuestro propio perfil)

module.exports = router;