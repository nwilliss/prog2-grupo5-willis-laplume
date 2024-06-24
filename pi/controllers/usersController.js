
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

  // Verificar si hay un parámetro de id en la URL
  if (req.params.id) {
    // Si hay una sesión activa
    if (req.session.user) {
      // Si el parámetro de id en la URL coincide con el id del usuario en la sesión
      if (req.params.id == req.session.user.id) {
        id = req.session.user.id;
      } else {
        id = req.params.id;
      }
    } else {
      id = req.params.id;
    }
  } else {
    // Si no hay un parámetro de id en la URL
    if (req.session.user) {
      id = req.session.user.id;
    } else {
      // Si no hay una sesión activa y no hay id en la URL, redirige al inicio
      return res.redirect("/");
    }
  }

  console.log("ID:", id);

  Usuario.findByPk(id, {
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
  .then(function (response) {
    if (response) {
      // El usuario buscado existe
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
      };

      return res.render("profile", {
        usuario: objUser,
        productos: response.productos,
        miPerfil: req.session.user && req.session.user.id == id // Verifica si es el perfil del usuario logueado
      });
    } else {
      // El usuario buscado no existe
      return res.send("El usuario buscado no existe");
    }
  })
  .catch(function (error) {
    return res.send(error); // Manejamos el error adecuadamente
  });
},


profileEdit: function (req, res) {
  if (req.session.user) {
    let id = req.session.user.id;
    Usuario.findByPk(id)
      .then(function (response) {
        return res.render("profile-edit", { usuario: response, errores: [] });
      })
      .catch(function (error) {
        return res.send(error);
      });
  } else {
    return res.redirect("/login");
  }
},

profileUpdate: function (req, res) {
  
  let errors = validationResult(req);
  let usuario = req.body;

  if (errors.isEmpty()) {
    let id = req.session.user.id;
    usuario.contrasenia = bcrypt.hashSync(usuario.contrasenia, 10);
    Usuario.update(usuario, {
      where: {
        id: id
      }
    })
      .then(function (response) {
        return res.redirect("/profile");
      })
      .catch(function (error) {
        return res.send(error);
      });
  } else {
    console.log(errors);
    return res.render("profile-edit", { usuario: usuario, errores: errors.errors });
  }
  
},

store: function (req, res) {

  const errors = validationResult(req);
  console.log(errors.errors);

  if (errors.isEmpty()) {
    let usuario = req.body;
    usuario.contrasenia = bcrypt.hashSync(usuario.contrasenia, 10);
    db.Usuario.create(usuario)
      .then(function (response) {
        return res.redirect("/");
      })
      .catch(function (error) {
        return res.render("register", { errores: errors.errors });
      })
  } else {
    return res.render("register", { errores: errors.errors });
  }
},

login: function (req, res) {

  let errors = validationResult(req);

  if (errors.isEmpty()) {
    Usuario.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(function (usuario) {
        if (bcrypt.compareSync(req.body.contrasenia, usuario.contrasenia)) {
          req.session.user = usuario;
          if (req.body.remember) {
            res.cookie("user", usuario.id, { maxAge: 1000 * 60 * 60 * 24 }) //24 horas de vida
          }
          return res.redirect("/profile");
        } else {
          // res.send("contraseña incorrecta");
          return res.render("login", { errores: errors.errors.concat({ path: "contrasenia",msg: "Contraseña incorrecta" }) })
        }
      }).catch(function (error) {
        return res.render("login", { errores: errors.errors });
      })
  } else {
    return res.render("login", { errores: errors.errors });
  }
},

logout: function (req, res) {
  req.session.destroy();
  res.clearCookie("user");
  return res.redirect("/");
},
};


module.exports = userController;