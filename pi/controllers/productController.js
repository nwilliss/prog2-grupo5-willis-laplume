
var db = require('../db/objeto');
var productController = {
    product: function(req, res) {
        res.render('product', {productos: db.productos});
    },
    add: function(req, res) {
        res.render('product-add');
    }
}

module.exports = productController;