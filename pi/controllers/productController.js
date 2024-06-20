const { or, where } = require("sequelize");
var db = require("../database/models");

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
    let busqueda = req.body.busqueda;
    Producto.findAll({
      where: {
        nombreProducto: { [Op.like]: "%" + busqueda + "%" },
      },
      or: {
        descripcionProducto: { [Op.like]: "%" + busqueda + "%" },
      },
      order: [["created_at", "DESC"]],
    }).then(function (productos) {
      res.render("search-results", { productos: productos });
    });
  },
};

module.exports = productController;
