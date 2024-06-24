
const db = require("../database/models");
const Producto = db.Producto;




const indexController = {
    index: function(req, res) {
        Producto.findAll ({
            include :[
                {association : "usuario"}
            ],
        })
            .then(function(productos) {
                return res.render("index", {productos : productos});
            })
            .catch(function(error) {
                return res.send(error);
            })
            
    },

}

module.exports = indexController;
