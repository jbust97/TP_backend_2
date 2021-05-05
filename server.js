const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:9091"
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Hola"});
});

const PORT = process.env.PORT || 9090;
require("./app/routes/restaurante.routes")(app);
app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto 9090");
});