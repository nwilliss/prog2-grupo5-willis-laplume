const express = require("express"); 
const app = express();

const indexController = require("./controllers/indexController");

const loginController = require("./controllers/loginController");

const registerController = require("./controllers/registerController");

const productAddController = require("./controllers/productAddController");


app.use("/index",indexController);
app.use("/login",loginController);
app.use("/register",registerController);
app.use("/product-add",productAddController);


app.use(express.static(__dirname + "/public")); //variable de cual es mi directorio actual 

app.set("view engine", "ejs");

// app.get("/", (req,res)=> {
//     res.render("index"); 
// });

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});

