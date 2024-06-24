
const db = require("../database/models");
const Productos = db.Productos;




const indexController = {
    index: function(req, res) {
        Producto.findAll ({
            include :[
                {association : "usuario"}
            ],
        })
            .then(function(Productos) {
                return res.render("index", {productos : productos});
            })
            .catch(function(error) {
                return res.send(error);
            })
            
    },
//SACAR SEARCH
    search: function(req,res) {
        res.render ("search-results");
    }
  
}

module.exports = indexController;
