// var express = require('express');
// var router = express.Router();
// var userController = require('../controllers/usersController');
// let { body } =  require("express-validator"); 


// let registerValidations = [
//   body("email") //vas a login ejs y te fijas el nombre del campo
//       .notEmpty().withMessage( "por favor complete el campo email.").bail()
//       .isEmail().withMessage("ingrese emial valido")
      
//       .custom(function(value){
//                   //validar que el email exista en la baase de datos 
//           return db.User.findOne({
//               where: {email:value }
//           })
//           .then(function(user){
//               if(!user){
//                   throw new Error ("el email no se encuentra registrado");
//               }
//           })
          
//       }),

//   body("nombre")
//       .notEmpty().withMessage("por favor complete el campo nombre."),


//   body("password")
//       .notEmpty().withMessage("por favor complete la contrasena").bail()
//       .isLength({min:4}).withMessage("la constrasena debe tener al menos 4 caracteres")
// //falta poner que este en forma encriptada hashing hppt 


//   ]
router.post("/store", registerValidations, indexController.processRegister);
// /* GET users listing. */
// router.get('/login', userController.login);

// router.get('/register', userController.register);

// router.get('/profile', userController.profile);

// router.get('/profile-edit', userController.profileEdit);

// module.exports = router;


var express = require("express");
var router = express.Router();
var userController = require("../controllers/usersController");
let { body } = require("express-validator");

let registerValidations = [
  body("email") //vas a login ejs y te fijas el nombre del campo
    .notEmpty()
    .withMessage("por favor complete el campo email.")
    .bail()
    .isEmail()
    .withMessage("ingrese emial valido")

    .custom(function (value) {
      //validar que el email exista en la baase de datos
      return db.User.findOne({
        where: { email: value },
      }).then(function (user) {
        if (!user) {
          throw new Error("el email no se encuentra registrado");
        }
      });
    }),

  body("nombre").notEmpty().withMessage("por favor complete el campo nombre."),

  body("password")
    .notEmpty()
    .withMessage("por favor complete la contrasena")
    .bail()
    .isLength({ min: 4 })
    .withMessage("la constrasena debe tener al menos 4 caracteres"),
  //falta poner que este en forma encriptada hashing hppt
];
router.post("/store", registerValidations, indexController.processRegister);
/* GET users listing. */
router.get ("/login", userController.login);

router.get("/register", userController.register);

router.get("/profile", userController.profile);

router.get("/profile-edit", userController.profileEdit);

module.exports = router;