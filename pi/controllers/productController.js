const { or, where } = require("sequelize");
var db = require("../database/models");
const Producto = db.Producto;
const Op = db.Sequelize.Op; 

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

  add: function (req, res) {
    res.render("product-add");
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
