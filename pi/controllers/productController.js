var db = require("../database/models");
const Producto = db.Producto;
const Comentario = db.Comentario;
const Op = db.Sequelize.Op; 
const { validationResult } = require("express-validator");


var productController = {
	product: function (req, res) {
		Producto.findByPk(req.params.id, {
			include: [
				{
					association: "usuario"
				},
				{
					association: "comentarios",
					include: [
						{
							association: "usuario"
						}
					]
				}
			]
		})
		.then(function (producto) {
			if (producto !== null) {
				return res.render("product", { 
					producto : producto, // El producto
					condicion_editar_borrar : req.session.user !== undefined && req.session.user.id === producto.usuarioId, // Si el usuario puede editar o borrar el producto. Debe estar logueado y ser el dueño del producto.
					errores: []
				})
			} else {
				return res.send("Producto no encontrado")
			}
		})
		.catch(function (error) {
			return res.send(error)
		})
	},


  validateAdd: function (req,res) {
    if (req.session.user !== undefined){
      return res.render ("product-add", {errores :[] })
    }else {
      return res.redirect("/login")
    }
  },

  add: function (req, res) {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let producto = req.body;
			producto.usuarioId = req.session.user.id;
			Producto.create(producto)
				.then(function (response) {
					return res.redirect("/product/" + response.id)
					// return res.redirect("/")
				})
				.catch(function (error) {
					return res.render("product-add", { errores : errors.errors })
				})
		} else {
			return res.render("product-add", { errores : errors.errors })
		}
	},

		

  search: function (req, res) {
    let busqueda = req.query.search;
    Producto.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.like]: "%" + busqueda + "%" } },
          { descripcion: { [Op.like]: "%" + busqueda + "%" } }
        ]
      },
      include: [
        {
          association: "usuario",
        }
      ],

      order: [["createdAt", "DESC"]],
    }).then(function (productos) {
     //res.send(productos)
     return res.render("search-results", {productos : productos } );
    
    })
    
    .catch(function (error) {
      return res.send(error)

     })
    
  
  },

  validateEdit: function (req, res) {
		Producto.findByPk(req.params.id)
			.then(function (producto) {
				if (producto !== null) {
					if (req.session.user !== undefined && req.session.user.id === producto.usuarioId) {
						return res.render("product-edit", { producto : producto, errores : [] })
					} else {
						return res.redirect("/login")
					}
				} else {
					return res.send("Producto no encontrado")
				}
			})
			.catch(function (error) {
				return res.send(error)
			})
	},

	edit: function (req, res) {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			Producto.update(req.body, {
				where: {
					id: req.params.id
				}
			})
				.then(function () {
					return res.redirect("/product/" + req.params.id)
				})
				.catch(function (error) {
					return res.send(error)
				})
		} else {
			Producto.findByPk(req.params.id)
				.then(function (producto) {
					return res.render("product-edit", { producto : producto, errores : errors.errors })
				})
				.catch(function (error) {
					return res.send(error)
				})
		}
	},

	delete: function (req, res) {

        Producto.findByPk(req.params.id)
            .then(function (producto) {
                if (producto !== null && req.session.user !== undefined && req.session.user.id === producto.usuarioId) {
                    Comentario.destroy({
                        where : {
                            productoId : req.params.id
                        }
                    })
                        .then(function () { // Este es el then de Comentario.destroy
                            Producto.destroy({
                                where: {
                                    id: req.params.id
                                }
                            })
                                .then(function () { // Este es el then de Producto.destroy
                                    return res.redirect("/") 
                                })
                                .catch(function (error) { // Este es el catch de Producto.destroy
                                    return res.send(error)
                                })
                        })
                        .catch(function (error) { // Este es el catch de Comentario.destroy
                            return res.send(error)
                        })
                } else {
                    return res.send("Producto no encontrado")
                }
            })
            .catch(function (error) {
                return res.send(error)
            })
    },

  addComment: function (req, res) {

		console.log("Método comentario")

		let errors = validationResult(req);

		if (!req.session.user) {
			errors.errors.push({path: 'session', msg: 'Debe iniciar sesión para comentar.'})
		}

		Producto.findByPk(req.params.id, {
			include: [
				{
					association: "usuario"
				},
				{
					association: "comentarios",
					include: [
						{
							association: "usuario"
						}
					]
				}
			],
			order: [["comentarios", "createdAt", "DESC"]]
		})
			.then(function (producto) {
				if (errors.isEmpty()) {
					console.log("No hay errores de formulario")
					let comentario = {
						texto: req.body.comentario,
						usuarioId: req.session.user.id,
						productoId: req.params.id
					}
		
					Comentario.create(comentario)
						.then(function (response) {
							return res.redirect("/product/" + comentario.productoId)
						})
						.catch(function (error) {
							return res.render("product", {
								producto: producto,
								condicion_editar_borrar : req.session.user !== undefined && req.session.user.id === producto.usuarioId,
								errores: errors.errors.concat({path: 'comentario', msg: error})
							})
						})
				} else {
					return res.render("product", {
						producto: producto,
						condicion_editar_borrar : req.session.user !== undefined && req.session.user.id === producto.usuarioId,
						errores: errors.errors
					})
				}
			})
			.catch(function (error) {
				return res.render("product", {
					producto: producto,
					condicion_editar_borrar : req.session.user !== undefined && req.session.user.id === producto.usuarioId,
					errores: errors.errors.concat({path: 'producto', msg: error})
				})
			})

    }  
};


module.exports = productController;
