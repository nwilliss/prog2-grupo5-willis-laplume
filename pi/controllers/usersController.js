
const db = require("../database/models");
const bcrypt = require("bcryptjs");

const userController = {
  showLogin: function(req, res){
    if (req.session.user !== undefined) {
      return res.redirect("/");
    } else {
      res.render("login",{ error: "" });
    }
  }, 
  register: function (req, res) {
    if (req.session.usuario !== undefined) {
      return res.redirect("/login");
    }
    res.render("register", {errores: []});
  },


//cambiar lo que esta abajo no funciona bien 





  profile: function (req, res) {
    let id;

    if (req.params.id){
      //si un usuario quiere buscar un perfil 
      id = req.params.id; 
    } else if (!req.params.id && req.session.usuario){
      //si un usuario quiere ver su propio perfil
      id = req.session.usuario.id;
    } else {
      //si no aclara que perfil quiere ver, lo mandamos para el index
      return res.redirect("/");
    }

    db.Usuario.finByPk(id, {
      include: [
        {
          association: "productos",
          include: [
            {
              association: "comentarios"
            }
          ]
        }
      ],
      order: [
        ["productos", "createdAt", "DESC"]
      ]
    })
      .then(function(response){
        if (response) {
          //el usuario que busco existe
          let objUser = {
            id: response.id,
						email: response.email,
						usuario: response.usuario,
						dni: response.dni,
						fecha: response.fecha,
						fotoPerfil: response.fotoPerfil,
						createdAt: response.createdAt,
						updatedAt: response.updatedAt,
						deletedAt: response.deletedAt,
          }
          return res.render("profile", {
            usuario: objUser, 
            productos: response.productos,
            miPerfil: req.session.usuario.id == id
          })
        } else {
          //el usuario que busco no existe
          return res.redirect("/");
        }
      })
      .catch(function(error){
        return res.send(error)
      })
  },

  profileEdit: function(req, res) {
    res.render("profile-edit");
  },
  store: function (req, res) {
    const encriptada = bcrypt.hashSync(req.body.contrasenia, 10);
    let usuario = {
      email: req.body.email,
      contrasenia: encriptada,
      usuario: req.body.usuario,
      dni: req.body.doc,
      fecha: req.body.fecha,
      fotoPerfil: req.body.fotoPerfil,
    };
    db.Usuario.create(usuario)
      .then(function(response){
        return res.redirect("/");
      })
      .catch(function(error){
        return res.render("register", {
          errores: [error.message]
        })
      })
  },
  login: function(req,res){
    db.Usuario.findOne({
      where: {
        email: req.body.email,
      },
    }).then(function(usuario){
      let datosUsuario = usuario

      if (usuario){
        if (bcrypt.compareSync(req.body.password, datosUsuario.contrasenia)) {
          req.session.usuario = usuario;
          if(req.body.remember){
            res.cookie("user", usuario.id, {maxAge: 1000 * 60 * 60 * 24}) //24 horas de vida
          }
          return res.redirect("/profile");
        } else {
          return res.render("login", {
            error: "contraseña incorrecta"
          });
        }
      } else {
        return res.render("login", {
          error: "el email no se encuentra registrado"
        })
      }
    }).catch(function(error){
      return res.render("login", {
        error: error
      })
    })
  }, 
  logout: function (req,res){
    req.session.destroy();
    res.clearCookie("user");
    res.redirect("/");
  },
};

module.exports = userController;