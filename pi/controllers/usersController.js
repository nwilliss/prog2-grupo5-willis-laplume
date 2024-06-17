
const db = require("../database/models/Usuario");
const bcrypt = require("bcryptjs");

const userController = {
  index: function(req,res){
    if(req.session.usuario === undefined){
      return res.redirect("/register");
    }
    res.render("login")
  } 

  register: function (req, res) {
    if (req.session.usuario !== undefined) {
      return res.redirect("/profile");
    }
    res.render("register");
  },
  profile: function (req, res) {
    res.render("profile", { usuario: db.usuario });
  },
  profileEdit: function (req, res) {
    res.render("profile-edit");
  },
  store: function (req, res) {
    const encriptada = bcrypt.hashSync(req.body.password, 10);
    let usuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: encriptada,
    };
    db.Usuario.create(usuario);
    res.redirect("/profile");
  },
  login: function(req,res){
    db.Usuario.findOne({
      where: {
        email: req.body.email,
      },
    }).then(function(usuario){
      if (usuario){
        if (bcrypt.compareSync(req.body.password, usuario.password)) {
          req.session.usuario = usuario;
          if(req.body.remember){
            res.cookie("user", usuario.id, {maxAge: 1000 * 60 * 60 * 24}) //24 horas de vida
          }
          res.redirect("/profile");
        } else {
          res.send("contraseña incorrecta");
        }
      } else {
        res.send("el mail no se encuentra registrado")
      }
    })
  }
 
};
module.exports = userController;