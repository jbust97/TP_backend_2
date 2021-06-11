const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
db.sequelize.sync({alter: true});

var corsOptions = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Hola"});
});

const PORT = process.env.PORT || 9090;
require("./app/routes/restaurante.routes")(app);
require("./app/routes/cliente.routes")(app);
require("./app/routes/mesa.routes")(app);
require("./app/routes/reserva.routes")(app);
require("./app/routes/categoria.routes")(app);
require("./app/routes/producto.routes")(app);
require("./app/routes/gestioncabecera.routes")(app);
require("./app/routes/gestiondetalle.routes")(app);
app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto 9090");
});