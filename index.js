const express = require("express"); 
const app = express();

const indexController = require("./controllers/indexController");

// app.use("/",indexController);

app.use(express.static(__dirname + "/public")); //variable de cual es mi directorio actual 

app.set("view engine", "ejs");

app.get("/", (req,res)=> {
    res.render("index"); 
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});

