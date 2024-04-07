const express = requiere ("express"); 
const app = express();

const indexController = requiere("./controllers/indexController");

app.use ("/", indexController);

app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});

