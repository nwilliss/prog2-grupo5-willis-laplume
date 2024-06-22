const { or, where } = require("sequelize");
var db = require("../database/models");
const Producto = db.Producto;
const Op = db.Sequelize.Op; 
const { validationResults } = require("express-validator");

var productController = {
  product: function (req, res) {
    Producto.findAll({
      where: {
        productosId: req.params.id,
      },
    }).then(function (productos) {
      res.render("product", { productos: productos });
    });
    res.render("product", { productos: db.productos });
  },

  validatedAdd: function (req,res) {
    if (req.session.user !== undefined){
      return res.render ("product-add", {errors :[] })
    }else {
      return res.render("/login")
    }
  },

  add: function (req, res) {
    //res.render("product-add");
    let errors = validationResult(req);

      if (errors.isEmpty()) {
        let producto = req.body;
        producto.usuarioId = req.session.user.id;
        Producto.create(producto)
        .then(function(response){
          return res.redirect("/")

        })
        .catch(function(error){
          return res.send(error)

        })
      } else {
        return res.render("product-add", {errors : errors })
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
};

module.exports = productController;
