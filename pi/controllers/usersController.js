
const db = require("../database/models/Usuario");
const bcrypt = require("bcryptjs");

const userController = {
  index: function (req, res) {
    if (req.session.usuario === undefined) {
      return res.redirect("/register");
    }
    res.render("login");
  },
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
  }
 
};
module.exports = userController;